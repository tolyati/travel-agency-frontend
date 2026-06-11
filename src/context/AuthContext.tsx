import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User, AuthResponse } from "../types";
import { logout as apiLogout } from "../api/authApi";
import { safeLower } from "../utils/safe";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  handleAuthSuccess: (res: AuthResponse) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function decodeToken(token: string): User | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const role =
      payload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] ||
      payload.role ||
      "user";

    return {
      id: Number(
        payload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ]
      ),
      username:
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
        payload.username ||
        "user",
      email:
        payload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ] ?? "",
      role: String(role).toLowerCase(),
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const t = localStorage.getItem("token");

  if (t) {
    const decoded = decodeToken(t);

    if (decoded) {
      setToken(t);
      setUser(decoded);
    } else {
      localStorage.removeItem("token");
    }
  }

  setLoading(false);
}, []);

  function handleAuthSuccess(res: AuthResponse) {
  localStorage.setItem("token", res.token);

  const decoded = decodeToken(res.token);

  setToken(res.token);
  setUser(decoded);

  window.dispatchEvent(new Event("auth-change"));
}

  function handleLogout() {
    apiLogout();
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        handleAuthSuccess,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}