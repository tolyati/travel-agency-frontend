import { useState } from "react";
import { sendResetPassword } from "../api/authApi";

export default function ForgotPassword({ onNext }: any) {
  const [email, setEmail] = useState("");

  async function handle() {
    await sendResetPassword(email);
    onNext(email);
  }

  return (
    <div className="p-6 text-white space-y-4">
      <h2>Восстановление пароля</h2>

      <input
        className="w-full p-2 bg-zinc-800"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handle} className="bg-purple-600 px-4 py-2">
        Отправить код
      </button>
    </div>
  );
}