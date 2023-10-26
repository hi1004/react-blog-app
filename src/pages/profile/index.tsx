import PostList from '@/components/posts/PostList';
import Profile from '@/components/profile/Profile';

const ProfilePage = () => {
  return (
    <section className="max-w-[640px] w-full">
      <Profile />
      <PostList />
    </section>
  );
};

export default ProfilePage;
