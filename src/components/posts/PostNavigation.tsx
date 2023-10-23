const PostNavigation = () => {
  return (
    <nav className="flex gap-6 max-w-[680px] m-auto pt-9 px-5">
      <button className="font-bold text-gray-800 hover:text-gray-800">
        全体
      </button>
      <button className="text-gray-400 hover:text-gray-800">私の投稿</button>
    </nav>
  );
};

export default PostNavigation;
