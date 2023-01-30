/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useRef } from "react";

export function useThrottling(
  func: (...args: any[]) => any,
  delay: number | undefined = 1000 / 24,
  trailing = false
) {
  const timeoutRef = useRef<NodeJS.Timer | null>(null);

  return (...args: any[]) => {
    if (trailing) {
      if (timeoutRef.current === null) {
        timeoutRef.current = setTimeout(() => {
          func(...args);
          timeoutRef.current = null;
        }, delay);
      }
    } else {
      if (timeoutRef.current === null) {
        func(...args);
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
        }, delay);
      }
    }
  };
}
