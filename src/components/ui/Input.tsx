import Label from '@/components/ui/Label';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

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
  isSubmitted,
}: InputProps) => {
  return (
    <div className="relative w-full">
      <Label htmlFor={id} errors={errors} label={label} position={position} />
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        type={type}
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
          ${position ? 'p-4 pt-6' : 'mt-2'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-sky-600'}
        `}
        aria-invalid={isSubmitted ? (errors[id] ? 'true' : 'false') : undefined}
      />
    </div>
  );
};

export default Input;
