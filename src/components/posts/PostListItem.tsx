import { PostListProps } from '@/components/posts/PostList';
import AuthContext from '@/context/AuthContext';
import { db } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

interface PostListItem {
  post: PostListProps;
  getPosts: () => void;
  setLoading: (isLoading: boolean) => void;
}
const PostListItem = ({ post, getPosts, setLoading }: PostListItem) => {
  const { user } = useContext(AuthContext);
  const handleDelete = async (id: string) => {
    const confirm = window.confirm('該当ブログを削除しますか？');
    if (confirm && id) {
      await deleteDoc(doc(db, 'posts', id));
      toast.success('ブログを削除しました');
      setLoading(true);
      getPosts();
    }
  };

  return (
    <li className="px-4 py-6 mt-2 leading-6 border-t odd:border-b odd:border-t-gray-200 odd:border-b-gray-200 dark:border-b-slate-600 dark:border-t-slate-600 dark:even:bg-slate-800 even:bg-slate-100 rounded-xl">
      <div
        className={`flex justify-between items-center gap-2 text-sm post__profile-box`}
        role="presentation"
      >
        <div className="flex gap-2">
          <div className="post__profile w-9 h-9 ">
            <FaUserCircle className="w-full h-full text-sky-600" />
          </div>

          <address className="flex flex-col not-italic">
            <div className="text-gray-700 post__author dark:text-white">
              {post?.userName}
            </div>
            <div className="text-xs text-gray-400 post__author">
              {post?.email}
            </div>
          </address>
        </div>
      </div>
      <Link to={`/posts/${post?.id}`}>
        <div className="pl-0 pointerhover:hover:underline">
          <div className="my-3 text-xl font-bold">{post?.title}</div>
          <p className="text-gray-500 dark:text-gray-400">{post?.summary}</p>
        </div>
      </Link>
      <div className="flex justify-end gap-2 mt-4">
        <span className="block pl-10 mr-3 text-sm text-right text-gray-400 dark:text-slate-500">
          {post?.createdAt}
        </span>
        {post?.email === user?.email && (
          <div className="flex flex-row-reverse gap-2 mr-3 text-sm text-gray-400 post__utill-box">
            <button
              className="pointerhover:hover:text-gray-800 dark:pointerhover:hover:text-slate-100"
              role="presentation"
              onClick={() => handleDelete(post?.id as string)}
            >
              削除
            </button>
            <button className="pointerhover:hover:text-gray-800 dark:pointerhover:hover:text-slate-100">
              <Link to={`/posts/${post?.id}/edit`}>修正</Link>
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default PostListItem;
