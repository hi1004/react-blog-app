import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to="/">Logo</Link>
      <nav>
        <ul>
          <li>
            <NavLink to="posts">投稿記事</NavLink>
          </li>
          <li>
            <NavLink to="posts/new">投稿</NavLink>
          </li>
          <li>
            <NavLink to="profile">プロフィール</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
