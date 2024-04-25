import { useEffect, useState } from "react";

interface DebounceOptions {
  value: any;
  delay: number;
}

const useDebounce = ({ value, delay }: DebounceOptions) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounce;
};

export default useDebounce;