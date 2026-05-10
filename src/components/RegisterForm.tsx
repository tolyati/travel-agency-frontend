import { useState } from "react";
import { register } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

interface RegisterFormProps {
  onSuccess: () => void;
  onGoToLogin?: () => void;
}

export default function RegisterForm({ onSuccess, onGoToLogin }: RegisterFormProps) {
  const { handleAuthSuccess } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [contacts, setContacts] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordsMatch = password === confirm;
  const isValid = username.trim().length > 0 && isEmailValid && password.length >= 8 && passwordsMatch && contacts.trim().length > 0 && dob.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await register({ UserName: username, Email: email, Password: password, Contacts: contacts, DOB: dob, Gender: gender });
      handleAuthSuccess(res);
      onSuccess();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
      />

      <div className="space-y-1">
        <input
          type="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
        />
        {email.length > 0 && !isEmailValid && (
          <p className="text-xs text-red-400">Введите корректный email</p>
        )}
      </div>

      <div className="space-y-1">
        <input
          type="password"
          placeholder="Пароль (минимум 8 символов)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
        />
        {password.length > 0 && password.length < 8 && (
          <p className="text-xs text-red-400">Пароль должен быть не менее 8 символов</p>
        )}
      </div>

      <div className="space-y-1">
        <input
          type="password"
          placeholder="Подтвердите пароль"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
        />
        {confirm.length > 0 && !passwordsMatch && (
          <p className="text-xs text-red-400">Пароли не совпадают</p>
        )}
      </div>

      <input
        type="text"
        placeholder="Контакты (телефон или адрес)"
        value={contacts}
        onChange={(e) => setContacts(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
      />

      <div className="space-y-1">
        <label className="text-gray-400 text-xs">Дата рождения</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
        />
      </div>

      <select
        value={gender}
        onChange={(e) => setGender(Number(e.target.value))}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
      >
        <option value={0}>Не указывать</option>
        <option value={1}>Мужской</option>
        <option value={2}>Женский</option>
        <option value={3}>Другое</option>
      </select>

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
        {loading ? "Регистрация..." : "Зарегистрироваться"}
      </button>

      {onGoToLogin && (
        <p className="text-center text-gray-400 text-sm">
          Уже есть аккаунт?{" "}
          <button type="button" onClick={onGoToLogin} className="text-purple-400 hover:text-purple-300 transition">
            Войти
          </button>
        </p>
      )}
    </form>
  );
}
