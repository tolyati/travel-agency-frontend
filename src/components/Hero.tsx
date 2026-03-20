interface HeroProps {
  image: string;
  title: string;
  subtitle: string;
}

export default function Hero({ image, title, subtitle }: HeroProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden mb-10 h-64">
      <img
        src={image}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-8 left-10">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="text-gray-300 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
