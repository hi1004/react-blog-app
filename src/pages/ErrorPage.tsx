import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <main className="flex flex-col w-full select-none h-[100vh] gap-5 items-center justify-center">
        <h1 className="bg-clip-text text-transparent  bg-gradient-to-r from-cyan-500 to-blue-500 text-[20vw] font-bold">
          Oops!
        </h1>
        <h2 className="sm:text-[3vw] font-medium">404 - PAGE NOT FOUND</h2>
        <p></p>
        <Link className="p-4 font-bold text-white bg-sky-600 rounded-xl" to="/">
          React Blog ホームページに戻る
        </Link>
      </main>
    </div>
  );
};

export default ErrorPage;
