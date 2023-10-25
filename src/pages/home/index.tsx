import Carousel from '@/components/carousel/Carousel';
import PostList from '@/components/posts/PostList';
import PostNavigation from '@/components/posts/PostNavigation';
import '@/pages/home/index.css';
const HomePage = () => {
  return (
    <section className="relative w-full">
      <Carousel />
      <PostNavigation />
      <PostList />
    </section>
  );
};

export default HomePage;
