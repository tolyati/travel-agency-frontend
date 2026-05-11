import { apiRequest } from "./client";
import type { AuthResponse, LoginRequest, RegisterRequest, RegisterResponse } from "../types";

export function login(data: LoginRequest): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/session/auth", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const res = await apiRequest<RegisterResponse>("/reg", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.id) throw new Error(res.message);

  // Auto-login after successful registration to get the token
  return login({ Login: data.Email, Password: data.Password });
}

export function logout(): void {
  localStorage.removeItem("token");
}
