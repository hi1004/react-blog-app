import TuiEditor from '@/components/posts/TuiEditor';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Editor } from '@toast-ui/react-editor';

import { useRef, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
const PostForm = () => {
  const editorRef = useRef<Editor | null>(null)!;
  const [editorContent, setEditorContent] = useState('');
  const handleEditorChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current?.getInstance().getMarkdown();
      setEditorContent(newContent);
      setValue('content', newContent, {
        shouldDirty: newContent.trim() !== '',
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, dirtyFields },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      summary: '',
      content: '',
    },
  });
  const isFormFilled = Object.keys(dirtyFields).length === 3;
  return (
    <section className="flex flex-col justify-center w-full h-full gap-4 p-5 sm:max-w-[1080px]">
      <form
        onSubmit={handleSubmit(async (data) => {
          await new Promise((r) => setTimeout(r, 1000));
          alert(JSON.stringify(data));
        })}
        method="POST"
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

        <TuiEditor
          content={editorContent}
          editorRef={editorRef}
          onChange={handleEditorChange}
        />

        <Button
          label="提出"
          disabled={
            isSubmitting || !isFormFilled || editorContent.trim() === ''
          }
        />
      </form>
    </section>
  );
};

export default PostForm;
