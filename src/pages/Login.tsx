import type { PageProps } from "../types";
import LoginForm from "../components/LoginForm";

export default function Login({ setPage }: PageProps) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white">Вход</h1>
          <p className="text-gray-400 text-sm">Войдите в свой аккаунт</p>
        </div>
        <LoginForm onSuccess={() => setPage("home")} onGoToRegister={() => setPage("register")} />
      </div>
    </div>
  );
}
