import clsx from 'clsx';
import {
  ButtonHTMLAttributes,
  forwardRef,
  ReactComponentElement,
  ReactNode,
} from 'react';
import Spinner from './Spinner';

const variants = {
  primary: 'bg-indigo-500 text-zinc-100 hover:bg-indigo-600',
  secondary: 'border border-indigo-400 text-indigo-600 hover:bg-indigo-100',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: keyof typeof variants;
  classNames?: string;
  icon?: ReactNode;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', children, className = '', isLoading = false, icon },
    ref
  ) => {
    return (
      <button
        className={clsx(
          'inline-flex items-center justify-center min-w-[2rem] rounded-full px-5 py-2 text-center font-bold text-sm transition-colors uppercase tracking-wide',
          variants[variant],
          className
        )}
      >
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            {icon}
            {children}
          </>
        )}
      </button>
    );
  }
);

export default Button;
