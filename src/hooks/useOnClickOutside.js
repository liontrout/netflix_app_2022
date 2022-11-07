import { useEffect } from 'react';

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    // console.log("ref", ref);

    const listener = e => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      handler(e);
    }
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {// 컴포넌트가 언마운트될 때 리스너들을 삭제
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    }
  }, [ref, handler]);
  
}

export default useOnClickOutside;