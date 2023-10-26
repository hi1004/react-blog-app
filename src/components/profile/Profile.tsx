import AuthContext from '@/context/AuthContext';
import { app } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

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

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="flex flex-col w-full h-full gap-4 p-5 sm:max-w-[680px]">
      <div className="flex items-center justify-between max-w-[680px] pt-5">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="w-16 h-16 post__profile ">
            <FaUserCircle className="w-full h-full text-sky-600" />
          </div>
          <address className="not-italic">
            <div className="pb-1 font-medium">{user?.email}</div>
            <div>{user?.displayName}</div>
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
