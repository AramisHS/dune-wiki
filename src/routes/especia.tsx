import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { creatures } from "@/lib/dune-data";
import spice from "@/assets/spice.jpg";

export const Route = createFileRoute("/especia")({
  head: () => ({
    meta: [
      { title: "La Especia · Arrakis Wiki" },
      { name: "description", content: "El melange y Shai-Hulud: la sustancia y la criatura que sostienen el Imperio." },
      { property: "og:title", content: "La Especia · Arrakis Wiki" },
      { property: "og:image", content: spice },
    ],
  }),
  component: Especia,
});

function Especia() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* MONUMENTAL HERO */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 pt-32 pb-20">
        <img
          src={spice}
          alt=""
          className="absolute inset-0 h-full w-full animate-slow-zoom object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-linear-to-b from-dune-black/70 via-transparent to-dune-black" />
        <div className="relative z-10 text-center">
          <p className="eyebrow mb-8 animate-shimmer">La Sustancia Sagrada</p>
          <h1 className="text-display text-[20vw] leading-none text-sand-soft md:text-[14rem]">
            MELANGE
          </h1>
          <p className="text-display mx-auto mt-8 max-w-2xl text-xl italic text-sand/80 md:text-3xl">
            “La especia fluye. Con ella nacen imperios, se doblan las estrellas y se escriben profecías.”
          </p>
        </div>
      </section>

      {/* DATA SHEET */}
      <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">
        <div className="grid grid-cols-1 gap-px border border-sand/10 bg-sand/10 md:grid-cols-3">
          {[
            { label: "Origen", value: "Ciclo vital del gusano de arena" },
            { label: "Hábitat", value: "Solo Arrakis" },
            { label: "Color del aliento", value: "Canela · Quemado · Azul" },
            { label: "Efectos", value: "Geriátrico · Presciente" },
            { label: "Usuarios", value: "Navegantes · Bene Gesserit · Mentats" },
            { label: "Precio", value: "620.000 solaris / decagramo" },
          ].map((f) => (
            <div key={f.label} className="bg-dune-black p-10">
              <p className="eyebrow mb-4 text-spice">{f.label}</p>
              <p className="text-display text-2xl text-sand-soft">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CREATURES */}
      <section className="mx-auto max-w-7xl px-6 pb-32 md:px-10">
        <p className="eyebrow mb-3">Bestiario</p>
        <h2 className="text-display mb-16 text-5xl text-sand-soft md:text-6xl">El Hacedor</h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {creatures.map((c) => (
            <article key={c.slug} className="group">
              <div className="relative mb-6 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dune-black to-transparent" />
              </div>
              <h3 className="text-display mb-2 text-4xl text-sand-soft">{c.name}</h3>
              <p className="eyebrow mb-4 text-spice">{c.aka}</p>
              <p className="leading-relaxed text-muted-foreground">{c.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PROPHECY */}
      <section className="bg-sand py-32 text-dune-black grain">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow mb-8 text-blood">Profecía Fremen</p>
          <p className="text-display text-3xl leading-[1.2] text-pretty md:text-5xl">
            Cuando llegue el Lisan al-Gaib, el desierto florecerá. Y los gusanos danzarán al ritmo
            de los pasos del Mahdi.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
