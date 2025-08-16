"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "@/types/auth/user";
import { toast } from "sonner";

interface AuthContextType {
  // User state
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isLoading: boolean;

  // Authentication methods
  login: (userData: User, tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;

  // Token management
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Derived states
  const isLoggedIn = !!user && !!accessToken;
  const isAdmin = user?.role === "ADMIN";

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (storedUser && storedAccessToken && storedRefreshToken) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
          setAccessToken(storedAccessToken);
          setRefreshToken(storedRefreshToken);

          // Set cookies for middleware (in case they're missing)
          document.cookie = `accessToken=${storedAccessToken}; path=/; max-age=${15 * 60}`; // 15 minutes
          document.cookie = `refreshToken=${storedRefreshToken}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
          document.cookie = `userRole=${parsedUser.role}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
        }
      } catch (error) {
        console.error("Error initializing auth state:", error);
        // Clear potentially corrupted data
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // Clear cookies
        document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = (userData: User, tokens: { accessToken: string; refreshToken: string }) => {
    try {
      setUser(userData);
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);

      // Persist to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);

      // Set cookies for middleware
      document.cookie = `accessToken=${tokens.accessToken}; path=/; max-age=${15 * 60}`; // 15 minutes
      document.cookie = `refreshToken=${tokens.refreshToken}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
      document.cookie = `userRole=${userData.role}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days

      toast.success(`Welcome back, ${userData.name}!`);
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Failed to save login data");
    }
  };

  // Logout function
  const logout = () => {
    try {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Clear cookies
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Update user function
  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    try {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user data");
    }
  };

  // Set tokens function (for token refresh)
  const setTokens = (tokens: { accessToken: string; refreshToken: string }) => {
    try {
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
    } catch (error) {
      console.error("Error setting tokens:", error);
    }
  };

  const contextValue: AuthContextType = {
    // User state
    user,
    isLoggedIn,
    isAdmin,
    isLoading,

    // Authentication methods
    login,
    logout,
    updateUser,

    // Token management
    accessToken,
    refreshToken,
    setTokens,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
