import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import { FieldValues, useForm } from 'react-hook-form';

const COMMENTS = [
  {
    id: 1,
    email: 'test@example.com',
    content: 'lorem ipsum dolor',
    userName: 'boyreda',
    createdAt: new Date().toLocaleDateString(),
  },
  {
    id: 2,
    email: 'test@example.com',
    userName: 'dffdd',
    content: 'dsafasf',
    createdAt: new Date().toLocaleDateString(),
  },
];
const onSubmit = () => {};
const PostComments = () => {
  const {
    register,
    formState: { errors, isSubmitted },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: '',
    },
  });
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
        {COMMENTS?.map((comment) => (
          <li key={comment.id} className="flex flex-col gap-2 py-3 border-b">
            <address className="flex not-italic">
              <div className="flex items-center gap-1">
                <div>{comment?.userName}</div>
                <div className="text-sm text-gray-400">{comment?.email}</div>
                <div className="text-sm text-gray-400">
                  {comment?.createdAt}
                </div>
                <div className="text-sm text-gray-400 underline cursor-pointer pointerhover:hover:text-gray-800">
                  delete
                </div>
              </div>
            </address>
            <div className="text-sm text-gray-800">{comment?.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostComments;
