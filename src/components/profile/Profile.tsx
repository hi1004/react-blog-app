import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <section className="flex flex-col w-full h-full gap-4 p-5 sm:max-w-[680px]">
      <div className="flex items-center justify-between max-w-[680px] pt-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 post__profile ">
            <FaUserCircle className="w-full h-full text-sky-300" />
          </div>
          <address className="not-italic">
            <div className="pb-1 font-medium">test@test.com</div>
            <div>username</div>
          </address>
        </div>
        <Link to="/" className="mr-3 text-sm text-gray-500 underline">
          LogOut
        </Link>
      </div>
    </section>
  );
};

export default Profile;
