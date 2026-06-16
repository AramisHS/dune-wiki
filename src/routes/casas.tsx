import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { houses } from "@/lib/dune-data";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/casas")({
  head: () => ({
    meta: [
      { title: "Casas · Arrakis Wiki" },
      { name: "description", content: "Atreides, Harkonnen, Fremen, Bene Gesserit, Cofradía Espacial y Landsraad: las facciones que disputan el Imperio." },
      { property: "og:title", content: "Casas · Arrakis Wiki" },
    ],
  }),
  component: Casas,
});

function Sigil({ color, sigil }: { color: string; sigil: string }) {
  return (
    <div
      className="relative grid size-32 shrink-0 place-items-center rounded-full border-2 glow-pulse"
      style={{ borderColor: color }}
    >
      <div
        className="absolute inset-2 rounded-full border opacity-60"
        style={{ borderColor: color }}
      />
      <div
        className="absolute inset-5 rounded-full border opacity-30"
        style={{ borderColor: color }}
      />
      <span
        className="text-display relative z-10 px-2 text-center text-[9px] leading-tight tracking-[0.2em] uppercase"
        style={{ color }}
      >
        {sigil}
      </span>
    </div>
  );
}

function Casas() {
  const [activeSlug, setActiveSlug] = useState(houses[0].slug);
  const active = houses.find((h) => h.slug === activeSlug)!;

  return (
    <div className="min-h-screen">
      <SiteNav />
      <header className="px-6 pt-40 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow mb-4 animate-shimmer">Landsraad · Salón Heráldico</p>
          <h1 className="text-display text-shimmer text-6xl md:text-8xl">Las Grandes Casas</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Linajes que se reparten el universo como naipes sobre una mesa de oro. Selecciona un
            estandarte para abrir su expediente.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-32 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Lista heráldica */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-2">
              {houses.map((h, i) => {
                const isActive = h.slug === activeSlug;
                return (
                  <button
                    key={h.slug}
                    type="button"
                    onClick={() => setActiveSlug(h.slug)}
                    className={`is-visible group flex w-full items-center gap-4 border px-4 py-3 text-left transition-all ${
                      isActive
                        ? "border-spice/70 bg-spice/5"
                        : "border-sand/10 hover:border-sand/30 hover:bg-sand/3"
                    }`}
                    data-delay={i * 70}
                  >
                    <span
                      className="size-3 shrink-0 rounded-full transition-transform group-hover:scale-125"
                      style={{
                        backgroundColor: h.color,
                        boxShadow: `0 0 16px ${h.color}`,
                      }}
                    />
                    <div className="flex-1">
                      <p
                        className="font-mono text-[9px] tracking-[0.3em] uppercase"
                        style={{ color: h.color }}
                      >
                        {h.sigil}
                      </p>
                      <p className="text-display mt-0.5 text-lg text-sand-soft">{h.name}</p>
                    </div>
                    <span
                      className={`font-mono text-[9px] transition-opacity ${
                        isActive ? "text-spice opacity-100" : "opacity-0"
                      }`}
                    >
                      ◊
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Detalle */}
          <div className="lg:col-span-8">
            <article
              key={active.slug}
              className="animate-drift relative overflow-hidden border border-sand/10 bg-card"
            >
              <div className="relative h-64 overflow-hidden md:h-80">
                <img
                  src={active.image}
                  alt={active.name}
                  className="h-full w-full animate-slow-zoom object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dune-black via-dune-black/40 to-transparent" />
                <div className="absolute right-8 bottom-8 hidden md:block">
                  <Sigil color={active.color} sigil={active.sigil} />
                </div>
              </div>

              <div className="p-8 md:p-12">
                <p className="eyebrow mb-3" style={{ color: active.color }}>
                  {active.seat}
                </p>
                <h2 className="text-display mb-4 text-5xl text-sand-soft md:text-6xl">
                  {active.name}
                </h2>
                <p
                  className="text-display mb-8 text-xl italic"
                  style={{ color: active.color }}
                >
                  “{active.motto}”
                </p>
                <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
                  {active.description}
                </p>

                <dl className="grid grid-cols-1 gap-px border border-sand/10 bg-sand/10 md:grid-cols-3">
                  {[
                    { label: "Sede", value: active.seat },
                    { label: "Sigilo", value: active.sigil },
                    { label: "Ejército", value: active.military ?? "—" },
                    { label: "Aliados", value: active.allies?.join(" · ") ?? "—" },
                    { label: "Enemigos", value: active.enemies?.join(" · ") ?? "—" },
                    { label: "Lema", value: active.motto },
                  ].map((m) => (
                    <div key={m.label} className="bg-dune-black p-5">
                      <dt className="font-mono text-[9px] tracking-[0.3em] text-sand/50 uppercase">
                        {m.label}
                      </dt>
                      <dd className="mt-2 text-sm text-sand-soft">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
