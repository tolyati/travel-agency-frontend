

interface CounterProps {
  count: number;
  onChange: (val: number) => void;
  disabled?: boolean;
}

export default function Counter({ count, onChange, disabled }: CounterProps) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        onClick={() => onChange(Math.max(0, count - 1))}
        disabled={disabled}
        className={`w-8 h-8 rounded-full border transition ${
          disabled
            ? "border-zinc-800 text-zinc-700 cursor-not-allowed"
            : "border-zinc-700 text-gray-400 hover:border-purple-400 hover:text-purple-400"
        }`}
      >
        −
      </button>
      <span className="text-white w-4 text-center">{count}</span>
      <button
        onClick={() => onChange(count + 1)}
        disabled={disabled}
        className={`w-8 h-8 rounded-full border transition ${
          disabled
            ? "border-zinc-800 text-zinc-700 cursor-not-allowed"
            : "border-zinc-700 text-gray-400 hover:border-purple-400 hover:text-purple-400"
        }`}
      >
        +
      </button>
    </div>
  );
}
