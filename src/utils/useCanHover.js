import { useEffect, useState } from 'react';

const QUERY = '(hover: hover) and (pointer: fine)';

// True on devices with a real hover-capable pointer. Touch screens emulate
// mouseenter/mousemove on tap, which leaves hover effects (like card tilt)
// stuck in their hovered state until the next tap elsewhere.
const useCanHover = () => {
  const [canHover, setCanHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = (e) => setCanHover(e.matches);
    setCanHover(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return canHover;
};

export default useCanHover;
