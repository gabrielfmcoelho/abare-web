import { useState, useEffect } from "react";

export function useCheckboxState(initialState: Record<string, boolean>) {
  const [state, setState] = useState(initialState);

  const toggleCheckbox = (key: string) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return { state, toggleCheckbox };
}
