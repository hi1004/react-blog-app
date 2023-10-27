import { CATEGORIES } from '@/components/posts/PostList';
import Label from '@/components/ui/Label';
import {
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
interface SlectProps {
  id: string;
  label: string;
  disabled?: boolean;
  position?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  getValues?: UseFormGetValues<FieldValues>;
  errors: FieldErrors;
  isSubmitted: boolean;
  setValue?: UseFormSetValue<FieldValues>;
}

const Select = ({
  id,
  label,
  disabled,
  position,
  required,
  errors,
  register,
  isSubmitted,
}: SlectProps) => {
  return (
    <div className="relative flex flex-col w-full">
      <Label htmlFor={id} errors={errors} label={label} position={position} />

      <select
        id={id}
        disabled={disabled}
        required={required}
        defaultValue={CATEGORIES[0]}
        {...register(id)}
        className={`
          w-[150px]
          p-2
          font-light
          border-2
          bg-white
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${position ? 'p-4 pt-8' : 'mt-2'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-sky-600'}
        `}
        aria-invalid={isSubmitted ? (errors[id] ? 'true' : 'false') : undefined}
      >
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
