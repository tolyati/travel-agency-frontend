import { useState } from "react";
import { login, sendResetPassword } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm({ onSuccess }: any) {
  const { handleAuthSuccess } = useAuth();

  const [loginVal, setLoginVal] = useState("");
  const [password, setPassword] = useState("");

  const [forgotOpen, setForgotOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
  e.preventDefault();

  try {
    const res = await login({
      Login: loginVal,
      Password: password,
    });

    handleAuthSuccess(res);
    onSuccess?.();
  } catch (err) {
    console.error("LOGIN ERROR:", err);
  }
}

  async function sendCode() {
    await sendResetPassword(email);
    setSent(true);
  }

  return (
    <form
  onSubmit={submit}
  className="w-full max-w-md mx-auto bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4"
>

      <h2 className="text-white text-xl text-center">Вход</h2>

      <input
        placeholder="Login or Email"
        value={loginVal}
        onChange={(e) => setLoginVal(e.target.value)}
        className="w-full p-3 rounded-xl bg-zinc-800 text-white"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 rounded-xl bg-zinc-800 text-white"
      />

      <button
  type="submit"
  className="w-full bg-purple-600 hover:bg-purple-500 p-3 rounded-xl text-white"
>
  Войти
</button>

      <button
        type="button"
        onClick={() => setForgotOpen(!forgotOpen)}
        className="text-gray-400 text-sm w-full text-center"
      >
        Забыли пароль?
      </button>

      {forgotOpen && (
        <div className="space-y-3 pt-2">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-zinc-800 text-white"
          />

          <button
            type="button"
            onClick={sendCode}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-purple-400 p-3 rounded-xl"
          >
            Отправить код
          </button>

          {sent && (
            <p className="text-green-400 text-sm text-center">
              Код отправлен
            </p>
          )}
        </div>
      )}
    </form>
  );
}