import { CATEGORIES, CategoryType, TabType } from '@/components/posts/PostList';

interface PostNavigationProps {
  setActiveTab: (id: TabType | CategoryType) => void;
  activeTab?: TabType | CategoryType;
}
const PostNavigation = ({ setActiveTab, activeTab }: PostNavigationProps) => {
  return (
    <nav className="flex gap-3 sm:gap-6 max-w-[680px] m-auto pt-2 sm:pt-4 px-5">
      <button
        className={`${
          activeTab === 'all' ? 'font-bold' : ''
        }  text-gray-800 hover:text-gray-800`}
        onClick={() => setActiveTab('all')}
      >
        全体
      </button>
      <button
        className={`${
          activeTab === 'my' ? 'font-bold' : ''
        }  text-gray-800 hover:text-gray-800`}
        onClick={() => setActiveTab('my')}
      >
        私の投稿
      </button>
      {CATEGORIES?.map((category) => (
        <button
          role="presentation"
          key={category}
          onClick={() => setActiveTab(category)}
          className={`${
            activeTab === category ? 'font-bold' : ''
          } text-gray-800 hover:text-gray-800`}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default PostNavigation;
