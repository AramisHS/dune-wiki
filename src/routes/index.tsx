import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { characters, houses, places, creatures } from "@/lib/dune-data";
import heroDunes from "@/assets/hero-dunes.jpg";
import spice from "@/assets/spice.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arrakis · Wiki visual de DUNE" },
      {
        name: "description",
        content:
          "Una wiki visual e inmersiva del universo DUNE. Personajes, casas, planetas y la especia melange.",
      },
      { property: "og:title", content: "Arrakis · Wiki visual de DUNE" },
      { property: "og:image", content: heroDunes },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* HERO */}
      <section className="relative flex h-screen min-h-190 flex-col items-center justify-center overflow-hidden text-center">
        <div className="absolute inset-0">
          <img
            src={heroDunes}
            alt="Dunas infinitas de Arrakis bajo dos soles"
            width={1920}
            height={1080}
            className="h-full w-full animate-slow-zoom object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-b from-dune-black/60 via-transparent to-dune-black" />
        </div>

        <div className="relative z-10 animate-drift px-6">
          <p className="eyebrow mb-6 animate-shimmer">Año 10191 · Era Imperial</p>
          <h1 className="text-display text-7xl leading-[0.85] text-sand-soft md:text-[10rem] lg:text-[14rem]">
            DUNE
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm uppercase tracking-[0.3em] text-sand/80 md:text-base">
            El archivo definitivo del planeta desierto
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-sand/30" />
            <span className="eyebrow text-spice">Bi-la kaifa</span>
            <div className="h-px w-16 bg-sand/30" />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="h-12 w-px bg-linear-to-b from-sand/60 to-transparent" />
        </div>
      </section>

      {/* INTRO QUOTE */}
      <section className="px-6 py-32 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-display text-3xl leading-relaxed text-pretty text-sand-soft md:text-5xl">
            “Un mundo está sostenido por cuatro cosas: el saber del sabio, la justicia del grande,
            las plegarias del justo y el valor del valiente.”
          </p>
          <p className="eyebrow mt-8">— Princesa Irulan · Manual de Muad'Dib</p>
        </div>
      </section>

      {/* IMPERIO GRID */}
      <section className="mx-auto max-w-7xl px-6 pb-32 md:px-10">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-3">El Imperio</p>
            <h2 className="text-display text-5xl text-sand-soft md:text-6xl">Vastos poderes</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px border border-sand/10 bg-sand/10 md:grid-cols-3">
          {[
            { title: "Casa Atreides", sub: "Los Señores de Caladan", img: characters[0].image, to: "/casas" as const },
            { title: "Shai-Hulud", sub: "Ecología del desierto", img: creatures[0].image, to: "/especia" as const },
            { title: "Los Fremen", sub: "Habitantes del Sietch", img: houses[2].image, to: "/personajes" as const },
          ].map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="group relative flex aspect-4/5 flex-col justify-end overflow-hidden bg-dune-black p-8"
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-dune-black via-dune-black/40 to-transparent" />
              <div className="relative z-10">
                <p className="eyebrow mb-3 text-spice">{c.sub}</p>
                <h3 className="text-display mb-6 text-3xl text-sand-soft">{c.title}</h3>
                <div className="flex size-8 items-center justify-center rounded-full border border-sand/40 transition-transform group-hover:scale-110">
                  <span className="text-sand">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SPICE HIGHLIGHT */}
      <section className="bg-sand text-dune-black grain">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-32 md:flex-row md:px-10">
          <div className="w-full md:w-1/2">
            <img
              src={spice}
              alt="Partículas de especia melange"
              loading="lazy"
              width={1200}
              height={1200}
              className="aspect-square w-full object-cover shadow-dune"
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="eyebrow mb-4 text-blood">El recurso sagrado</p>
            <h2 className="text-display mb-8 text-5xl leading-[1.05] md:text-6xl">
              Quien controla la especia, controla el universo.
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-dune-black/80">
              El melange es una sustancia geriátrica que prolonga la vida, expande la consciencia y
              permite a los Navegantes de la Cofradía plegar el espacio. Solo se encuentra en
              Arrakis, brotando del ciclo vital del gusano.
            </p>
            <Link
              to="/especia"
              className="inline-block border border-dune-black px-10 py-4 font-mono text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:bg-dune-black hover:text-sand active:scale-95"
            >
              Extraer datos
            </Link>
          </div>
        </div>
      </section>

      {/* HOUSES PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">
        <p className="eyebrow mb-3">Las Grandes Casas</p>
        <h2 className="text-display mb-16 text-5xl text-sand-soft md:text-6xl">Linajes del Landsraad</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {houses.map((h) => (
            <Link
              key={h.slug}
              to="/casas"
              hash={h.slug}
              className="group flex gap-6 border border-sand/10 p-6 transition-all hover:border-spice/50 hover:bg-sand/3"
            >
              <div className="relative size-28 shrink-0 overflow-hidden">
                <img src={h.image} alt={h.name} loading="lazy" className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0" />
              </div>
              <div>
                <p className="eyebrow mb-2" style={{ color: h.color }}>{h.sigil}</p>
                <h3 className="text-display mb-2 text-2xl text-sand-soft">{h.name}</h3>
                <p className="text-sm text-muted-foreground">{h.motto} · {h.seat}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PLACES STRIP */}
      <section className="border-y border-sand/10 bg-card/40 py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="eyebrow mb-3">Cartografía Estelar</p>
          <h2 className="text-display mb-16 text-5xl text-sand-soft md:text-6xl">Mundos conocidos</h2>
          <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
            {places.map((p) => (
              <Link
                key={p.slug}
                to="/lugares"
                hash={p.slug}
                className="group relative aspect-3/4 overflow-hidden"
              >
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-dune-black via-dune-black/30 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-8">
                  <p className="eyebrow mb-2 text-spice">{p.coords}</p>
                  <h3 className="text-display text-4xl text-sand-soft">{p.name}</h3>
                  <p className="mt-2 text-sm text-sand/70 italic">{p.nickname}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
