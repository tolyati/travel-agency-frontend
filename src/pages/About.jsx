export default function About() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center animate-fadeIn">
      <div>
        <h1 className="text-3xl text-purple-400 mb-6">О нашем проекте</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Мы создали сайт используя HTML, CSS и React + Tailwind. Наша цель — показать красоту мира.
        </p>
      </div>
      <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" className="rounded-3xl" />
    </div>
  );
}
