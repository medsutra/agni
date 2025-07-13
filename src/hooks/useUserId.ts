import { useEffect, useState } from "react";

export const useUserId = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const userIdFromLocalStorage = localStorage.getItem("userId");
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage);
    } else {
      const newUserId = `${Math.ceil(Math.random() * 1000000000)}-${Math.ceil(
        Math.random() * 1000000000
      )}-${Math.ceil(Math.random() * 1000000000)}`.replaceAll(".", "");
      setUserId(newUserId);
      localStorage.setItem("userId", newUserId);
    }
    setIsLoading(false);
  });

  return {
    userId,
    isLoading,
  };
};
