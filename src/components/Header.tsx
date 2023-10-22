import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between border-b-[1px] items-center border-b-slate-300 px-[10px] py-7 fixed w-full z-10 top-0 left-0">
      <Link to="/" className="text-3xl font-bold">
        <span className="text-blue-600">React</span> Blog
      </Link>
      <nav>
        <ul className="flex gap-4">
          <li className="relative">
            <NavLink
              className={({ isActive }) =>
                `header__line--after ${
                  isActive
                    ? 'text-blue-600 pointerhover:hover:text-blue-800'
                    : 'text-gray-400 pointerhover:hover:text-gray-800'
                }`
              }
              to="posts"
              end
            >
              投稿記事
            </NavLink>
          </li>
          <li className="relative">
            <NavLink
              className={({ isActive }) =>
                `header__line--after ${
                  isActive
                    ? 'text-blue-600 pointerhover:hover:text-blue-800'
                    : 'text-gray-400 pointerhover:hover:text-gray-800'
                }`
              }
              to="posts/new"
            >
              投稿
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 pointerhover:hover:text-blue-800'
                  : 'text-gray-400 pointerhover:hover:text-gray-800'
              }
              to="profile"
            >
              プロフィール
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
