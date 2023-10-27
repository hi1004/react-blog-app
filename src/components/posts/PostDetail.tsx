import PostComments from '@/components/posts/PostComments';
import { PostListProps } from '@/components/posts/PostList';
import Loader from '@/components/ui/Loader';
import AuthContext from '@/context/AuthContext';
import { db } from '@/firebase';
import { Viewer } from '@toast-ui/react-editor';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostDetail = () => {
  const [post, setPost] = useState<PostListProps | null>(null);
  const { user } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap?.data());

      setPost({ id: docSnap.id, ...(docSnap.data() as PostListProps) });
    }
  };
  const handleDelete = async () => {
    const confirm = window.confirm('該当ブログを削除しますか？');
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, 'posts', post.id));
      toast.success('ブログを削除しました');
      navigate('/');
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);
  return (
    <>
      {post ? (
        <section className="flex flex-col w-full h-full p-5 sm:max-w-[680px]">
          <div className="mt-10 mb-4 text-4xl font-bold">{post?.title}</div>
          <div
            className={`flex items-center justify-between gap-2 pb-3 text-sm border-b post__profile-box`}
            role="presentation"
          >
            <div
              className={`flex gap-2 ${
                post?.email === user?.email && 'cursor-pointer'
              }`}
            >
              <div className="post__profile w-9 h-9 ">
                <FaUserCircle className="w-full h-full text-sky-600" />
              </div>
              <div className="flex flex-col">
                <div className="text-gary-700">{post?.userName}</div>
                <div className="text-xs text-gray-400">{post?.email}</div>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between py-4 text-sm text-gray-400 border-b post__utill-box">
            <div className="flex flex-col-reverse items-center gap-3 ">
              {post?.email === user?.email && (
                <div className="flex gap-2">
                  <button className="pointerhover:hover:text-gray-800">
                    <Link to={`/posts/${post?.id}/edit`}>修正</Link>
                  </button>
                  <button
                    className="pointerhover:hover:text-gray-800"
                    onClick={handleDelete}
                  >
                    削除
                  </button>
                </div>
              )}
              {post?.category && (
                <div className="px-3 py-1 text-gray-600 border border-gray-400 rounded-2xl">
                  {post?.category}
                </div>
              )}
            </div>
            <span className="text-gray-400 ">{post?.createdAt}</span>
          </div>
          <div className="px-5 py-3 mt-5 bg-gray-100">
            <Viewer initialValue={post?.content} />
          </div>
          <PostComments />
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PostDetail;
