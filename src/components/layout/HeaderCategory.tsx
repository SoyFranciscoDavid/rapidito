interface HeaderCategoryProps {
  name?: string;
}

export default function HeaderCategory({ name }: HeaderCategoryProps) {
  return (
    <header className="h-75 bg-foreground flex items-center justify-center relative overflow-hidden pt-20">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-[radial-gradient(circle,var(--color-secondary)_0%,transparent_100%)] rounded-full blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_100%)] rounded-full blur-[100px] opacity-30 pointer-events-none" />

      {name ? (
        <div className="relative z-10 text-center">
          <h1 className="font-display text-5xl md:text-6xl text-white font-bold capitalize">
            {name}
          </h1>
          <p className="text-secondary text-sm md:text-base mt-4">
            Explora nuestra variedad de {name.toLowerCase()}
          </p>
        </div>
      ) : null}
    </header>
  );
}
