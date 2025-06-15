import { useEffect, useState } from 'react';

const useIntersectionObserver = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  options: IntersectionObserverInit = { threshold: 0.1 }
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isVisible;
};


export default useIntersectionObserver;