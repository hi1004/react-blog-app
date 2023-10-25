import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, dirtyFields },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const isFormFilled = Object.keys(dirtyFields).length === 2;
  return (
    <section className="flex flex-col h-full justify-center w-full gap-4 p-5 sm:max-w-[80%] md:max-w-[1280px] ">
      <div className="flex flex-col gap-4 sm:gap-8 md:flex-row">
        <form
          onSubmit={handleSubmit(async (data) => {
            await new Promise((r) => setTimeout(r, 1000));
            alert(JSON.stringify(data));
          })}
          method="POST"
          className="flex flex-col justify-center flex-1 max-w-full gap-6"
        >
          <h1 className="pb-1 pl-2 mb-5 text-4xl font-bold border-l-8 border-l-sky-600">
            LOGIN<span className="ml-4 text-sm">ログイン</span>
          </h1>
          <div className="flex flex-col gap-4">
            <Input
              id="email"
              type="email"
              label="メールアドレス"
              register={register}
              placeholder="example@example.com"
              errors={errors}
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
              isIcon
              placeholder="＊＊＊＊＊＊＊＊＊"
              errors={errors}
              isSubmitted={isSubmitted}
              required
            />
          </div>

          <Button
            label="ログインする"
            disabled={isSubmitting || !isFormFilled}
          />
        </form>
        <div className="h-[1px] md:w-[1px] sm:h-full border"></div>
        <div className="flex flex-col items-center justify-center flex-1 h-full gap-6 py-8 rounded-lg bg-neutral-100 md:py-0">
          <div className="text-center">
            <h2 className="mb-4 text-2xl">初めてご利用の方</h2>
            <p className="text-sm">
              ブログを書く・閲覧には
              <span className="text-green-600">会員登録</span>
              が必要です
            </p>
          </div>
          <Link to="/signup" className="flex md:w-[60%] w-full">
            <Button label="新規会員登録" color="-green-600" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SigninForm;
