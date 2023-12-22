import React, { RefObject, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Point, Polygon, Rectangle } from "./types";

/**
 * Simple alias
 */
export const cn = twMerge;

export const useRichState = <T extends object>(initialState: T) => {
  const [state, setState] = React.useState<T>(initialState);

  const updateState = (newState: Partial<T>, cb?: (state: T) => void) => {
    setState((prevState) => {
      const nextState = { ...prevState, ...newState };
      cb?.(nextState);
      return nextState;
    });
  };

  const resetState = (newState: Partial<T> = {}, cb?: (state: T) => void) => {
    const nextState = { ...initialState, ...newState };
    setState(nextState);
    cb?.(nextState);
  };

  return { state, updateState, resetState };
};

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

export const hexToRgba = (hexColor: string, alpha = 1): string => {
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// TODO: add tests
export const substractOffset = (point: Point, offset: Point): Point => {
  return [point[0] - offset[0], point[1] - offset[1]];
};

// TODO: add tests
export const rectangleToPolygon = ({
  startPoint,
  endPoint,
}: Rectangle): Polygon => {
  return [
    // top left
    startPoint,
    // top right
    [endPoint[0], startPoint[1]],
    // bottom right
    endPoint,
    // bottom left
    [startPoint[0], endPoint[1]],
  ];
};
