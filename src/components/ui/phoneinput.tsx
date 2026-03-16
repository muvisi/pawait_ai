'use client';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { cn } from '../../lib/utils';

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

const PhoneInputWrapper = ({ value, onChange, disabled, className }: Props) => {
  return (
    <div
      className={cn(
        'rounded-md border border-input bg-background transition-colors duration-200',
        'focus-within:border-teal-500',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <PhoneInput
        country={'ke'} // or set dynamically based on user
        value={value}
        onChange={(phone) => onChange('+' + phone)} // keep international format
        inputClass={cn(
          '!w-full bg-transparent text-base placeholder:text-muted-foreground',
          '  py-3 border-none outline-none focus:outline-none text-foreground',
          'md:text-sm'
        )}
        containerClass="!w-full"
        buttonStyle={{
          border: 'none',
          background: 'transparent',
          position: 'absolute',
          left: '0.5rem',
        }}
        searchStyle={{
          fontSize: '14px',
        }}
        dropdownStyle={{
          zIndex: 9999,
        }}
        disabled={disabled}
        enableSearch
      />
    </div>
  );
};

export default PhoneInputWrapper;
