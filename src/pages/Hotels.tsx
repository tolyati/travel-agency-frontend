interface HotelsProps {
  setPage: (p: string) => void;
}

export default function Hotels(_: HotelsProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl text-purple-400">Бутик-Отели</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <img src="https://images.unsplash.com/photo-1551882547-ff43c63efe81" className="rounded-2xl" />
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945" className="rounded-2xl" />
      </div>
      <p className="text-gray-300">Мы выбираем отели как искусство.</p>
    </div>
  );
}
