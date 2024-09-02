import { useEffect, useState, useRef } from "react";
import { Alert } from "react-native";

const useAppwrite = <T>(fn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasAlerted = useRef(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null); // Reset error on new fetch

    try {
      const response = await fn();
      setData(response);
      hasAlerted.current = false; // Reset the alert flag after a successful fetch
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);

      // Only show the alert once per error
      if (!hasAlerted.current) {
        Alert.alert("Error", errorMessage);
        hasAlerted.current = true; // Mark as alerted
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fn]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, refetch, error };
};

export default useAppwrite;
