import { createContext, useState, useEffect, type ReactNode } from "react";
import { logout as apiLogout } from "../api/authApi";
import type { User, AuthResponse } from "../types";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  handleAuthSuccess: (res: AuthResponse) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  loading: true,
  handleAuthSuccess: () => {},
  handleLogout: () => {},
});

function decodeToken(token: string): User | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      id: Number(payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]),
      username: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ?? "",
      role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? "user",
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(() => {
    const t = localStorage.getItem("token");
    return t ? decodeToken(t) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) { setUser(null); return; }
    const decoded = decodeToken(token);
    if (!decoded) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } else {
      setUser(decoded);
    }
  }, [token]);

  function handleAuthSuccess(res: AuthResponse) {
    localStorage.setItem("token", res.token);
    setToken(res.token);
    setUser(decodeToken(res.token));
  }

  function handleLogout() {
    apiLogout();
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, handleAuthSuccess, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
