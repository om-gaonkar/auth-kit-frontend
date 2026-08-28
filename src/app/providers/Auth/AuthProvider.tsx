import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AuthContext, type User } from "./AuthContext";

import {
  logoutCurrentuserApi,
  refresh,
} from "../../../features/auth/api/auth.api";

import { tokenManager } from "../../../lib/auth/tokenManager";

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

  const refreshAccessToken = useCallback(async () => {
    try {
      const data = await refresh();

      const newAccessToken = data.data.accessToken;

      tokenManager.setToken(newAccessToken);

      setAccessToken(newAccessToken);

      setIsAuthenticated(true);

      if (data.data.user) {
        setUser(data.data.user);
      }

      return newAccessToken;
    } catch (error) {
      tokenManager.setToken(null);
      console.error(error);
      setAccessToken(null);
      setUser(null);
      setIsAuthenticated(false);

      return null;
    }
  }, []);

  // Keep tokenManager synchronized with React state
  useEffect(() => {
    tokenManager.setToken(accessToken);
  }, [accessToken]);

  // Initialize authentication
  useEffect(() => {
    tokenManager.setRefreshHandler(refreshAccessToken);

    const initAuth = async () => {
      await refreshAccessToken();

      setIsLoading(false);
    };

    initAuth();
  }, [refreshAccessToken]);

  const logout = useCallback(async () => {
    try {
      await logoutCurrentuserApi();
    } finally {
      // Clear token immediately
      tokenManager.setToken(null);

      setUser(null);
      setAccessToken(null);
      setIsAuthenticated(false);
    }
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
      logout,
    }),
    [user, accessToken, isAuthenticated, isLoading, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
