import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { app } from 'firebaseApp';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
export default function LoginForm() {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('로그인에 성공했습니다.');
    } catch (error: any) {
      toast.error(error?.code);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);
      const validRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
      if (!value?.match(validRegex)) {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError('');
      }
    }
    if (name === 'password') {
      setPassword(value);
      if (value?.length < 8) {
        setError('비밀번호는 8자리 이상으로 입력해주세요.');
      } else {
        setError('');
      }
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="form form--lg">
        <h1 className="form_title">로그인</h1>
        <div className="form_block">
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            name="email"
            id="email"
            required
            onChange={onChange}
            value={email}
          />
        </div>
        <div className="form_block">
          <label htmlFor="password">비밀번호</label>
          <input
            type="text"
            name="password"
            id="password"
            required
            onChange={onChange}
            value={password}
          />
        </div>
        {error?.length > 0 && (
          <div className="form_block">
            <div className="form_error">{error}</div>
          </div>
        )}
        <div className="form_block">
          계정이 없으신가요?
          <Link to="/signup" className="form_link">
            회원가입하기
          </Link>
        </div>
        <div className="form_block">
          <input
            type="submit"
            value="로그인"
            className="form_btn-submit"
            disabled={error?.length > 0}
          />
        </div>
      </form>
    </>
  );
}
