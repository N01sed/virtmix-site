import { useEffect, useRef, useState } from 'react';

interface Options {
  /** Keep reporting true once seen — used for one-shot reveals. */
  once?: boolean;
  rootMargin?: string;
}

export function useInView<T extends Element>(options: Options = {}): [React.RefObject<T | null>, boolean] {
  const { once = false, rootMargin = '0px 0px -8% 0px' } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  return [ref, inView];
}
