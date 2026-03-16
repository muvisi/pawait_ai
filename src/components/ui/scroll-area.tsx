'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';
import { cn } from '../../lib/utils';

interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  initialScroll?: 'top' | 'bottom';
  scrollOnMount?: boolean; // new: only scroll to bottom on mount if true
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      children,
      initialScroll = 'bottom',
      scrollOnMount = true,
      ...props
    },
    ref
  ) => {
    const viewportRef = React.useRef<HTMLDivElement>(null);

    // Combine forwarded ref with internal ref
    React.useImperativeHandle(ref, () => viewportRef.current as HTMLDivElement);

    // Scroll to bottom or top on mount only if scrollOnMount=true
    React.useEffect(() => {
      if (!viewportRef.current || !scrollOnMount) return;

      if (initialScroll === 'bottom') {
        viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
      } else {
        viewportRef.current.scrollTop = 0;
      }
    }, [initialScroll, children, scrollOnMount]);

    return (
      <ScrollAreaPrimitive.Root
        className={cn('relative overflow-hidden', className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          ref={viewportRef}
          className="h-full w-full rounded-[inherit]"
        >
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    );
  }
);
ScrollArea.displayName = 'ScrollArea';

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' &&
        'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = 'ScrollBar';

export { ScrollArea, ScrollBar };
