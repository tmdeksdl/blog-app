import AuthContext from 'context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { app } from 'firebaseApp';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const onSignOut = async () => {
  try {
    const auth = getAuth(app);
    await signOut(auth);
    toast.success('로그아웃 되었습니다.');
  } catch (error: any) {
    toast.error(error?.code);
  }
};

export default function Profile() {
  //useContext를 사용하기 때문에 아래 코드는 필요 없다.
  // const auth = getAuth(app);

  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="profile_box">
        <div className="flex_box-lg">
          <div className="profile_image"></div>
          <div>
            <div className="profile_email">{user?.email}</div>
            <div className="profile_name">{user?.displayName || '사용자'}</div>
          </div>
        </div>
        <div role="presentation" className="profile_logout" onClick={onSignOut}>
          로그아웃
        </div>
      </div>
    </>
  );
}
