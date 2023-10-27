import PostList from '@/components/posts/PostList';

const PostListPage = () => {
  return (
    <section className="w-full">
      <PostList hasNavigation={true} />;
    </section>
  );
};

export default PostListPage;
