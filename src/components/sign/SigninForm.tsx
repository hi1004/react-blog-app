import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { app } from '@/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SigninForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const hasNoErrors = Object.keys(errors).length === 0;
  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('ログインに成功しました');
      navigate('/');
      setError(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setError(true);
      toast.error(error?.code);
    }
  });
  return (
    <section className="flex flex-col h-full justify-center w-full gap-4 p-5 sm:max-w-[80%] md:max-w-[1280px] ">
      <div className="flex flex-col gap-4 sm:gap-8 md:flex-row">
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center flex-1 max-w-full gap-6"
        >
          <h1 className="pb-1 pl-2 mb-5 text-4xl font-bold border-l-8 border-l-sky-600">
            LOGIN<span className="ml-4 text-sm">ログイン</span>
          </h1>
          <div className="flex flex-col gap-4">
            <Input
              id="email"
              label="メールアドレス"
              register={register}
              placeholder="example@example.com"
              errors={errors}
              error={error}
              position
              isIcon
              isSubmitted={isSubmitted}
              required
            />
            <Input
              id="password"
              type="password"
              label="パスワード"
              register={register}
              position
              error={error}
              isIcon
              placeholder="＊＊＊＊＊＊＊＊＊"
              errors={errors}
              isSubmitted={isSubmitted}
              required
            />
          </div>

          <Button
            label="ログインする"
            disabled={isSubmitting || !hasNoErrors}
          />
        </form>
        <div className="h-[1px] md:w-[1px] sm:h-full border"></div>
        <div className="flex flex-col items-center justify-center flex-1 h-full gap-6 py-8 rounded-lg bg-neutral-100 md:py-0">
          <div className="text-center">
            <h2 className="mb-4 text-2xl">初めてご利用の方</h2>
            <p className="text-sm">
              ブログを書く・閲覧には
              <span className="text-green-800">会員登録</span>
              が必要です
            </p>
          </div>
          <Link to="/signup" className="flex md:w-[60%] w-full">
            <Button label="新規会員登録" outline />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SigninForm;
