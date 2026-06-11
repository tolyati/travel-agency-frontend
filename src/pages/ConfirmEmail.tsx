import { useState } from "react";
import { confirmEmail } from "../api/authApi";

export default function ConfirmEmail() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  async function handle() {
    await confirmEmail({ email, code });
    alert("Email подтверждён");
  }

  return (
    <div className="p-6 text-white space-y-4">
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Код" value={code} onChange={(e) => setCode(e.target.value)} />

      <button onClick={handle} className="bg-purple-600 px-4 py-2">
        Подтвердить
      </button>
    </div>
  );
}