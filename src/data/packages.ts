export interface Package {
  id: number;
  name: string;
  tier: "econom" | "standard" | "pro" | "premium";
  price: number;
  duration: string;
  img: string;
  description: string;
  includes: string[];
}

export const packages: Package[] = [
  {
    id: 1,
    name: "Эконом",
    tier: "econom",
    price: 499,
    duration: "7 дней",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
    description: "Бюджетный вариант для тех, кто хочет увидеть мир без лишних трат.",
    includes: [
      "Перелёт эконом-классом",
      "Проживание в хостеле (2-местный номер)",
      "Завтрак включён",
      "Трансфер из аэропорта",
      "Карта города",
    ],
  },
  {
    id: 2,
    name: "Стандарт",
    tier: "standard",
    price: 999,
    duration: "7 дней",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Оптимальный баланс цены и комфорта для приятного отдыха.",
    includes: [
      "Перелёт эконом-классом",
      "Проживание в 3★ отеле",
      "Завтрак и ужин включены",
      "Трансфер из/в аэропорт",
      "Обзорная экскурсия",
      "Страховка",
    ],
  },
  {
    id: 3,
    name: "Про",
    tier: "pro",
    price: 1799,
    duration: "10 дней",
    img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9",
    description: "Расширенный пакет с питанием, экскурсиями и SPA-процедурами.",
    includes: [
      "Перелёт бизнес-классом",
      "Проживание в 4★ отеле",
      "Завтрак, обед и ужин включены",
      "Трансфер VIP",
      "3 экскурсии на выбор",
      "1 SPA-процедура",
      "Страховка расширенная",
      "Персональный гид",
    ],
  },
  {
    id: 4,
    name: "Премиум",
    tier: "premium",
    price: 3499,
    duration: "14 дней",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description: "Всё включено — роскошный отдых без единой заботы.",
    includes: [
      "Перелёт первым классом",
      "Проживание в 5★ отеле (люкс)",
      "Питание всё включено + рестораны",
      "Лимузин-трансфер",
      "Неограниченные экскурсии",
      "Ежедневные SPA-процедуры",
      "Персональный консьерж 24/7",
      "Страховка премиум",
      "Подарочный набор",
    ],
  },
];
