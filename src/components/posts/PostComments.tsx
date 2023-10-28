import { CommentsInterface, PostListProps } from '@/components/posts/PostList';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import AuthContext from '@/context/AuthContext';
import { db } from '@/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface PostCommentsProps {
  post: PostListProps;
  getPost: (id: string) => void;
}

const PostComments = ({ post, getPost }: PostCommentsProps) => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: '',
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    const { comment } = data;
    try {
      if (post && post?.id) {
        const postRef = doc(db, 'posts', post.id);
        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            userName: user.displayName,
            createdAt: new Date()?.toLocaleDateString('ja', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          };
          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updateDated: new Date()?.toLocaleDateString('ja', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          });
          getPost(post.id);
          setValue('comment', '');
        }
      }
      toast.success('コメントを追加しました');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  });

  const handleDeleteComment = async (comment: CommentsInterface) => {
    const confirm = window.confirm('このコメントを削除しますか？');
    if (confirm && post.id) {
      const postRef = doc(db, 'posts', post?.id);
      await updateDoc(postRef, {
        comments: arrayRemove(comment),
      });
      toast.success('コメントを削除しました');
      await getPost(post.id);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={onSubmit}>
        <div>
          <Textarea
            id="comment"
            label="コメント"
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
        </div>
        <Button label="入力" small comment />
      </form>
      <ul className="mt-10 comment__list">
        {post?.comments
          ?.slice(0)
          .reverse()
          .map((comment) => (
            <li
              key={comment.createdAt}
              className="flex flex-col gap-2 py-3 border-b"
            >
              <address className="flex not-italic">
                <div className="flex items-center gap-3">
                  <div className="text-base font-medium">
                    {comment?.userName}
                  </div>
                  <div className="hidden text-sm text-gray-400 sm:block">
                    {comment?.email}
                  </div>
                </div>
              </address>
              <div className="text-sm text-gray-600 dark:text-slate-300">
                {comment?.content}

                <div className="flex items-center justify-between pt-3">
                  <div className="text-sm text-gray-400 dark:text-slate-500">
                    {comment?.createdAt}
                  </div>

                  {comment?.uid === user?.uid && (
                    <div
                      className="text-sm text-gray-400 underline cursor-pointer pointerhover:hover:text-gray-800 dark:pointerhover:hover:text-slate-100"
                      role="presentation"
                      onClick={() => handleDeleteComment(comment)}
                    >
                      削除
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PostComments;
