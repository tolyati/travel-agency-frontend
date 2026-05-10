import type { PageProps } from "../types";
import RegisterForm from "../components/RegisterForm";

export default function Register({ setPage }: PageProps) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white">Регистрация</h1>
          <p className="text-gray-400 text-sm">Создайте новый аккаунт</p>
        </div>
        <RegisterForm onSuccess={() => setPage("home")} onGoToLogin={() => setPage("login")} />
      </div>
    </div>
  );
}
