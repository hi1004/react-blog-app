import PostListItem from '@/components/posts/PostListItem';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export interface PostListProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  userName: string;
}
const PostList = () => {
  const [posts, setPosts] = useState<PostListProps[]>([]);
  const [loading, setLoading] = useState(true);
  const getPosts = async () => {
    const datas = await getDocs(collection(db, 'posts'));
    const postArray: PostListProps[] = [];

    datas?.forEach((doc) => {
      console.log(doc.data(), doc.id);
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
    <ul className="max-w-[680px] w-full m-auto p-5 relative">
      {posts?.length > 0 ? (
        posts?.map((post) => <PostListItem key={post?.id} post={post} />)
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
  );
};

export default PostList;
