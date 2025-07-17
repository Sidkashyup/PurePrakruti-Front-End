import { useEffect, useRef, useState } from "react"

export const useInView = (options = {}) => {
  // interface IntersectionObserverInit {
//   root?: Element | null;
//   rootMargin?: string;
//   threshold?: number | number[];
// }

  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { 
      if(entry.isIntersecting){
        setIsInView(true);
        observer.disconnect();
      }

    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];

} 
