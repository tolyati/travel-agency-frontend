export interface FoodItem {
  id: number;
  name: string;
  country: string;
  description: string;
  img: string;
  price: number;
  likes: number;
}

export const foods: FoodItem[] = [
  {
    id: 1,
    name: "Суши",
    country: "Япония",
    description: "Традиционное японское блюдо из риса с рыбой и морепродуктами.",
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    price: 12,
    likes: 243
  },
  {
    id: 2,
    name: "Пицца Маргарита",
    country: "Италия",
    description: "Классическая итальянская пицца с томатным соусом, моцареллой и базиликом.",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    price: 10,
    likes: 189
  },
  {
    id: 3,
    name: "Тако",
    country: "Мексика",
    description: "Мексиканская лепёшка с мясом, сальсой, авокадо и кинзой.",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    price: 7,
    likes: 134
  },
  {
    id: 4,
    name: "Круассан",
    country: "Франция",
    description: "Слоёная выпечка с хрустящей корочкой — символ французского завтрака.",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
    price: 4,
    likes: 312
  },
  {
    id: 5,
    name: "Пад Тай",
    country: "Таиланд",
    description: "Жареная рисовая лапша с креветками, арахисом и соусом тамаринд.",
    img: "https://images.unsplash.com/photo-1559314809-0d155014e29e",
    price: 9,
    likes: 97
  },
  {
    id: 6,
    name: "Бургер",
    country: "США",
    description: "Сочная говяжья котлета с овощами и соусом в поджаренной булочке.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    price: 11,
    likes: 421
  },
  {
    id: 7,
    name: "Шаурма",
    country: "Турция",
    description: "Мясо на вертеле, завёрнутое в лаваш с овощами и соусом.",
    img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783",
    price: 6,
    likes: 178
  },
  {
    id: 8,
    name: "Димсам",
    country: "Китай",
    description: "Маленькие паровые пельмени с различными начинками из мяса и овощей.",
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
    price: 8,
    likes: 205
  },
  {
    id: 9,
    name: "Карри",
    country: "Индия",
    description: "Ароматное блюдо из овощей или мяса в густом пряном соусе.",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
    price: 13,
    likes: 156
  },
  {
    id: 10,
    name: "Пастель де Ната",
    country: "Португалия",
    description: "Нежный заварной тарт в слоёном тесте с корицей и сахарной пудрой.",
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
    price: 5,
    likes: 88
  },
  {
    id: 11,
    name: "Пахлава",
    country: "Турция",
    description: "восточная сладость в виде пропитанного маслом и сиропом слоёного пирога с начинкой из растёртых орехов, сахара и кардамона. .",
    img: "https://i.ytimg.com/vi/RuantDwo5Jg/maxresdefault.jpg",
    price: 6,
    likes: 100
  },
];
