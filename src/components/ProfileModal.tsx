import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { sendResetPassword } from "../api/authApi";

export default function ProfileModal({ open, onClose }: any) {
  const { user } = useAuth();
  const [sent, setSent] = useState(false);

  if (!open || !user) return null;

  const safeUser = user; // <-- фикс narrowing

  async function reset() {
    await sendResetPassword(safeUser.email);
    setSent(true);
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">

        <h2 className="text-white text-xl">Профиль</h2>

        <div className="text-gray-300 space-y-1">
          <p>
            Имя: <span className="text-white">{safeUser.username}</span>
          </p>
          <p>
            Email: <span className="text-white">{safeUser.email}</span>
          </p>
        </div>

        <button
          onClick={reset}
          className="w-full p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-purple-400"
        >
          Сбросить пароль
        </button>

        {sent && (
          <p className="text-green-400 text-sm text-center">
            Код отправлен
          </p>
        )}

        <button
          onClick={onClose}
          className="w-full p-3 rounded-xl text-gray-400 hover:text-white"
        >
          Закрыть
        </button>

      </div>
    </div>
  );
}