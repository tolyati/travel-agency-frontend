export interface Item {
  id: number;
  name: string;
  category: string;
  country: string;
  description: string;
  img: string;
  price: number;
  likes: number;
}

export const foods: Item[] = [
  {
    id: 1,
    name: "Суши",
    category: "food",
    country: "Япония",
    description: "Традиционное японское блюдо из риса с рыбой и морепродуктами.",
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    price: 12,
    likes: 243,
  },
  {
    id: 2,
    name: "Пицца Маргарита",
    category: "food",
    country: "Италия",
    description: "Классическая итальянская пицца с томатным соусом, моцареллой и базиликом.",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    price: 10,
    likes: 189,
  },
  {
    id: 3,
    name: "Тако",
    category: "food",
    country: "Мексика",
    description: "Мексиканская лепёшка с мясом, сальсой, авокадо и кинзой.",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    price: 7,
    likes: 134,
  },
  {
    id: 4,
    name: "Круассан",
    category: "food",
    country: "Франция",
    description: "Слоёная выпечка с хрустящей корочкой — символ французского завтрака.",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
    price: 4,
    likes: 312,
  },
  {
    id: 5,
    name: "Пад Тай",
    category: "food",
    country: "Таиланд",
    description: "Жареная рисовая лапша с креветками, арахисом и соусом тамаринд.",
    img: "https://images.unsplash.com/photo-1559314809-0d155014e29e",
    price: 9,
    likes: 97,
  },
  {
    id: 6,
    name: "Бургер",
    category: "food",
    country: "США",
    description: "Сочная говяжья котлета с овощами и соусом в поджаренной булочке.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    price: 11,
    likes: 421,
  },
  {
    id: 7,
    name: "Шаурма",
    category: "food",
    country: "Турция",
    description: "Мясо на вертеле, завёрнутое в лаваш с овощами и соусом.",
    img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783",
    price: 6,
    likes: 178,
  },
  {
    id: 8,
    name: "Димсам",
    category: "food",
    country: "Китай",
    description: "Маленькие паровые пельмени с различными начинками из мяса и овощей.",
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
    price: 8,
    likes: 205,
  },
  {
    id: 9,
    name: "Карри",
    category: "food",
    country: "Индия",
    description: "Ароматное блюдо из овощей или мяса в густом пряном соусе.",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
    price: 13,
    likes: 156,
  },
  {
    id: 10,
    name: "Пастель де Ната",
    category: "food",
    country: "Португалия",
    description: "Нежный заварной тарт в слоёном тесте с корицей и сахарной пудрой.",
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
    price: 5,
    likes: 88,
  },
  {
    id: 11,
    name: "Пахлава",
    category: "food",
    country: "Турция",
    description: "Восточная сладость в виде пропитанного маслом и сиропом слоёного пирога с начинкой из растёртых орехов, сахара и кардамона.",
    img: "https://i.ytimg.com/vi/RuantDwo5Jg/maxresdefault.jpg",
    price: 6,
    likes: 100,
  },
];
 export const tours: Item[] = [
  {
    id: 12,
    name: "Магия древнего Киото",
    category: "tour",
    country: "Япония",
    description: "Бамбуковый лес Арасияма и золотой павильон Кинкаку-дзи в сердце японских традиций.",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    price: 2500,
    likes: 450
  },
  {
    id: 13,
    name: "Итальянское Возрождение",
    category: "tour",
    country: "Италия",
    description: "Завораживающая Флоренция и прогулки на гондолах по каналам Венеции.",
    img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
    price: 1800,
    likes: 520
  },
  {
    id: 14,
    name: "Райский Канкун",
    category: "tour",
    country: "Мексика",
    description: "Бирюзовые лагуны и величественные пирамиды Майя в древнем городе Чичен-Ица.",
    img: "https://cdn.coral.ru/content/img/mexico/cancun.jpg",
    price: 1600,
    likes: 340
  },
  {
    id: 15,
    name: "Огни Парижа",
    category: "tour",
    country: "Франция",
    description: "Закат Эйфелевой башни и ужин в уютном ресторанчике на Монмартре.",
    img: "https://i.artfile.ru/1920x1080_1665652_[www.ArtFile.ru].jpg",
    price: 2100,
    likes: 610
  },
  {
    id: 16,
    name: "Тайский залив",
    category: "tour",
    country: "Таиланд",
    description: "Белоснежные пляжи Пхукета и незабываемые закаты на скалах Краби.",
    img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
    price: 1200,
    likes: 890
  },
  {
    id: 17,
    name: "Величие Аризоны",
    category: "tour",
    country: "США",
    description: "Масштабный Гранд-Каньон и мистическая красота Долины Монументов.",
    img: "https://guide.planetofhotels.com/sites/default/files/styles/paragraph__hero_banner__hb_image__1880bp/public/hero_banner/grand-canyon-2.jpg",
    price: 3000,
    likes: 270
  },
  {
    id: 18,
    name: "Рассвет в Каппадокии",
    category: "tour",
    country: "Турция",
    description: "Сотни воздушных шаров над «долиной любви» в лучах утреннего солнца.",
    img: "https://cdn.tripster.ru/thumbs2/d9dcf54e-7b51-11eb-8080-f62f63504e19.800x600.jpg",
    price: 1400,
    likes: 1200
  },
  {
    id: 19,
    name: "Императорский Пекин",
    category: "tour",
    country: "Китай",
    description: "Тайны Запретного города и поход по самым живописным участкам Великой стены.",
    img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
    price: 2300,
    likes: 310
  },
  {
    id: 20,
    name: "Розовый город Джайпур",
    category: "tour",
    country: "Индия",
    description: "Дворцы махараджей и легендарный Тадж-Махал в лучах заката.",
    img: "https://t3.ftcdn.net/jpg/03/32/21/74/360_F_332217448_5NO38ZfGes9M0O24v42BX2JOYDwnqgRm.jpg",
    price: 1100,
    likes: 415
  },
  {
    id: 21,
    name: "Дыхание Атлантики",
    category: "tour",
    country: "Португалия",
    description: "Грот Бенагил и самые высокие волны Европы в живописном Назаре.",
    img: "https://media.istockphoto.com/id/1404726011/photo/albandeira-arch-at-praia-de-albandeiras-beautiful-rocky-coast-and-beach-on-the-famous-algarve.jpg?s=612x612&w=0&k=20&c=iy28mUYZA-7_08YxEBB9SrxLDRm4jZcASl-JVO7WIEg=",
    price: 1700,
    likes: 560
  }
];
