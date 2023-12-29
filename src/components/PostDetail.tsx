import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PostProps } from './PostList';
import { db } from 'firebaseApp';
import { doc, getDoc } from 'firebase/firestore';
import Loader from './Loader';
export default function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };
  const handleDelete = () => {
    console.log('delete');
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, []);
  return (
    <>
      <div className="post_detail">
        {post ? (
          <div className="post_box">
            <div className="post_title">{post.title}</div>

            <div className="post_profile_box">
              <div className="post_profile"></div>
              <div className="post_author">{post.email}</div>
              <div className="post_date">{post.createdAt}</div>
            </div>
            <div className="post_util_box">
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
            <div className="post_text post_text--pre-wrap">{post.content}</div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
