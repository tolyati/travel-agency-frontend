interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="text-center space-y-2 mb-8">
      <h1 className="text-4xl font-bold text-purple-400">{title}</h1>
      <p className="text-gray-400 text-lg">{subtitle}</p>
    </div>
  );
}
