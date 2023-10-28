import AppRoutes from '@/components/Router.tsx';
import { AuthContextProvider } from '@/context/AuthContext';
import { ThemaContextProvider } from '@/context/ThemeContext';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemaContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContextProvider>
  </ThemaContextProvider>
);
