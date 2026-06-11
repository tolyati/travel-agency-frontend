import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <div className="text-white">Не авторизован</div>;

  return (
    <div className="p-6 text-white space-y-2">
      <h1>Личный кабинет</h1>

      <p>Имя: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>ID: {user.id}</p>
    </div>
  );
}