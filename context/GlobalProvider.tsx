import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  type Dispatch,
} from "react";
import { getCurrentUser } from "../lib/appwrite";

// Define the types for the context
interface GlobalContextType {
  isLoggedIn: boolean;
  user: any;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<any>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider = ({ children }: React.PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        isLoading,
        setIsLoading,
        setIsLoggedIn,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
