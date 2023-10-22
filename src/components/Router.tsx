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
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
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
            element: <PostListPage />,
          },
          {
            path: 'new',
            element: <PostNewPage />,
          },
          {
            path: ':id',
            children: [
              {
                index: true,
                element: <PostDetailPage />,
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
        element: <ProfilePage />,
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
]);

export default router;
