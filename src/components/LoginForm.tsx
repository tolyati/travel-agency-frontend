import { useState } from "react";
import { login } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

interface LoginFormProps {
  onSuccess: () => void;
  onGoToRegister?: () => void;
}

export default function LoginForm({ onSuccess, onGoToRegister }: LoginFormProps) {
  const { handleAuthSuccess } = useAuth();
  const [loginVal, setLoginVal] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isValid = loginVal.trim().length > 0 && password.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login({ Login: loginVal.trim(), Password: password });
      handleAuthSuccess(res);
      onSuccess();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка входа");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Имя пользователя или email"
        value={loginVal}
        onChange={(e) => setLoginVal(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
      />

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <button
        type="submit"
        disabled={!isValid || loading}
        className={`w-full py-3 rounded-xl font-semibold transition ${
          isValid && !loading
            ? "bg-purple-600 hover:bg-purple-500 text-white"
            : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
        }`}
      >
        {loading ? "Вход..." : "Войти"}
      </button>

      {onGoToRegister && (
        <p className="text-center text-gray-400 text-sm">
          Нет аккаунта?{" "}
          <button type="button" onClick={onGoToRegister} className="text-purple-400 hover:text-purple-300 transition">
            Зарегистрироваться
          </button>
        </p>
      )}
    </form>
  );
}
