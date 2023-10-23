import { useMemo } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const GITHUB_URL = 'https://github.com/hi1004/react-blog-app';
const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="flex  bg-gray-200 min-h-[40px] px-8 py-12 flex-col items-center gap-3">
      <nav className="flex">
        <Link
          to={GITHUB_URL}
          target="_blank"
          className="flex items-center gap-1"
        >
          <AiFillGithub className="text-3xl" />
          <span className="text-sm font-bold">GitHub</span>
        </Link>
      </nav>

      <p className="text-sm font-normal text-gray-500">
        ©Copyright {currentYear}. hi1004. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
