import Label from '@/components/ui/Label';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface TextareaProps {
  id: string;
  label: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isSubmitted: boolean;
  onChange?: () => void;
}

const Textarea = ({
  id,
  required,
  label,
  placeholder,
  register,
  errors,
  isSubmitted,
}: TextareaProps) => {
  return (
    <div className="relative w-full">
      <Label htmlFor={id} errors={errors} label={label} comment />
      <textarea
        id={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className={`
          w-full
          p-2
          mt-2
          min-h-[100px]
          font-light
          border-2
        bg-white
          rounded-md
          resize-none
          outline-none
          transition
          dark:bg-slate-900
          disabled:opacity-70
          disabled:cursor-not-allowed
      ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
      ${errors[id] ? 'focus:border-rose-500' : 'focus:border-sky-600'}
              aria-invalid={isSubmitted ? (errors[id] ? 'true' : 'false') : undefined}
      `}
        aria-invalid={isSubmitted ? (errors[id] ? 'true' : 'false') : undefined}
      />
    </div>
  );
};

export default Textarea;
