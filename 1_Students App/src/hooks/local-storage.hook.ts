import { useEffect, useReducer } from "react";

const useLocalStorage = (state: any, storageKey: string) => {
  const [storedData, setStoredData] = useReducer<any>();

  useEffect(() => {
    // Read the data on the first render
    const strData = localStorage.getItem(storageKey);
    try {
      if (strData !== null) {
        setStoredData(JSON.parse(strData));
      } else {
        setStoredData(null);
      }
    } catch {
      setStoredData(strData || null);
    }
  }, []);

  useEffect(() => {
    if (typeof (state) === 'object') {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } else if (state === null) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, state.toString());
    }
  }, [state, storageKey]);

  return { storedData };
}

export default useLocalStorage;