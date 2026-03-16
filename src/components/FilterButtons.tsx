interface FilterButtonsProps {
  countries: string[];
  active: string | null;
  onSelect: (country: string) => void;
  likeCount: number;
}

export default function FilterButtons({ countries, active, onSelect, likeCount }: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {["Все", "Понравившиеся", ...countries].map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`px-4 py-1.5 rounded-full text-sm border transition ${
            active === c
              ? "bg-purple-500 border-purple-500 text-white"
              : "border-zinc-700 text-gray-400 hover:border-purple-400 hover:text-purple-400"
          }`}
        >
          {c === "Понравившиеся" ? `❤️ Понравившиеся ${likeCount > 0 ? `(${likeCount})` : ""}` : c}
        </button>
      ))}
    </div>
  );
}
