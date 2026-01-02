interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header className="text-center mb-12 z-99 relative">
      <h1 className="mb-4 text-[clamp(2rem,5vw,3rem)] font-bold">
        {title}
      </h1>
      <p className="text-[rgba(255,255,255,0.8)] text-[clamp(1rem,3vw,1.2rem)] max-w-3xl m-auto font-medium">
        {subtitle}
      </p>
    </header>
  );
};
