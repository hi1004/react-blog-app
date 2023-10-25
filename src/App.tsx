import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import ScrollToTop from '@/components/scroll/ScrollToTop';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

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
      <ScrollToTop />
      <Header getHeaderHeight={updateHeaderHeight} />
      <main
        style={{
          marginTop: headerHeight,
          minHeight: mainHeight,
        }}
        className={`sm:grid sm:place-items-center items-center flex`}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
