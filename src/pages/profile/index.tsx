import PostList from '@/components/posts/PostList';
import Profile from '@/components/profile/Profile';

const ProfilePage = () => {
  return (
    <section className="max-w-[680px] w-full">
      <Profile />
      <PostList hasNavigation={false} defaultTab="my" />
    </section>
  );
};

export default ProfilePage;
