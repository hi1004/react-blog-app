import ThemeContext from '@/context/ThemeContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
interface HeaderProps {
  getHeaderHeight: (value: number) => void;
}

const Header = ({ getHeaderHeight }: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const themContext = useContext(ThemeContext);
  const [isDarkMode, setDarkMode] = useState(themContext.theme === 'dark');
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    themContext.toggleMode();
  };
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
      className="flex transition duration-300 dark:bg-slate-800 bg-zinc-50 flex-col justify-center  gap-2 sm:gap-4 border-b-[1px] items-center border-b-slate-300 dark:border-b-slate-500 px-[10px] py-3 sm:py-7 fixed w-full z-10 top-0 left-0 sm:flex-row  sm:justify-between sm:px-6 md:px-10"
    >
      <Link to="/" className="text-3xl font-bold dark:text-zinc-50">
        <span className="text-sky-600">React </span>Blog
      </Link>
      <nav>
        <ul className="flex items-center gap-4">
          {[
            { to: 'posts/new', text: 'ブログを書く' },
            { to: 'posts', text: '記事一覧' },
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
                      : 'text-gray-400 pointerhover:hover:text-gray-800 dark:pointerhover:hover:text-zinc-50'
                  }`
                }
              >
                {link.text}
              </NavLink>
            </li>
          ))}
          <li className="absolute sm:top-8 top-4 right-3 sm:static">
            <DarkModeSwitch
              style={{ width: '2rem', height: '2rem' }}
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={120}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
