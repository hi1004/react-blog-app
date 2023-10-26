import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import ScrollToTop from '@/components/scroll/ScrollToTop';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [headerHeight, setHeaderHeight] = useState<number>(93);
  const [mainHeight, setMainHeight] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/signup' || location.pathname === '/signin') {
      setMainHeight(`calc(100vh - ${headerHeight + 158}px)`);
    } else {
      setMainHeight('90vh');
    }
  }, [headerHeight, location]);

  const updateHeaderHeight = (newHeight: number) => {
    setHeaderHeight(newHeight);
  };

  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Header getHeaderHeight={updateHeaderHeight} />
      <main
        style={{
          marginTop: headerHeight,
          minHeight: mainHeight,
        }}
        className={`sm:grid sm:place-items-center justify-center md:justify-normal flex flex-col`}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
