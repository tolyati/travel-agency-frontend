import { useState } from "react";
import { resetPassword } from "../api/authApi";

export default function ResetPassword({ email }: { email: string }) {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function handle() {
    await resetPassword({ email, code, newPassword });
    alert("Пароль обновлён");
  }

  return (
    <div className="p-6 text-white space-y-4">
      <input placeholder="Код" value={code} onChange={(e) => setCode(e.target.value)} />
      <input placeholder="Новый пароль" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

      <button onClick={handle} className="bg-purple-600 px-4 py-2">
        Обновить пароль
      </button>
    </div>
  );
}