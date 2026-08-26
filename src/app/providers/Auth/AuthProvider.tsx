import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";
import { refresh } from "../../../features/auth/api/auth.api";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({
  children,
}: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await refresh();
        console.log("data>>>", data);
        setAccessToken(data.data.accessToken);
        // const res = await meApi(data.data.accessToken);
        // console.log("me>>>>>", res);
        // setUser(res.data);
        setIsAuthenticated(true);
        setUser(data.data.user); // if your refresh endpoint returns user
        setIsAuthenticated(true);
      } catch (err) {
        setAccessToken(null);
        setUser(null);
        setIsAuthenticated(false);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);
  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated,
      isLoading,
      setUser,
      setAccessToken,
      setIsAuthenticated,
    }),
    [user, accessToken, isAuthenticated, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
