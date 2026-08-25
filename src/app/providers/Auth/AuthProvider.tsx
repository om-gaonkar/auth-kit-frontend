import { useEffect, useMemo, useState, type ReactNode } from "react";
// import { CheckAuth } from "../api/CheckAuth";
import { AuthContext, type User } from "./AuthContext";

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
        // const data = await CheckAuth();

        // setAccessToken(data.accessToken);
        // setUser(data.user); // if your refresh endpoint returns user
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
