import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { codex, type CodexEntry, type CodexCategory } from "@/lib/dune-data";
import { EntryModal } from "@/components/EntryModal";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/codice")({
    head: () => ({
        meta: [
            { title: "Códice · Arrakis Wiki" },
            { name: "description", content: "Tecnología, disciplinas Bene Gesserit, instituciones del Imperio y criaturas de Arrakis." },
            { property: "og:title", content: "Códice · Arrakis Wiki" },
        ],
    }),
    component: Codice,
});

function Codice() {
    const [tab, setTab] = useState<CodexCategory["id"]>(codex[0].id);
    const [selected, setSelected] = useState<CodexEntry | null>(null);
const ref = useReveal<HTMLDivElement>(tab);

    const active = codex.find((c) => c.id === tab)!;

    return (
        <div className="min-h-screen">
            <SiteNav />

            <header className="px-6 pt-40 pb-16 md:px-10">
                <div className="mx-auto max-w-7xl">
                    <p className="eyebrow mb-4 animate-shimmer">Compendio · Volumen II</p>
                    <h1 className="text-display text-shimmer text-6xl md:text-8xl">El Códice</h1>
                    <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                        Tecnología, disciplinas, instituciones y criaturas. Cada entrada es un expediente
                        independiente.
                    </p>
                </div>
            </header>

            {/* TABS */}
            <div className="sticky top-16 z-30 border-y border-sand/10 bg-dune-black/85 backdrop-blur">
                <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 py-3 md:px-10">
                    {codex.map((cat) => {
                        const isActive = cat.id === tab;
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setTab(cat.id)}
                                className={`shrink-0 border px-4 py-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-all ${isActive
                                        ? "border-spice bg-spice/10 text-spice"
                                        : "border-sand/10 text-sand/60 hover:border-sand/30 hover:text-sand"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <section ref={ref} key={active.id} className="mx-auto max-w-7xl px-6 py-16 md:px-10">
                <p className="text-display reveal mb-12 max-w-2xl text-2xl text-sand-soft italic md:text-3xl">
                    {active.blurb}
                </p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {active.entries.map((e, i) => (
                        <button
                            key={e.slug}
                            type="button"
                            onClick={() => setSelected(e)}
                            className="reveal-zoom tilt-card group relative flex aspect-4/5 flex-col justify-end overflow-hidden border border-sand/10 bg-card text-left"
                            data-delay={i * 80}
                        >
                            <img
                                src={e.image}
                                alt={e.name}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-dune-black via-dune-black/30 to-transparent" />
                            <span className="absolute top-3 left-3 border border-spice/70 bg-dune-black/70 px-2.5 py-1 font-mono text-[8px] tracking-[0.3em] text-spice uppercase backdrop-blur">
                                {e.tag}
                            </span>
                            <div className="relative z-10 p-5">
                                <p className="eyebrow mb-1 text-spice">{e.subtitle}</p>
                                <h3 className="text-display text-2xl text-sand-soft">{e.name}</h3>
                                <p className="mt-2 line-clamp-2 text-xs text-sand/70">{e.short}</p>
                            </div>
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
                            subtitle: selected.subtitle,
                            image: selected.image,
                            tag: selected.tag,
                            body: selected.body,
                        }
                        : null
                }
            />

            <SiteFooter />
        </div>
    );
}
