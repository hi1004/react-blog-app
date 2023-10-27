import PostListItem from '@/components/posts/PostListItem';
import PostNavigation from '@/components/posts/PostNavigation';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import AuthContext from '@/context/AuthContext';
import { db } from '@/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export interface CommentsInterface {
  content: string;
  uid: string;
  email: string;
  userName: string;
  createdAt: string;
}
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
  category?: CategoryType;
  comments?: CommentsInterface[];
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
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const getPosts = async () => {
    setPosts([]);
    const postsRef = collection(db, 'posts');
    let postsQuery;

    if (activeTab === 'my' && user) {
      postsQuery = query(
        postsRef,
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
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
    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostListProps]);
    });
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getPosts();
  }, [activeTab]);

  return (
    <>
      {hasNavigation && (
        <>
          <div className="max-w-[680px] m-auto p-5">
            <h1 className="w-full pb-1 pl-2 m-auto mt-2 text-3xl font-bold border-l-8 sm:text-4xl border-l-sky-600">
              List of Blogs<span className="ml-4 text-sm">記事一覧</span>
            </h1>
          </div>
          <PostNavigation setActiveTab={setActiveTab} activeTab={activeTab} />
        </>
      )}

      <ul className="max-w-[680px] w-full m-auto p-5 relative">
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <PostListItem
              key={post?.id}
              post={post}
              getPosts={getPosts}
              setLoading={setLoading}
            />
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
