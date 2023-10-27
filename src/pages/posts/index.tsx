import PostList from '@/components/posts/PostList';

const PostListPage = () => {
  return (
    <section className="w-full">
      <h1 className="max-w-[680px] m-auto pb-1 pl-2 mt-9 text-4xl font-bold border-l-8 border-l-sky-600">
        List of Blogs<span className="ml-4 text-sm">記事一覧</span>
      </h1>
      <PostList hasNavigation={true} />;
    </section>
  );
};

export default PostListPage;
