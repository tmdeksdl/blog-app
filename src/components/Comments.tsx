import { useState } from 'react';

const COMMENTS = [
  { id: 1, email: 'test1.com', content: 'asdfad', createdAt: '1999-01-01' },
  { id: 2, email: 'test1.com', content: 'asdfad', createdAt: '1999-01-01' },
  { id: 3, email: 'test1.com', content: 'asdfad', createdAt: '1999-01-01' },
  { id: 4, email: 'test1.com', content: 'asdfad', createdAt: '1999-01-01' },
  { id: 5, email: 'test1.com', content: 'asdfad', createdAt: '1999-01-01' },
  { id: 6, email: 'test1.com', content: 'asdfad', createdAt: '1999-01-01' },
];

export default function Comments() {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'comment') {
      setComment(value);
    }
  };
  const [comment, setComment] = useState<string>('');
  return (
    <div className="comments">
      <form className="comments_form">
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
          <input type="button" value="입력" className="form_btn-submit"></input>
        </div>
      </form>
      <div className="comments_list">
        {COMMENTS?.map((comment) => (
          <div key={comment.id} className="comment_box">
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
