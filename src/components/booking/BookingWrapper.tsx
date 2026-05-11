import type { Item } from "../../data/products";

interface BookingWrapperProps {
  item: Item;
  title: string;
  submitted: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BookingWrapper({ item, title, submitted, onClose, children }: BookingWrapperProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition text-xl">×</button>
        </div>

        <div className="bg-zinc-800 rounded-xl p-3 flex items-center gap-3">
          <img src={item.img} className="w-12 h-12 object-cover rounded-lg" />
          <div>
            <p className="text-white text-sm font-medium">{item.name}</p>
            <p className="text-purple-400 text-xs">${item.price}</p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center space-y-2 py-4">
            <span className="text-4xl">✅</span>
            <p className="text-white font-semibold">Бронирование подтверждено!</p>
            <p className="text-gray-400 text-sm">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        ) : children}
      </div>
    </div>
  );
}
