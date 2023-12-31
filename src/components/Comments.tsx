import { useContext, useState } from 'react';
import { PostProps } from './PostList';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';

interface CommentsProps {
  post: PostProps;
  getPost: (id: string) => Promise<void>;
}
export default function Comments({ post, getPost }: CommentsProps) {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'comment') {
      setComment(value);
    }
  };
  const [comment, setComment] = useState<string>('');
  const { user } = useContext(AuthContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post && post.id) {
        const postRef = doc(db, 'posts', post.id);
        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date().toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          };
          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updatedAt: new Date().toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          });
          // 댓글 추가 후 문서 업데이트
          await getPost(post.id);
        }
        toast.success('댓글을 달았습니다.');
        setComment('');
      }
    } catch (e: any) {
      toast.error(e.code);
    }
  };
  return (
    <div className="comments">
      <form className="comments_form" onSubmit={onSubmit}>
        <div className="form_block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            required
            value={comment}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="form_block form_block-reverse">
          <input type="submit" value="입력" className="form_btn-submit"></input>
        </div>
      </form>
      <div className="comments_list">
        {post?.comments
          ?.slice(0)
          ?.reverse()
          .map((comment) => (
            <div key={comment.createdAt} className="comment_box">
              <div className="comment_profile-box">
                <div className="comment_email">{comment.email}</div>
                <div className="comment_date">{comment.createdAt}</div>
                <div className="comment_delete">삭제</div>
              </div>
              <div className="comment_text">{comment?.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
