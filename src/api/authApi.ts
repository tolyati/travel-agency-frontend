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

  if (!res || !res.id) {
    throw new Error(res?.message || "Register failed");
  }

  return login({
    Login: data.Email,
    Password: data.Password,
  });
}

export function logout(): void {
  localStorage.removeItem("token");
}

export async function sendResetPassword(email: string) {
  const res = await fetch("https://localhost:7233/api/session/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  });

  return res.json();
}

export async function resetPassword(data: {
  email: string;
  code: string;
  newPassword: string;
}) {
  const res = await fetch("https://localhost:7233/api/session/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function confirmEmail(data: { email: string; code: string }) {
  const res = await fetch("https://localhost:7233/api/session/confirm-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}