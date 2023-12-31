import { FieldErrors } from 'react-hook-form';

interface LabelProps {
  htmlFor?: string;
  label: string;
  position?: boolean;
  errors: FieldErrors;
  comment?: boolean;
}

const Label = ({ htmlFor, label, position, errors, comment }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`
    absolute
    text-md
    duration-150     
    z-1
    origin-[0]
    ${
      position
        ? 'absolute top-5 transform -translate-y-3 pl-4'
        : 'relative text-black'
    }
    ${comment ? 'font-bold' : 'font-medium'}
    peer-placeholder-shown:scale-100 
    peer-placeholder-shown:translate-y-0
    peer-focus:scale-75
    peer-focus:translate-y-4
    
    ${errors[htmlFor || ''] ? 'text-rose-500' : 'text-inherit'}
    `}
    >
      {label}
    </label>
  );
};

export default Label;
