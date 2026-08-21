import type { ElementType, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Staggered start, in steps of 40 ms. Keep it under four. */
  step?: number;
  id?: string;
}

export function Reveal({ children, as: Tag = 'div', className = '', step = 0, id }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true });

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={step ? { transitionDelay: `${step * 40}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
