import { app } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Profile = () => {
  const auth = getAuth(app);
  console.log(auth?.currentUser);
  const onSignOut = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      toast.success('ログアウトしました');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  return (
    <section className="flex flex-col w-full h-full gap-4 p-5 sm:max-w-[680px]">
      <div className="flex items-center justify-between max-w-[680px] pt-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 post__profile ">
            <FaUserCircle className="w-full h-full text-sky-600" />
          </div>
          <address className="not-italic">
            <div className="pb-1 font-medium">{auth?.currentUser?.email}</div>
            <div>{auth?.currentUser?.displayName || 'User'}</div>
          </address>
        </div>
        <div
          role="presentation"
          className="mr-3 text-sm text-gray-500 underline cursor-pointer"
          onClick={onSignOut}
        >
          ログアウト
        </div>
      </div>
    </section>
  );
};

export default Profile;
