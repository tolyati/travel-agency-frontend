const BASE_URL = "https://localhost:7233/api";

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  // сначала читаем тело
  const text = await res.text();

  // 401 обрабатываем ДО throw
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(text || `Ошибка ${res.status}`);
  }

  // если пустой ответ
  if (!text) return {} as T;

  return JSON.parse(text) as T;
}