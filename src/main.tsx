import AppRoutes from '@/components/Router.tsx';
import { AuthContextProvider } from '@/context/AuthContext';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AuthContextProvider>
);
