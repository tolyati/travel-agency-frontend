import { useState } from "react";
import { register } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

export default function RegisterForm({ onSuccess }: any) {
  const { handleAuthSuccess } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [contacts, setContacts] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState(0);

  const isValid =
    username &&
    email &&
    password.length >= 8 &&
    password === confirm;

 async function submit(e: React.FormEvent) {
  e.preventDefault();

  const res = await register({
    UserName: username,
    Email: email,
    Password: password,
    Contacts: contacts,
    DOB: new Date(dob).toISOString(),
    Gender: gender,
  });

  handleAuthSuccess(res);
  onSuccess?.();
}

  return (
    <form
  onSubmit={submit}
  className="w-full max-w-md mx-auto bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4"
>

      <h2 className="text-white text-xl text-center">Регистрация</h2>

      <input className="input" placeholder="Username"
        value={username} onChange={(e) => setUsername(e.target.value)} />

      <input className="input" placeholder="Email"
        value={email} onChange={(e) => setEmail(e.target.value)} />

      <input className="input" type="password" placeholder="Password"
        value={password} onChange={(e) => setPassword(e.target.value)} />

      <input className="input" type="password" placeholder="Confirm password"
        value={confirm} onChange={(e) => setConfirm(e.target.value)} />

      <input className="input" placeholder="Contacts"
        value={contacts} onChange={(e) => setContacts(e.target.value)} />

      <input className="input" type="date"
        value={dob} onChange={(e) => setDob(e.target.value)} />

      <select
        className="input"
        value={gender}
        onChange={(e) => setGender(Number(e.target.value))}
      >
        <option value={0}>Не указывать</option>
        <option value={1}>Мужской</option>
        <option value={2}>Женский</option>
      </select>

      <button
  type="submit"
  disabled={!isValid}
  className="w-full p-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:bg-zinc-800"
>
  Зарегистрироваться
</button>
    </form>
  );
}