import { PostListProps } from '@/components/posts/PostList';
import AuthContext from '@/context/AuthContext';
import { db } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface PostListItem {
  post: PostListProps;
  getPosts: () => void;
}
const PostListItem = ({ post, getPosts }: PostListItem) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleDelete = async (id: string) => {
    const confirm = window.confirm('該当ブログを削除しますか？');
    if (confirm && id) {
      await deleteDoc(doc(db, 'posts', id));
      toast.success('ブログを削除しました');
    }
  };
  const handleClick = () => {
    if (post?.email === user?.email) navigate('/profile');
  };

  useEffect(() => {
    getPosts();
  });

  return (
    <li className="py-6 pl-4 leading-6 border-t odd:border-t-gray-200 even:bg-slate-100 rounded-xl">
      <div
        className={`flex justify-between items-center gap-2 text-sm post__profile-box ${
          post?.email === user?.email &&
          'cursor-pointer pointerhover:hover:underline'
        }`}
        role="presentation"
        onClick={handleClick}
      >
        <div className="flex gap-2">
          <div className="post__profile w-9 h-9 ">
            <FaUserCircle className="w-full h-full text-sky-600" />
          </div>

          <address className="flex flex-col not-italic">
            <div className="text-gray-700 post__author">{post?.userName}</div>
            <div className="text-xs text-gray-400 post__author">
              {post?.email}
            </div>
          </address>
        </div>
        <span className="pl-10 text-sm text-gray-400">{post?.createdAt}</span>
      </div>
      <Link to={`/posts/${post?.id}`}>
        <div className="pl-10 pointerhover:hover:underline">
          <div className="my-3 text-xl font-bold">{post?.title}</div>
          <p className="text-gray-500">{post?.summary}</p>
        </div>
      </Link>

      {post?.email === user?.email && (
        <div className="flex flex-row-reverse gap-2 mr-3 text-sm text-gray-400 post__utill-box">
          <button
            className="pointerhover:hover:text-gray-800"
            role="presentation"
            onClick={() => handleDelete(post?.id as string)}
          >
            削除
          </button>
          <button className="pointerhover:hover:text-gray-800">
            <Link to={`/posts/${post?.id}/edit`}>修正</Link>
          </button>
        </div>
      )}
    </li>
  );
};

export default PostListItem;
