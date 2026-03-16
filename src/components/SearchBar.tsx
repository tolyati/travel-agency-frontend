interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Поиск блюда..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
    />
  );
}
