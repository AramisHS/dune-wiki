import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { characters, type Character } from "@/lib/dune-data";
import { EntryModal } from "@/components/EntryModal";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/personajes")({
  head: () => ({
    meta: [
      { title: "Personajes · Arrakis Wiki" },
      { name: "description", content: "Paul Atreides, Leto, Jessica, Stilgar, el Barón Harkonnen y los grandes nombres del universo DUNE." },
      { property: "og:title", content: "Personajes · Arrakis Wiki" },
    ],
  }),
  component: Personajes,
});

function Personajes() {
  const ref = useReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<Character | null>(null);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <header className="px-6 pt-40 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow mb-4 animate-shimmer">Archivo Imperial · Vol. I</p>
          <h1 className="text-display text-shimmer text-6xl md:text-8xl">Protagonistas</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Los rostros que escriben el destino del Imperio. Toca cualquier ficha para abrir su
            expediente completo.
          </p>
        </div>
      </header>

      <section ref={ref} className="mx-auto max-w-7xl px-6 pb-32 md:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {characters.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setSelected(c)}
              className="reveal tilt-card group relative flex aspect-3/4 flex-col justify-end overflow-hidden border border-sand/10 bg-card text-left"
              data-delay={i * 90}
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-dune-black via-dune-black/40 to-transparent" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ boxShadow: "inset 0 0 80px oklch(0.65 0.22 35 / 0.5)" }} />
              <div className="relative z-10 p-6">
                <p className="eyebrow mb-2 text-spice">Casa {c.house}</p>
                <h2 className="text-display text-3xl text-sand-soft transition-transform duration-500 group-hover:-translate-y-1">
                  {c.name}
                </h2>
                <p className="mt-1 text-sm italic text-sand/70">{c.title}</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] tracking-[0.3em] text-sand/60 uppercase">
                  <span className="size-1.5 rounded-full bg-spice" />
                  Abrir expediente
                </div>
              </div>
              <span className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.3em] text-sand/60 uppercase">
                00{i + 1}
              </span>
            </button>
          ))}
        </div>

      </section>

      <EntryModal
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
        entry={
          selected
            ? {
                name: selected.name,
                subtitle: selected.title,
                image: selected.image,
                tag: `Casa ${selected.house}`,
                quote: selected.quote,
                body: selected.bio,
              }
            : null
        }
      />

      <SiteFooter />
    </div>
  );
}
