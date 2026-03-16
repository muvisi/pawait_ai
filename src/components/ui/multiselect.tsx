// components/ui/multi-select.tsx

import * as Checkbox from '@radix-ui/react-checkbox';
import * as Popover from '@radix-ui/react-popover';
import { Check, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select options',
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 min-h-[40px] cursor-pointer text-sm flex flex-wrap gap-2 items-center">
          {selected.length > 0 ? (
            selected.map((val) => (
              <span
                key={val}
                className="bg-teal-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1"
              >
                {val}
                <X
                  size={12}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(val);
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronDown className="ml-auto h-4 w-4 text-gray-500" />
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-50 w-[240px] rounded-md border bg-white dark:bg-gray-900 p-2 shadow-md space-y-1"
          side="bottom"
          align="start"
        >
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              <Checkbox.Root
                className="h-4 w-4 border border-gray-300 rounded flex items-center justify-center data-[state=checked]:bg-teal-500"
                checked={selected.includes(option)}
                onCheckedChange={() => toggleOption(option)}
              >
                <Checkbox.Indicator className="text-white">
                  <Check className="h-3 w-3" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              {option}
            </label>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
