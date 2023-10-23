import PostList from '@/components/posts/PostList';
import PostNavigation from '@/components/posts/PostNavigation';

const HomePage = () => {
  return (
    <section>
      <PostNavigation />
      <PostList />
    </section>
  );
};

export default HomePage;
