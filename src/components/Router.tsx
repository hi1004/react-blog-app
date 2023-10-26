/* eslint-disable @typescript-eslint/no-unused-vars */
import App from '@/App';
import Loader from '@/components/ui/Loader';
import { app } from '@/firebase';
import ErrorPage from '@/pages/ErrorPage';
import HomePage from '@/pages/home';
import PostListPage from '@/pages/posts';
import PostDetailPage from '@/pages/posts/Detail';
import PostEditPage from '@/pages/posts/Edit';
import PostNewPage from '@/pages/posts/New';
import ProfilePage from '@/pages/profile';
import SignInPage from '@/pages/signin';
import SignUpPage from '@/pages/signup';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

const AppRoutes = () => {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setIsAuthenticated(true) : setIsAuthenticated(false);
      setInit(true);
    });
  }, [auth]);

  const routes = useRoutes([
    {
      path: '/',
      element: init ? <App /> : <Loader />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'posts',
          children: [
            {
              index: true,
              element: isAuthenticated ? (
                <PostListPage />
              ) : (
                <Navigate to="/signin" />
              ),
            },
            {
              path: 'new',
              element: isAuthenticated ? (
                <PostNewPage />
              ) : (
                <Navigate to="/signin" />
              ),
            },
            {
              path: ':id',
              children: [
                {
                  index: true,
                  element: isAuthenticated ? (
                    <PostDetailPage />
                  ) : (
                    <Navigate to="/signin" />
                  ),
                },
                {
                  path: 'edit',
                  children: [
                    {
                      index: true,
                      element: isAuthenticated ? (
                        <PostEditPage />
                      ) : (
                        <Navigate to="/signin" />
                      ),
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: 'profile',
          element: isAuthenticated ? (
            <ProfilePage />
          ) : (
            <Navigate to="/signin" />
          ),
        },
        {
          path: 'signin',
          element: !isAuthenticated ? <SignInPage /> : <Navigate to="/" />,
        },
        {
          path: 'signup',
          element: !isAuthenticated ? <SignUpPage /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ]);

  return routes;
};

export default AppRoutes;
