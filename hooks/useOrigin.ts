import { useEffect, useState } from "react";

const useOrigin = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  return !mounted ? "" : origin;
};

export default useOrigin;
