import PostListItem from '@/components/posts/PostListItem';
import PostNavigation from '@/components/posts/PostNavigation';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import AuthContext from '@/context/AuthContext';
import { db } from '@/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export interface PostListProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  userName: string;
  updatedAt?: string;
  uid: string;
}
interface NavigationType {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}
export type TabType = 'all' | 'my';
export type CategoryType = 'Frontend' | 'JavaScript' | 'React';
export const CATEGORIES: CategoryType[] = ['Frontend', 'JavaScript', 'React'];

const PostList = ({
  hasNavigation = true,
  defaultTab = 'all',
}: NavigationType) => {
  const [posts, setPosts] = useState<PostListProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const { user } = useContext(AuthContext);
  const getPosts = async () => {
    const postArray: PostListProps[] = [];

    const postsRef = collection(db, 'posts');
    let postsQuery;
    if (activeTab === 'my' && user) {
      postsQuery = query(
        postsRef,
        where('uid', '==', user.uid),
        orderBy('createdAt', 'asc')
      );
    } else if (activeTab === 'all') {
      postsQuery = query(postsRef, orderBy('createdAt', 'desc'));
    } else {
      postsQuery = query(
        postsRef,
        where('category', '==', activeTab),
        orderBy('createdAt', 'desc')
      );
    }

    const datas = await getDocs(postsQuery);
    setPosts([]);

    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      postArray.push(dataObj as PostListProps);
    });

    setPosts(postArray);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {hasNavigation && (
        <PostNavigation setActiveTab={setActiveTab} activeTab={activeTab} />
      )}

      <ul className="max-w-[680px] w-full m-auto p-5 relative">
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <PostListItem key={post?.id} post={post} getPosts={getPosts} />
          ))
        ) : (
          <>
            {loading ? (
              <div className="flex flex-col items-center min-h-[150px] gap-4 p-6 text-center text-gray-400 border rounded-2xl">
                <Loader />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 p-6 text-center text-gray-400 border rounded-2xl">
                <p>まだブログがありません</p>
                <Link to="/posts/new" className="w-[230px]">
                  <Button label="ブログを書く" />
                </Link>
              </div>
            )}
          </>
        )}
      </ul>
    </>
  );
};

export default PostList;
