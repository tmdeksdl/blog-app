import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';
interface PostListProps {
  hasNavigator?: boolean;
  defaultTab?: TabType | CategoryType;
}

export interface CommentsInterface {
  content: string;
  uid: string;
  email: string;
  createdAt: string;
}
export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
  category?: CategoryType;
  comments?: CommentsInterface[];
}

export type CategoryType = 'Frontend' | 'Backend' | 'Web' | 'Native';
export const CATEGORIES: CategoryType[] = [
  'Frontend',
  'Backend',
  'Web',
  'Native',
];

type TabType = 'all' | 'my';
export default function PostList({
  hasNavigator = true,
  defaultTab = 'all',
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const getPosts = async () => {
    setPosts([]);
    let postsRef = collection(db, 'posts');
    let postsQuery;

    if (activeTab === 'my' && user) {
      postsQuery = query(
        postsRef,
        where('uid', '==', user.uid),
        orderBy('createdAt', 'asc')
      );
    } else if (activeTab === 'all') {
      postsQuery = query(postsRef, orderBy('createdAt', 'asc'));
    } else {
      // 카테고리 별 글 보여주기
      postsQuery = query(
        postsRef,
        where('category', '==', activeTab),
        orderBy('createdAt', 'asc')
      );
    }

    const data = await getDocs(postsQuery);
    data?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');
    if (confirm && id) {
      await deleteDoc(doc(db, 'posts', id));
      toast.success('게시글을 삭제했습니다.');
      navigate('/');
      getPosts();
    }
  };
  console.log(posts);
  useEffect(() => {
    getPosts();
  }, [activeTab]);

  return (
    <>
      {hasNavigator && (
        <div className="post_navigator">
          <div
            role="presentation"
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'post_navigator--active' : ''}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab('my')}
            className={activeTab === 'my' ? 'post_navigator--active' : ''}
          >
            나의글
          </div>
          {CATEGORIES?.map((category) => (
            <div
              key={category}
              role="presentation"
              onClick={() => setActiveTab(category)}
              className={activeTab === category ? 'post_navigator--active' : ''}
            >
              {category}
            </div>
          ))}
        </div>
      )}
      <div className="post_list">
        {posts?.length > 0 ? (
          posts?.map((post, index) => (
            <div key={post?.id} className="post_box">
              <Link to={`/posts/${post?.id}`}>
                <div className="post_profile_box">
                  <div className="post_profile"></div>
                  <div className="post_author">{post?.email}</div>
                  <div className="post_date">{post?.createdAt}</div>
                </div>
                <div className="post_title">{post?.title}</div>
                <div className="post_text">{post?.summary}</div>
              </Link>
              {post?.email === user?.email && (
                <div className="post_util_box">
                  <div
                    className="post_delete"
                    role="presentation"
                    onClick={() => handleDelete(post.id as string)}
                  >
                    삭제
                  </div>
                  <div className="post_edit">
                    <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post_no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
