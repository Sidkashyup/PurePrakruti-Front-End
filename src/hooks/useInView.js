import { useEffect, useRef, useState } from "react"

export const useInView = (options = {}) => {
  // interface IntersectionObserverInit {
//   root?: Element | null;
//   rootMargin?: 0px 0px -100px 0px;
//   threshold?: 0.2;
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
