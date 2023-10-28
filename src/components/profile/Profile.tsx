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
    <div className="flex flex-col w-full h-full gap-4 p-5 sm:max-w-[680px] m-auto">
      <h1 className="max-w-[680px] pb-1 pl-2 mt-3 text-3xl sm:text-4xl font-bold border-l-8 border-l-sky-600">
        Profile<span className="ml-4 text-sm">プロフィール</span>
      </h1>
      <div className="flex items-end justify-between max-w-[680px] pt-5">
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
          className="mr-3 text-sm text-gray-500 underline cursor-pointer pointerhover:hover:text-gray-800 dark:pointerhover:hover:text-slate-100"
          onClick={onSignOut}
        >
          ログアウト
        </div>
      </div>
    </div>
  );
};

export default Profile;
