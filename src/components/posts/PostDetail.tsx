import { FaUserCircle } from 'react-icons/fa';

const PostDetail = () => {
  return (
    <section className="flex flex-col h-full p-5">
      <div className="mt-10 mb-4 text-4xl font-bold">
        Lorem ipsum dolor sit amet.
      </div>
      <div className="flex items-center gap-2 pb-3 text-sm border-b post__profile-box">
        <div className="post__profile w-9 h-9 ">
          <FaUserCircle className="w-full h-full text-sky-300" />
        </div>
        <div className="text-gray-400 post__author">name</div>
        <span className="text-gray-400 ">
          {new Date().toLocaleDateString()}
        </span>
      </div>
      <div className="flex gap-2 py-4 text-sm text-gray-400 border-b post__utill-box">
        <button className="pointerhover:hover:text-gray-800">修正</button>
        <button className="pointerhover:hover:text-gray-800">削除</button>
      </div>
      <p className="pt-5 text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
        veritatis blanditiis? Tenetur placeat ipsam enim magnam quae architecto,
        velit alias, quod vero adipisci quisquam cupiditate eum accusantium cum
        aliquam maxime?
      </p>
    </section>
  );
};

export default PostDetail;
