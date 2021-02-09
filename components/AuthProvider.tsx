import axios from "axios";
import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect, useState } from "react";

interface AuthContext {
  token: null | string;
  setToken: (token: null | string) => void;
}

const AuthCtx = createContext({} as AuthContext);

export const AuthProvider: FC = ({ children }) => {
  const router = useRouter();

  // @TODO: should store this in localStorage
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];

      // No need to be logged in unless we're in admin
      if (router.pathname.startsWith("/admin")) {
        router.push("/admin/login");
      }
    }
  }, [token]);

  return (
    <AuthCtx.Provider value={{ token, setToken }}>{children}</AuthCtx.Provider>
  );
};

export const useAuthCtx = () => useContext(AuthCtx);
