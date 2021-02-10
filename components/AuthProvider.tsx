import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { identity } from "ramda";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { serverUrl } from "./config";

interface AuthContext {
  authState: AuthState;
  checkLoginState: VoidFunction;
}

const AuthCtx = createContext({} as AuthContext);

export const AuthProvider: FC = ({ children }) => {
  const router = useRouter();

  const [authState, setAuthState] = useState<AuthState>("StillUnknown");

  const checkLoginState = () =>
    axios
      .get(serverUrl + "/auth/check")
      .then(() => setAuthState("LoggedIn"))
      .catch(() => setAuthState("NotLoggedIn"));

  const goToLogin = () => router.push("/admin/login");

  useEffect(() => {
    const unauthorizedInterceptor = axios.interceptors.response.use(
      identity,
      (error: AxiosError) => {
        if (
          error.response?.status === 401 && // not logged in
          router.pathname.startsWith("/admin") // and it needs to be
        ) {
          setAuthState("NotLoggedIn");
          return Promise.reject(error);
        }
      }
    );
    return () => axios.interceptors.request.eject(unauthorizedInterceptor);
  }, []);

  useEffect(() => {
    checkLoginState();
  }, []);

  useEffect(() => {
    if (router.pathname.startsWith("/admin") && authState === "NotLoggedIn") {
      goToLogin();
    }
  }, [authState]);

  return (
    <AuthCtx.Provider value={{ authState, checkLoginState }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuthCtx = () => useContext(AuthCtx);
