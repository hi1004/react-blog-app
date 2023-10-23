import { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface HeaderProps {
  getHeaderHeight: (value: number) => void;
}

const Header = ({ getHeaderHeight }: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const newHeaderHeight = headerRef.current!.offsetHeight;
      getHeaderHeight(newHeaderHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getHeaderHeight]);

  return (
    <header
      ref={headerRef}
      className="flex bg-zinc-50 flex-col justify-center gap-4 border-b-[1px] items-center border-b-slate-300 px-[10px] py-7 fixed w-full z-10 top-0 left-0 sm:flex-row  sm:justify-between sm:px-6 md:px-10"
    >
      <Link to="/" className="text-3xl font-bold">
        <span className="text-sky-600">React</span> Blog
      </Link>
      <nav>
        <ul className="flex gap-4">
          {[
            { to: 'posts/new', text: '投稿' },
            { to: 'posts', text: '投稿記事' },
            { to: 'profile', text: 'プロフィール' },
          ].map((link, index) => (
            <li
              key={link.to}
              className={`relative ${index !== 2 ? 'header__line--after' : ''}`}
            >
              <NavLink
                to={link.to}
                end={link.to === 'posts'}
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? 'text-sky-600 pointerhover:hover:text-sky-700'
                      : 'text-gray-400 pointerhover:hover:text-gray-800'
                  }`
                }
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
