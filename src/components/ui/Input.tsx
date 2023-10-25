import Label from '@/components/ui/Label';
import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai';
import { BiCheckSquare } from 'react-icons/bi';
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
  errors,
  isIcon,
  isSubmitted,
}: InputProps) => {
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
        {...register(id, { required })}
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
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-sky-600'}
        `}
        aria-invalid={isSubmitted ? (errors[id] ? 'true' : 'false') : undefined}
      />
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
