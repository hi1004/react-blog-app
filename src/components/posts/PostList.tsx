import PostListItem from '@/components/posts/PostListItem';

const PostList = () => {
  return (
    <ul className="max-w-[680px] m-auto p-5">
      {[...Array(10)].map((_, index) => (
        <PostListItem key={index} id={index} />
      ))}
    </ul>
  );
};

export default PostList;
