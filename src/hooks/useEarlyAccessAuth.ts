import { useState, useEffect } from "react";
import { BASE_URL } from "@/utils/const";

export const useEarlyAccessAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(BASE_URL);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("earlyAccessAuth");
      setIsAuthenticated(!!auth);
      setLoading(false);
    };

    checkAuth();

    // Listen for storage changes (in case user logs out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = () => {
    localStorage.setItem("earlyAccessAuth", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("earlyAccessAuth");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, login, logout };
};

export default useEarlyAccessAuth;