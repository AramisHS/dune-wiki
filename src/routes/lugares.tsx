import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { places } from "@/lib/dune-data";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/lugares")({
  head: () => ({
    meta: [
      { title: "Lugares · Arrakis Wiki" },
      { name: "description", content: "Arrakis, Caladan y Giedi Prime: los mundos que orbitan el destino del Imperio." },
      { property: "og:title", content: "Lugares · Arrakis Wiki" },
    ],
  }),
  component: Lugares,
});

function Starfield() {
  // Decorative star pattern + planet pulses
  const stars = Array.from({ length: 60 }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 73.3) % 100,
    s: ((i * 17) % 3) + 1,
  }));
  return (
    <div className="absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-sand-soft opacity-30"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.s}px`,
            height: `${s.s}px`,
            animation: `pulse-dot ${2 + (i % 4)}s ease-in-out ${i * 0.1}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Lugares() {
  const ref = useReveal<HTMLDivElement>();

  const scrollTo = (slug: string) => {
    const el = document.getElementById(slug);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* HERO MAPA ESTELAR */}
      <header className="relative overflow-hidden px-6 pt-32 pb-12 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow mb-4 animate-shimmer">Cartografía Imperial</p>
          <h1 className="text-display text-shimmer text-6xl md:text-8xl">Mundos Conocidos</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Toca un planeta del mapa estelar para descender a su expediente cartográfico.
          </p>

          <div className="relative mt-12 aspect-video w-full overflow-hidden rounded border border-sand/10 bg-linear-to-br from-dune-black via-card to-dune-black">
            <Starfield />
            {/* Connecting lines */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {places.map((p, i) =>
                places.slice(i + 1).map((q) => (
                  <line
                    key={`${p.slug}-${q.slug}`}
                    x1={p.starX}
                    y1={p.starY}
                    x2={q.starX}
                    y2={q.starY}
                    stroke="oklch(0.65 0.22 35 / 0.25)"
                    strokeWidth="0.15"
                    strokeDasharray="0.6 0.6"
                  />
                )),
              )}
            </svg>
            {/* Planet markers */}
            {places.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => scrollTo(p.slug)}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.starX}%`, top: `${p.starY}%` }}
              >
                <span className="absolute inset-0 -m-3 animate-pulse-dot rounded-full bg-spice/30 blur-md" />
                <span className="relative block size-4 rounded-full bg-spice ring-2 ring-sand-soft transition-transform group-hover:scale-150" />
                <span className="text-display absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-sand-soft opacity-70 transition-opacity group-hover:opacity-100">
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* EXPEDIENTES */}
      <section ref={ref} className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="flex flex-col gap-16">
          {places.map((p, i) => (
            <article
              key={p.slug}
              id={p.slug}
              className="reveal scroll-mt-32"
              data-delay={i * 100}
            >
              <div className="grid grid-cols-1 overflow-hidden border border-sand/10 lg:grid-cols-12">
                <div className="relative overflow-hidden lg:col-span-7 lg:h-130">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[3s] hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-dune-black/70" />
                  <div className="absolute top-6 left-6 border border-spice bg-dune-black/60 px-3 py-1 font-mono text-[9px] tracking-[0.3em] text-spice uppercase backdrop-blur">
                    Expediente {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="flex flex-col justify-center bg-card p-8 lg:col-span-5 lg:p-12">
                  <p className="eyebrow mb-3 text-spice">{p.coords}</p>
                  <h2 className="text-display mb-2 text-5xl text-sand-soft">{p.name}</h2>
                  <p className="text-display mb-8 text-lg italic text-sand/70">{p.nickname}</p>
                  <p className="mb-8 leading-relaxed text-muted-foreground">{p.description}</p>
                  <dl className="space-y-3 border-t border-sand/10 pt-5">
                    {[
                      { label: "Clima", value: p.climate },
                      { label: "Fauna", value: p.fauna },
                      { label: "Status Imperial", value: p.imperial },
                    ].map((m) => (
                      <div key={m.label} className="flex justify-between gap-4">
                        <dt className="font-mono text-[9px] tracking-[0.3em] text-sand/50 uppercase">
                          {m.label}
                        </dt>
                        <dd className="text-right text-sm text-sand-soft">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
