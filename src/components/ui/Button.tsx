import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  comment?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  comment,
  icon: Icon,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        pointerhover:hover:opacity-80
        ${comment ? 'w-[120px] absolute right-0' : 'w-full relative'}
        ${outline ? 'bg-white' : 'bg-sky-600'}
        ${outline ? 'border-sky-600' : 'border-sky-600'}
        ${outline ? 'text-sky-600' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-medium' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
