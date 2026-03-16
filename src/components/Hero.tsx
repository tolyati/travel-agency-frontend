export default function Hero() {
  return (
    <div className="relative rounded-3xl overflow-hidden mb-10 h-64">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-8 left-10">
        <h2 className="text-3xl font-bold text-white">Путешествуй через вкус</h2>
        <p className="text-gray-300 mt-1">10 блюд из самых популярных стран мира</p>
      </div>
    </div>
  );
}
