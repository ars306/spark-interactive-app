import { useState, useEffect } from "react";

// this hook behaves like useState but also adds feature of storing the state value to local storage
export const useLocalStorageState = (key, defaultValue) => {
  // make state based on either local storage value or default
  const [state, setState] = useState(() => {
    let val;
    try {
      val = JSON.parse(window.localStorage.getItem(key) || defaultValue);
    } catch (e) {
      return defaultValue;
    }
    return val;
  });

  // use effect to update localStorage when state changes
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

// export default useLocalStorageState;
