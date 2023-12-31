import Carousel from '@/components/carousel/Carousel';
import PostList from '@/components/posts/PostList';
import '@/pages/home/index.css';
const HomePage = () => {
  return (
    <section className="relative w-full">
      <Carousel />
      <PostList hasListTitle={false} />
    </section>
  );
};

export default HomePage;
