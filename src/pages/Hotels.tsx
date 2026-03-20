import type { PageProps } from "../types";

export default function Hotels(_: PageProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl text-purple-400">Бутик-Отели</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <img src="https://images.unsplash.com/photo-1551882547-ff43c63efe81" className="rounded-2xl" />
        <img src="https://t4.ftcdn.net/jpg/09/12/90/33/360_F_912903382_mq5bts1Xw74KGFzHrvKWbjHAzA3XbGl5.jpg" className="rounded-2xl" />
      </div>
      <p className="text-gray-300">Мы выбираем отели как искусство.</p>
    </div>
  );
}
