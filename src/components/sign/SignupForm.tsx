import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { app } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      password_confirm: '',
    },
  });
  const hasNoErrors = Object.keys(errors).length === 0;
  const onSubmit = handleSubmit(async (data) => {
    const { email, password, username } = data;
    try {
      const auth = getAuth(app);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      if (user) {
        await updateProfile(user, {
          displayName: username,
        });
      }
      toast.success('新規会員登録に成功しました');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
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
          <h1 className="pb-1 pl-2 text-4xl font-bold border-l-8 dark:text-slate-100 md:mb-5 border-l-sky-600">
            SIGNUP<span className="ml-4 text-sm">新規会員登録</span>
          </h1>
          <div className="flex flex-col gap-4">
            <Input
              id="email"
              label="メールアドレス"
              register={register}
              placeholder="example@example.com"
              errors={errors}
              position
              watch={watch}
              getValues={getValues}
              isIcon
              isSubmitted={isSubmitted}
              required
            />

            <Input
              id="username"
              label="ニックネーム"
              register={register}
              position
              isIcon
              placeholder="びょんびょん"
              errors={errors}
              watch={watch}
              isSubmitted={isSubmitted}
              required
            />
            <Input
              id="password"
              type="password"
              label="パスワード"
              register={register}
              position
              isIcon
              watch={watch}
              placeholder="＊＊＊＊＊＊＊＊＊"
              errors={errors}
              isSubmitted={isSubmitted}
              required
            />
            <Input
              id="password_confirm"
              type="password"
              label="パスワード確認"
              register={register}
              position
              watch={watch}
              isIcon
              placeholder="＊＊＊＊＊＊＊＊＊"
              errors={errors}
              isSubmitted={isSubmitted}
              required
            />
          </div>

          <Button
            label="新規会員登録"
            disabled={isSubmitting || !hasNoErrors}
          />
        </form>
        <div className="h-[1px] md:w-[1px] sm:h-full border dark:border-slate-400"></div>
        <div className="flex flex-col items-center justify-center flex-1 h-full gap-6 px-4 py-8 rounded-lg dark:bg-slate-800 dark:text-slate-50 bg-neutral-100 md:py-0">
          <div className="text-center">
            <h2 className="mb-4 text-2xl">
              アカウントを既にお持ちの方はこちら
            </h2>
          </div>
          <Link to="/signin" className="flex md:w-[60%] w-full">
            <Button label="ログインする" outline />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
