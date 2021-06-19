import {useEffect} from "react";

const useOutsideClick = (ref: any, callback: () => void) => {
  const handleClick = (e: any) => {
    if (!ref.current || ref.current.contains(e.target)) {
      return;
    }

    callback();
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  });
};

export default useOutsideClick;
