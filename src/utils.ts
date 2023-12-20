import React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Simple alias
 */
export const cn = twMerge;

export const useRichState = <T extends object>(initialState: T) => {
  const [state, setState] = React.useState<T>(initialState);

  const updateState = (newState: Partial<T>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const resetState = (newState: Partial<T>) =>
    setState({ ...initialState, ...newState });

  return { state, updateState, resetState };
};
