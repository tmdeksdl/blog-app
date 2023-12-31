import { Link } from 'react-router-dom';
import { BsMoonFill, BsSun } from 'react-icons/bs';
import { ThemeContext } from 'context/ThemeContext';
import { useContext } from 'react';

export default function Header() {
  const context = useContext(ThemeContext);
  console.log(context);

  return (
    <footer className="footer">
      <Link to="/posts/new">글쓰기</Link>
      <Link to="/posts">게시글</Link>
      <Link to="/profile">프로필</Link>
      <div>
        {context.theme === 'light' ? (
          <BsSun className="footer_theme-btn" onClick={context.toggleMode} />
        ) : (
          <BsMoonFill
            className="footer_theme-btn"
            onClick={context.toggleMode}
          />
        )}
      </div>
    </footer>
  );
}
