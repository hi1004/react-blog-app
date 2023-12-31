import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import ScrollToTop from '@/components/scroll/ScrollToTop';
import ThemeContext from '@/context/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Theme, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [headerHeight, setHeaderHeight] = useState<number>(93);
  const [mainHeight, setMainHeight] = useState<string>('');
  const themeContext = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === '/signup' ||
      location.pathname === '/signin' ||
      location.pathname === '/posts' ||
      location.pathname === '/profile'
    ) {
      setMainHeight(`calc(100vh - ${headerHeight + 94}px)`);
    } else {
      setMainHeight('90vh');
    }
  }, [headerHeight, location]);

  const updateHeaderHeight = (newHeight: number) => {
    setHeaderHeight(newHeight);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={themeContext.theme as Theme}
      />
      <ScrollToTop />
      <Header getHeaderHeight={updateHeaderHeight} />
      {location.pathname === '/signup' || location.pathname === '/signin' ? (
        <main
          style={{
            marginTop: headerHeight,
            minHeight: mainHeight,
          }}
          className="flex flex-col justify-center md:grid sm:place-items-center md:justify-normal"
        >
          <Outlet />
        </main>
      ) : (
        <main
          style={{
            marginTop: headerHeight,
            minHeight: mainHeight,
          }}
          className={`${
            location.pathname === '/posts/new'
              ? 'flex flex-col  justify-center md:grid sm:place-items-center md:justify-normal'
              : 'sm:place-items-center  flex flex-col'
          } transition duration-300 dark:text-slate-100 dark:bg-slate-900`}
        >
          <Outlet />
        </main>
      )}

      <Footer />
    </>
  );
}

export default App;
