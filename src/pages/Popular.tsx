interface PopularProps {
  setPage: (p: string) => void;
}

export default function Popular(_: PopularProps) {
  return (
    <ul className="text-xl text-gray-300 space-y-3 animate-fadeIn">
      <li>1. Исландия</li>
      <li>2. Япония</li>
      <li>3. Норвегия</li>
    </ul>
  );
}
