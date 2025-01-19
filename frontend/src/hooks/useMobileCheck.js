import { useEffect, useState } from "react";

export const useMobileCheck = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth <= 768);
    }
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};
