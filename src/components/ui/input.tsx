import * as React from 'react';
import { cn } from '../../lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <div
        className={cn(
          'rounded-md border border-input bg-background transition-colors duration-200',
          'focus-within:border-teal-500',
          props.disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          type={type}
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-md bg-transparent px-3 py-2 text-base text-foreground placeholder:text-muted-foreground',
            'outline-none border-none focus:outline-none',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'md:text-sm',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input };
