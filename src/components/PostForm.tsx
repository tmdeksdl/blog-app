import { useContext, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PostForm() {
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { user } = useContext(AuthContext);
  const nagivate = useNavigate();
  //firestore의 데이터 생성 함수를 쓰기 때문에 async 비동기
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'posts'), {
        title: title,
        summary: summary,
        content: content,
        createdAt: new Date().toLocaleDateString(),
        email: user?.email,
      });

      nagivate('/');
      toast.success('게시글을 생성했습니다.');
    } catch (e: any) {
      console.log(e);
      toast.error(e?.code);
    }
  };
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'summary') {
      setSummary(value);
    }
    if (name === 'content') {
      setContent(value);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <div className="form_block">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            onChange={onChange}
            value={title}
          />
        </div>
        <div className="form_block">
          <label htmlFor="summary">요약</label>
          <input
            type="text"
            name="summary"
            id="summary"
            required
            onChange={onChange}
            value={summary}
          />
        </div>

        <div className="form_block">
          <label htmlFor="content">내용</label>
          <textarea
            name="content"
            id="content"
            required
            onChange={onChange}
            value={content}
          />
        </div>

        <div className="form_block">
          <input type="submit" value="제출" className="form_btn-submit" />
        </div>
      </form>
    </>
  );
}
