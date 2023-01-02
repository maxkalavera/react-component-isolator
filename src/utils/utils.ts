import { useRef } from "react";

export const buildThrottlingFunction = (
  exec: Function,
  ref: React.MutableRefObject<NodeJS.Timer | null>,
  delay: number | undefined = 1000/24
) => {
  return () => {
    if (ref.current === null) {
      exec();
      ref.current = setTimeout(() => {
        ref.current = null;
      }, delay);
    }  
  };
};

function useThrottling({
  delay=1000/24,
  trailing=false,
}: {
  delay?: number | undefined,
  trailing?: boolean,
}) {
  const timeoutRef = useRef<NodeJS.Timer | null>(null);
  const execRef = useRef<Function | null>(null); 

  return (exec: Function) => {
    if (trailing) {
      if (timeoutRef.current === null) {
        execRef.current = exec;
        timeoutRef.current = setTimeout(() => {
          if (execRef.current !== null)
            execRef.current();
          timeoutRef.current = null;
        }, delay);
      }  

    } else {
      if (timeoutRef.current === null) {
        exec();
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
        }, delay);
      }  
    }

  };
};
