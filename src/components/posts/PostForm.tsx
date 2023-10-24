import TuiEditor from '@/components/posts/TuiEditor';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Editor } from '@toast-ui/react-editor';

import { useRef, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
const PostForm = () => {
  const editorRef = useRef<Editor | null>(null)!;
  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current?.getInstance().getHTML();
      setEditorContent(newContent);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, dirtyFields },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      summary: '',
      content: '',
    },
  });
  const isFormFilled = Object.keys(dirtyFields).length === 3;

  return (
    <section className="flex flex-col w-full h-full gap-4 p-5 sm:max-w-[1080px]">
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
          label="Title"
          register={register}
          placeholder="React Hook Form ライブラリーを使って見た。"
          errors={errors}
          isSubmitted={isSubmitted}
          required
        />
        <Input
          id="summary"
          label="Summary"
          register={register}
          placeholder="Formを簡単に実装する。"
          errors={errors}
          isSubmitted={isSubmitted}
        />
        <Textarea
          id="content"
          label="Content"
          placeholder="テキストを入力してください。"
          errors={errors}
          register={register}
          isSubmitted={isSubmitted}
          required
        />
        <TuiEditor
          content={editorContent}
          editorRef={editorRef}
          onChange={handleEditorChange}
          {...editorRef.current?.props.onFocus}
        />

        <Button label="Submit" disabled={isSubmitting || !isFormFilled} />
      </form>
    </section>
  );
};

export default PostForm;
