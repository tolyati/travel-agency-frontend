interface ErrorProps {
  message: string;
}

export default function ErrorState({ message }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
      <span className="text-5xl">⚠️</span>
      <p className="text-red-400 text-xl font-semibold">Ошибка сети</p>
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}
