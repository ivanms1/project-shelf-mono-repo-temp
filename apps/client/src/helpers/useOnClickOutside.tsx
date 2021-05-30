import { useEffect } from 'react';

function useOnClickOutside(ref: any, setVisibility: any) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (ref?.current?.contains(event?.target)) {
        return;
      }
      setVisibility(false);
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, setVisibility]);
}

export default useOnClickOutside;
