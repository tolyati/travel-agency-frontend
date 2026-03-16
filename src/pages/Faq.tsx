import type { PageProps } from "../types";

interface FaqItem {
  q: string;
  a: string;
}

const items: FaqItem[] = [
  { q: "Что такое HTML?", a: "HTML — основа создания веб сайтов." },
  { q: "Что такое CSS?", a: "Язык стилизации веб страниц." }
];

export default function Faq(_: PageProps) {
  return (
    <div className="space-y-4 animate-fadeIn">
      {items.map((item, i) => (
        <details key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 cursor-pointer">
          <summary className="text-white font-medium">{item.q}</summary>
          <p className="text-gray-400 mt-3">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
