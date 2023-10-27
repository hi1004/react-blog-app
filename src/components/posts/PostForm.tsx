import { CATEGORIES, PostListProps } from '@/components/posts/PostList';
import TuiEditor from '@/components/posts/TuiEditor';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import AuthContext from '@/context/AuthContext';
import { db } from '@/firebase';
import { Editor } from '@toast-ui/react-editor';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

import { useContext, useEffect, useRef, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const PostForm = () => {
  const editorRef = useRef<Editor | null>(null)!;
  const [editorContent, setEditorContent] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleEditorChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current?.getInstance().getHTML();
      setEditorContent(newContent);
      setValue('content', newContent, {
        shouldDirty: newContent.trim() !== '',
      });
    }
  };
  const [post, setPost] = useState<PostListProps | null>(null);
  const params = useParams();
  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostListProps) });
    }
  };
  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);
  useEffect(() => {
    if (post) {
      setValue('title', post.title);
      setValue('summary', post.summary);
      setValue('category', post.category);
      editorRef.current?.getInstance().setHTML(post.content);
    }
  }, [post]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      summary: '',
      category: CATEGORIES[0],
      content: '',
    },
  });
  const isDisabled =
    isSubmitting ||
    !editorRef?.current?.getInstance().getMarkdown(post?.content) ||
    editorRef?.current
      ?.getInstance()
      .getMarkdown(post?.content)
      .trim() === '' ||
    !watch('title') ||
    !watch('summary');
  const onSubmit = handleSubmit(async (data) => {
    const { title, summary, content, category } = data;
    try {
      if (post && post.id) {
        const postRef = doc(db, 'posts', post?.id);
        await updateDoc(postRef, {
          title,
          summary,
          content,
          category,
          updatedAt: new Date()?.toLocaleDateString('ja', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        });
        toast?.success('ブログを修正しました');
        navigate(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, 'posts'), {
          title,
          summary,
          content,
          category,
          createdAt: new Date()?.toLocaleDateString('ja', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          email: user?.email,
          userName: user?.displayName,
          uid: user?.uid,
        });
        toast.success('ブログが作成されました');
        navigate('/');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  });

  return (
    <section className="flex flex-col justify-center w-full h-full gap-4 p-5 sm:max-w-[1080px]">
      <h1 className="pb-1 pl-2 mb-1 text-4xl font-bold border-l-8 border-l-sky-600">
        Write a Blog<span className="ml-4 text-sm">ブログを書く</span>
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center max-w-full gap-4"
      >
        <Input
          id="title"
          label="タイトル"
          register={register}
          placeholder="タイトルを入力してください。"
          errors={errors}
          isSubmitted={isSubmitted}
          required
        />

        <Input
          id="summary"
          label="要約"
          register={register}
          placeholder="内容を要約してください。"
          errors={errors}
          isSubmitted={isSubmitted}
          required
        />
        <Select
          id="category"
          label="カテゴリ"
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          setValue={setValue}
          required
        />

        <TuiEditor
          content={editorContent}
          editorRef={editorRef}
          onChange={handleEditorChange}
        />

        <Button label={post ? '修正' : '投稿'} disabled={isDisabled} />
      </form>
    </section>
  );
};

export default PostForm;
