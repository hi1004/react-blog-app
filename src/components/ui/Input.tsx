import Label from '@/components/ui/Label';
import { useState } from 'react';
import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai';
import { BiCheckSquare } from 'react-icons/bi';
import { CgDanger } from 'react-icons/cg';
import { FcApproval } from 'react-icons/fc';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  position?: boolean;
  required?: boolean;
  placeholder?: string;
  name?: string;
  register: UseFormRegister<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  getValues?: UseFormGetValues<FieldValues>;
  errors: FieldErrors;
  isSubmitted: boolean;
  isIcon?: boolean;
}

const Input = ({
  id,
  label,
  type = 'text',
  disabled,
  position,
  register,
  required,
  placeholder,
  watch,
  errors,
  isIcon,
  isSubmitted,
}: InputProps) => {
  const errorMessage = (errors[id] as FieldError)?.message || '';

  const passwordValue = watch && watch('password');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registerValid: Record<string, any> = {};

  if (id === 'email') {
    registerValid.pattern = {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      message: `${label}が正しくありません`,
    };
  } else if (id === 'username') {
    registerValid.minLength = {
      value: 2,
      message: `${label}は2文字以上でなければなりません`,
    };
  } else if (id === 'password') {
    registerValid.minLength = {
      value: 8,
      message: `${label}は8文字以上でなければなりません`,
    };
  } else {
    registerValid.validate = (value: string) => {
      if (value === passwordValue && value.length >= 8) {
        return true;
      } else {
        if (value.length < 8) {
          return `${label}は8文字以上でなければなりません`;
        }
        return `${label}がパスワードと一致していません`;
      }
    };
  }

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  if (type === 'password' && isVisiblePassword) {
    type = 'text';
  }
  return (
    <div className="relative w-full">
      <Label htmlFor={id} errors={errors} label={label} position={position} />

      <input
        id={id}
        disabled={disabled}
        {...register(id, {
          required: '必須',
          ...registerValid,
        })}
        required={required}
        placeholder={placeholder}
        type={type === 'password' && isVisiblePassword ? 'password' : type}
        className={`
          w-full
          p-2
          font-light
          border-2
        bg-white
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${isIcon ? 'pl-10' : ''}
          ${position ? 'p-4 pt-8' : 'mt-2'}
          ${errors[id] ? 'border-rose-500' : ''}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-sky-600'}
          ${
            isSubmitted
              ? errors[id]
                ? 'border-rose-500'
                : 'border-green-600'
              : undefined
          }
        `}
        aria-invalid={isSubmitted ? (errors[id] ? 'true' : 'false') : undefined}
      />
      {errorMessage && (
        <div className="absolute bottom-2 right-2 text-rose-500">
          {
            <small className="flex items-center gap-1">
              <CgDanger size={16} /> {errorMessage}
            </small>
          }
        </div>
      )}

      {isSubmitted && !errorMessage && (
        <div className="absolute bottom-2 right-2">
          {
            <small className="flex items-center gap-1">
              <FcApproval size={16} />
            </small>
          }
        </div>
      )}

      {isIcon && (
        <>
          <div className="absolute top-[50%] left-4">
            {id === 'email' && (
              <HiOutlineMail className="text-sky-600" size={21} />
            )}
            {id === 'username' && (
              <AiOutlineUser className="text-sky-600" size={21} />
            )}
            {id === 'password' && (
              <RiLockPasswordLine className="text-sky-600" size={21} />
            )}
            {id === 'password_confirm' && (
              <BiCheckSquare className="text-sky-600" size={21} />
            )}
          </div>

          <div className="absolute top-0 flex items-center h-full right-4">
            <div
              role="presentation"
              onMouseDown={() => setIsVisiblePassword(true)}
              onMouseUp={() => setIsVisiblePassword(false)}
            >
              {isVisiblePassword
                ? (id === 'password' || id === 'password_confirm') && (
                    <AiFillEye
                      className="cursor-pointer text-sky-600"
                      size={22}
                    />
                  )
                : (id === 'password' || id === 'password_confirm') && (
                    <AiFillEyeInvisible
                      className="cursor-pointer text-sky-600"
                      size={22}
                    />
                  )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Input;
