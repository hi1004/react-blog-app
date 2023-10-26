import { PostListProps } from '@/components/posts/PostList';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface PostListItem {
  post: PostListProps;
}
const PostListItem = ({ post }: PostListItem) => {
  const { user } = useContext(AuthContext);
  return (
    <li className="py-6 pl-4 leading-6 border-t odd:border-t-gray-200 even:bg-slate-100 rounded-xl">
      <Link to={`/posts/${post?.id}`}>
        <div className="flex items-center gap-2 text-sm post__profile-box">
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
        <div className="pl-10 pointerhover:hover:underline">
          <div className="my-3 text-xl font-bold">{post?.title}</div>
          <p className="text-gray-500">{post?.summary}</p>
        </div>
      </Link>
      <span className="pl-10 text-sm text-gray-400">{post?.createdAt}</span>
      {post?.email === user?.email && (
        <div className="flex flex-row-reverse gap-2 mr-3 text-sm text-gray-400 post__utill-box">
          <button className="pointerhover:hover:text-gray-800">
            <Link to={`/posts/${post?.id}/edit`}>修正</Link>
          </button>
          <button className="pointerhover:hover:text-gray-800">削除</button>
        </div>
      )}
    </li>
  );
};

export default PostListItem;
