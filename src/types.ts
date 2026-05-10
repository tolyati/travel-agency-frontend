export type Role = "guest" | "user" | "admin";

export type Page = "home" | "about" | "travel" | "packages" | "relax" | "hotels" | "sights" | "partners" | "faq" | "support" | "login" | "register" | "unauthorized";

export interface PageProps {
  setPage: (p: Page) => void;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterResponse {
  id: number;
  message: string;
}

export interface LoginRequest {
  Login: string;
  Password: string;
}

export interface RegisterRequest {
  UserName: string;
  Email: string;
  Password: string;
  Contacts: string;
  DOB: string;
  Gender: number;
}
