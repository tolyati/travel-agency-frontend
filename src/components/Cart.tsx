import { useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";

export interface CartItem {
  id: number;
  name: string;
  img: string;
  price: number;
  count: number;
}

interface CartProps {
  items: CartItem[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onGoToLogin?: () => void;
}

export default function Cart({ items, open, onOpen, onClose, onGoToLogin }: CartProps) {
  const { user } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      modalRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [open]);

  const total = items.reduce((sum, i) => sum + i.price * i.count, 0).toFixed(2);

  function handleCheckout() {
    if (!user) {
      onClose();
      onGoToLogin?.();
      return;
    }
    // logged in — backend call goes here
  }

  return (
    <>
      {items.length > 0 && (
        <div className="sticky bottom-0 left-0 right-0 z-40 p-4 bg-zinc-950/90 backdrop-blur border-t border-zinc-800">
          <button
            onClick={onOpen}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            🛒 Корзина
            <span className="bg-white text-purple-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {items.length}
            </span>
          </button>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div ref={modalRef} className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">🛒 Корзина</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition text-xl">×</button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.img} className="w-12 h-12 object-contain bg-white rounded-xl p-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{item.name}</p>
                    <p className="text-gray-400 text-xs">{item.count} шт. × ${item.price}</p>
                  </div>
                  <span className="text-purple-400 font-semibold shrink-0">
                    ${(item.price * item.count).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800 pt-4 flex items-center justify-between">
              <span className="text-gray-400">Итого:</span>
              <span className="text-purple-400 font-bold text-xl">${total}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold transition"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </>
  );
}
