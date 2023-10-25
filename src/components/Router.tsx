import App from '@/App';
import ErrorPage from '@/pages/ErrorPage';
import HomePage from '@/pages/home';
import PostListPage from '@/pages/posts';
import PostDetailPage from '@/pages/posts/Detail';
import PostEditPage from '@/pages/posts/Edit';
import PostNewPage from '@/pages/posts/New';
import ProfilePage from '@/pages/profile';
import SignInPage from '@/pages/signin';
import SignUpPage from '@/pages/signup';
import { useState } from 'react';
import { useRoutes } from 'react-router-dom';

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const routes = useRoutes([
    {
      path: '/',
      element: <App />,
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
              element: isAuthenticated ? <PostListPage /> : <SignInPage />,
            },
            {
              path: 'new',
              element: isAuthenticated ? <PostNewPage /> : <SignInPage />,
            },
            {
              path: ':id',
              children: [
                {
                  index: true,
                  element: isAuthenticated ? (
                    <PostDetailPage />
                  ) : (
                    <SignInPage />
                  ),
                },
                {
                  path: 'edit',
                  children: [
                    {
                      index: true,
                      element: <PostEditPage />,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: 'profile',
          element: isAuthenticated ? <ProfilePage /> : <SignInPage />,
        },
        {
          path: 'signin',
          element: <SignInPage />,
        },
        {
          path: 'signup',
          element: <SignUpPage />,
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
