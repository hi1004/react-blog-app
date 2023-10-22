import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <main className="mt-[93px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
