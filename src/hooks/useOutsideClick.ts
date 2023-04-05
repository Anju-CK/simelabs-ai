import React, { useEffect } from "react";

//pass ref and an action
export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  setOpen: (value: boolean) => void,
  ref2?: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (ref2?.current) {
          if (!ref2?.current.contains(event.target)) setOpen(false);
        } else {
          setOpen(false);
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
