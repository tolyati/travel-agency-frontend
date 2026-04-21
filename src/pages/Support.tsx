import { useState, useEffect } from "react";
import type { PageProps } from "../types";
import Header from "../components/Header";
import Loading from "../components/Loading";

const NAME_MAX = 50;
const EMAIL_MAX = 80;
const SUBJECT_MAX = 100;
const MESSAGE_MAX = 500;

const contacts = [
  {
    icon: "📞",
    label: "Телефон",
    value: "8 (800) 555-35-35",
    sub: "Бесплатно, ежедневно 8:00–22:00",
    href: "tel:88005553535",
  },
  {
    icon: "✉️",
    label: "Электронная почта",
    value: "support@aesthetic.travel",
    sub: "Ответим в течение 24 часов",
    href: "mailto:support@aesthetic.travel",
  },
  {
    icon: "💬",
    label: "Онлайн-чат",
    value: "Начать чат",
    sub: "Среднее время ответа — 5 минут",
    href: "#",
  },
];

export default function Support(_: PageProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    isEmailValid &&
    subject.trim().length > 0 &&
    message.trim().length > 0;

  if (loading) return <Loading />;

  return (
    <div className="space-y-10 animate-fadeIn">
      <Header title="Поддержка" subtitle="Мы всегда готовы помочь — выберите удобный способ связи" />

      <div className="grid md:grid-cols-3 gap-4">
        {contacts.map(({ icon, label, value, sub, href }) => (
          <a
            key={label}
            href={href}
            className="flex flex-col items-center text-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500 transition-all hover:-translate-y-1"
          >
            <span className="text-4xl">{icon}</span>
            <span className="text-xs text-purple-400 uppercase tracking-widest">{label}</span>
            <span className="text-white font-semibold">{value}</span>
            <span className="text-gray-500 text-xs">{sub}</span>
          </a>
        ))}
      </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-5">
        <h2 className="text-white text-xl font-semibold">Написать нам</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Ваше имя"
              maxLength={NAME_MAX}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
            />
            <p className="text-xs text-right text-gray-500">{name.length}/{NAME_MAX}</p>
          </div>
          <div className="space-y-1">
            <input
              type="email"
              placeholder="Электронная почта"
              maxLength={EMAIL_MAX}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
            />
            <p className="text-xs text-right text-gray-500">{email.length}/{EMAIL_MAX}</p>
            {email.length > 0 && !isEmailValid && (
              <p className="text-xs text-red-400">Введите корректный email</p>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <input
            type="text"
            placeholder="Тема обращения"
            maxLength={SUBJECT_MAX}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
          />
          <p className="text-xs text-right text-gray-500">{subject.length}/{SUBJECT_MAX}</p>
        </div>
        <div className="space-y-1">
          <textarea
            rows={4}
            placeholder="Опишите ваш вопрос..."
            maxLength={MESSAGE_MAX}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition resize-none"
          />
          <p className={`text-xs text-right transition ${
            message.length >= MESSAGE_MAX ? "text-red-400" : "text-gray-500"
          }`}>{message.length}/{MESSAGE_MAX}</p>
        </div>
        <button
          disabled={!isValid}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            isValid
              ? "bg-purple-600 hover:bg-purple-500 text-white"
              : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
          }`}
        >
          Отправить сообщение
        </button>
      </div>
    </div>
  );
}
