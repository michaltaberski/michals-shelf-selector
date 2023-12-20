import { RefObject, useEffect, useRef, useState } from "react";
import { Point } from "./types";

export const useResizeObserver = (ref: RefObject<HTMLDivElement>): Point => {
  const [refSize, setRefSize] = useState<Point>([0, 0]);
  const observer = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (ref.current) {
      observer.current = new ResizeObserver((entries) => {
        const [resizeEntry] = entries;
        const { width, height } = resizeEntry.target.getBoundingClientRect();
        setRefSize([width, height]);
      });

      observer.current.observe(ref.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ref]);

  return refSize;
};
