import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface PostListItemProps {
  id: number;
}

const PostListItem = ({ id }: PostListItemProps) => {
  const { user } = useContext(AuthContext);
  return (
    <li className="py-6 leading-6 border-t border-t-gray-200">
      <Link to={`/posts/${id}`}>
        <div className="flex items-center gap-2 text-sm post__profile-box">
          <div className="post__profile w-9 h-9 ">
            <FaUserCircle className="w-full h-full text-sky-600" />
          </div>
          <div className="text-gray-400 post__author">{user?.email}</div>
          <div className="text-gray-400 post__author">{user?.displayName}</div>
          <span className="text-gray-400">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        <div className="pointerhover:hover:underline">
          <div className="my-3 text-xl font-bold">posts {id}</div>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
            veritatis blanditiis? Tenetur placeat ipsam enim magnam quae
            architecto, velit alias, quod vero adipisci quisquam cupiditate eum
            accusantium cum aliquam maxime?Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Iure impedit nam maxime voluptatum
            architecto unde commodi ea aspernatur, necessitatibus iste?Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Velit placeat
            tempore cum, officiis accusamus, similique repellat minima
            cupiditate recusandae mollitia impedit commodi facere sunt quam
            libero doloremque veritatis modi iste.
          </p>
        </div>
      </Link>
      <div className="flex flex-row-reverse gap-2 mr-3 text-sm text-gray-400 post__utill-box">
        <button className="pointerhover:hover:text-gray-800">修正</button>
        <button className="pointerhover:hover:text-gray-800">削除</button>
      </div>
    </li>
  );
};

export default PostListItem;
