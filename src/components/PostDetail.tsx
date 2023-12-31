import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PostProps } from './PostList';
import { db } from 'firebaseApp';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import Loader from './Loader';
import { toast } from 'react-toastify';
import Comments from './Comments';
export default function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const navigate = useNavigate();
  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };
  const handleDelete = async () => {
    const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, 'posts', post.id));
      toast.success('게시글을 삭제했습니다.');
      navigate('/');
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, []);
  return (
    <>
      <div className="post_detail">
        {post ? (
          <>
            <div className="post_box">
              <div className="post_title">{post.title}</div>

              <div className="post_profile_box">
                <div className="post_profile"></div>
                <div className="post_author">{post.email}</div>
                <div className="post_date">{post.createdAt}</div>
              </div>
              <div className="post_util_box">
                {post?.category && (
                  <div className="post_category">{post?.category}</div>
                )}
                <div
                  role="presentation"
                  onClick={handleDelete}
                  className="post_delete"
                >
                  삭제
                </div>
                <div className="post_edit">
                  <Link to={`/posts/edit/${post.id}`}>수정</Link>
                </div>
              </div>
              <div className="post_text post_text--pre-wrap">
                {post.content}
              </div>
            </div>
            <Comments post={post}></Comments>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
