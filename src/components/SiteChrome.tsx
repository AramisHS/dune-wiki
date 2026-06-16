import { Link } from "@tanstack/react-router";

const items = [
  { to: "/", label: "Inicio" },
  { to: "/personajes", label: "Personajes" },
  { to: "/casas", label: "Casas" },
  { to: "/lugares", label: "Lugares" },
  { to: "/codice", label: "Códice" },
  { to: "/especia", label: "Especia" },
  { to: "/chakobsa", label: "Chakobsa" },
] as const;

export function SiteNav() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-linear-to-b from-dune-black via-dune-black/85 to-transparent backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="text-display text-xl tracking-[0.3em] text-sand uppercase">
          DUNE
        </Link>
        <div className="hidden flex-wrap gap-x-7 gap-y-2 md:flex">
          {items.slice(1).map((i) => (
            <Link
              key={i.to}
              to={i.to}
              className="eyebrow transition-colors hover:text-dune-gold"
              activeProps={{ className: "eyebrow text-spice" }}
            >
              {i.label}
            </Link>
          ))}
        </div>
        <div className="flex size-9 items-center justify-center rounded-full border border-sand/30">
          <div className="size-1.5 animate-shimmer rounded-full bg-spice" />
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-sand/10 px-6 py-16 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 md:flex-row md:items-center">
        <div>
          <div className="text-display mb-3 text-2xl tracking-[0.3em] text-sand uppercase">
            Arrakis Wiki
          </div>
          <p className="eyebrow max-w-xs text-muted-foreground normal-case">
            Dedicado a la preservación del conocimiento imperial. El miedo es el asesino de la mente.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-16 gap-y-3 md:grid-cols-3">
          {items.map((i) => (
            <Link key={i.to} to={i.to} className="eyebrow hover:text-spice">
              {i.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl items-center justify-between border-t border-sand/5 pt-6">
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-sand/40">
          © 10191 AG · Archivos Imperiales
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-sand/40">
          Compilado en Caladan
        </span>
      </div>
    </footer>
  );
}
