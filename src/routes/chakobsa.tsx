import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { chakobsa, chakobsaPhrases } from "@/lib/dune-data";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/chakobsa")({
    head: () => ({
        meta: [
            { title: "Terminología del Imperio · Arrakis Wiki" },
            { name: "description", content: "Diccionario Chakobsa-Español y traductor de la lengua secreta Fremen de Arrakis." },
            { property: "og:title", content: "Terminología del Imperio · Arrakis Wiki" },
        ],
    }),
    component: ChakobsaPage,
});

type Direction = "ch→es" | "es→ch";

function capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function translateText(
    text: string,
    direction: Direction
): Array<{ original: string; result: string; found: boolean; verified: boolean }> {
    if (!text.trim()) return [];
    const results: Array<{ original: string; result: string; found: boolean; verified: boolean }> = [];

    if (direction === "ch→es") {
        const lower = text.toLowerCase();
        const multiKeys = Object.keys(chakobsa)
            .filter((k) => k.includes(" "))
            .sort((a, b) => b.length - a.length);
        let working = text;
        for (const key of multiKeys) {
            const idx = lower.indexOf(key);
            if (idx !== -1) {
                const original = text.slice(idx, idx + key.length);
                const def = chakobsa[key];
                results.push({ original, result: capitalize(def.meaning), found: true, verified: def.verified });
                working = working.slice(0, idx) + " ".repeat(key.length) + working.slice(idx + key.length);
            }
        }
        const words = working.split(/\s+/).filter(Boolean);
        for (const word of words) {
            const clean = word.toLowerCase().replace(/[.,;:!?¿¡()"«»]/g, "");
            if (!clean) continue;
            const def = chakobsa[clean];
            if (def) {
                results.push({ original: word, result: capitalize(def.meaning), found: true, verified: def.verified });
            } else {
                results.push({ original: word, result: "Sin traducción documentada en el léxico imperial", found: false, verified: false });
            }
        }
    } else {
        // Español → Chakobsa
        const words = text.split(/\s+/).filter(Boolean);
        for (const word of words) {
            const clean = word.toLowerCase().replace(/[.,;:!?¿¡()"«»]/g, "");
            if (!clean) continue;

            // 1. Buscar si la palabra ES una clave Chakobsa directamente
            const directKey = chakobsa[clean];
            if (directKey) {
                results.push({ original: word, result: `${clean} — ${capitalize(directKey.meaning)}`, found: true, verified: directKey.verified });
                continue;
            }

            // 2. Buscar en los significados — limpiar puntuación antes de comparar
            const chakobsaKey = Object.keys(chakobsa).find((k) => {
                const parts = chakobsa[k].meaning
                    .toLowerCase()
                    .replace(/[;,·()]/g, " ")   // ← limpiar puntuación
                    .split(/\s+/)
                    .map((p) => p.trim())
                    .filter(Boolean);
                return parts.includes(clean);
            });

            if (chakobsaKey) {
                const def = chakobsa[chakobsaKey];
                results.push({ original: word, result: `${chakobsaKey} — ${capitalize(def.meaning)}`, found: true, verified: def.verified });
            } else {
                results.push({ original: word, result: "Sin equivalente Chakobsa registrado", found: false, verified: false });
            }
        }
    }
    return results;
}

function ChakobsaPage() {
    const ref = useReveal<HTMLDivElement>();
    const [direction, setDirection] = useState<Direction>("ch→es");
    const [input, setInput] = useState("Shai-Hulud habita el bled del sietch sagrado");
    const [search, setSearch] = useState("");

    const lines = useMemo(() => translateText(input, direction), [input, direction]);

    const filteredDict = useMemo(() => {
        const entries = Object.entries(chakobsa);
        if (!search.trim()) return entries;
        const s = search.toLowerCase();
        return entries.filter(([k, v]) => k.includes(s) || v.meaning.toLowerCase().includes(s));
    }, [search]);

    const handleToggle = () => {
        const next: Direction = direction === "ch→es" ? "es→ch" : "ch→es";
        setDirection(next);
        setInput(next === "ch→es" ? "Shai-Hulud habita el bled del sietch sagrado" : "guerra santa desierto profeta");
    };

    const verifiedCount = Object.values(chakobsa).filter((d) => d.verified).length;
    const approxCount = Object.values(chakobsa).filter((d) => !d.verified).length;

    return (
        <div className="min-h-screen">
            <SiteNav />

            <header className="px-6 pt-40 pb-12 md:px-10">
                <div className="mx-auto max-w-7xl">
                    <p className="eyebrow mb-4 animate-shimmer">Lengua de los Sietches · Chakobsa</p>
                    <h1 className="text-display text-shimmer text-6xl md:text-8xl">
                        Chakobsa
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                        La lengua secreta del desierto, heredada de los Zensunni errantes. Traduce entre
                        Chakobsa y Español — o consulta el léxico completo del Imperio.
                    </p>
                </div>
            </header>

            {/* TERMINAL TRADUCTOR */}
            <section ref={ref} className="mx-auto max-w-5xl px-6 py-20 md:px-10">
                <div className="reveal border border-spice/30 bg-dune-black p-6 shadow-dune md:p-10">

                    <div className="mb-6 flex items-center justify-between border-b border-sand/10 pb-4">
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-spice" />
                            <span className="size-2 rounded-full bg-sand/50" />
                            <span className="size-2 rounded-full bg-sand/30" />
                            <span className="ml-4 font-mono text-[10px] tracking-[0.3em] text-sand/50 uppercase">
                                terminal · sietch_tabr ~ oráculo lingüístico
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={handleToggle}
                            className="flex items-center gap-3 border border-sand/20 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-sand/60 uppercase transition-all hover:border-spice/50 hover:text-spice"
                        >
                            <span className={direction === "ch→es" ? "text-spice" : "text-sand/40"}>Chakobsa</span>
                            <span className="text-sand/30">{direction === "ch→es" ? "→" : "←"}</span>
                            <span className={direction === "es→ch" ? "text-spice" : "text-sand/40"}>Español</span>
                        </button>
                    </div>

                    <div className="mb-6 flex items-center gap-2">
                        <span className="font-mono text-[9px] tracking-[0.3em] text-sand/40 uppercase">Modo:</span>
                        <span className="font-mono text-[9px] tracking-[0.3em] text-spice uppercase">
                            {direction === "ch→es" ? "Chakobsa → Español" : "Español → Chakobsa"}
                        </span>
                    </div>

                    {/* Texto a descifrar */}
                    <label className="font-mono text-[10px] tracking-[0.3em] text-spice/80 uppercase">
                        ◈ Texto a descifrar
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={3}
                        className="text-display mt-2 w-full resize-none border border-sand/20 bg-dune-black/60 p-4 text-2xl text-sand-soft outline-none transition-colors focus:border-spice"
                        placeholder={
                            direction === "ch→es"
                                ? "Escribe palabras Chakobsa… ej: Shai-Hulud sietch fedaykin"
                                : "Escribe en español… ej: guerra santa profeta desierto"
                        }
                    />

                    {/* Voz del oráculo */}
                    <div className="mt-8">
                        <p className="font-mono text-[10px] tracking-[0.3em] text-spice/80 uppercase">
                            ◈ Voz del oráculo
                        </p>
                        <div className="mt-3 space-y-2">
                            {lines.length === 0 && (
                                <p className="font-mono text-sm text-sand/40">
                                    › El oráculo aguarda tus palabras_<span className="animate-blink">|</span>
                                </p>
                            )}
                            {lines.map((line, i) => (
                                <div key={i} className="reveal flex items-start gap-3" data-delay={i * 50}>
                                    <span className="mt-0.5 shrink-0 font-mono text-sm text-spice">›</span>
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                        <span className="font-mono text-sm italic text-sand/60">«{line.original}»</span>
                                        {line.found ? (
                                            <>
                                                <span className="font-mono text-sm text-sand/40">→</span>
                                                <span className="font-mono text-sm text-sand-soft">{line.result}</span>
                                                {!line.verified && (
                                                    <span className="border border-amber-600/50 bg-amber-600/10 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.2em] text-amber-500 uppercase">
                                                        ◈ Aprox.
                                                    </span>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <span className="font-mono text-sm text-sand/40">→</span>
                                                <span className="font-mono text-sm text-blood/70">{line.result}</span>
                                                <span className="border border-blood/40 bg-blood/10 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.2em] text-blood/80 uppercase">
                                                    ✕ No registrado
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Leyenda */}
                    <div className="mt-8 flex flex-wrap gap-4 border-t border-sand/10 pt-6">
                        <div className="flex items-center gap-2">
                            <span className="border border-sand/30 bg-sand/5 px-1.5 py-0.5 font-mono text-[8px] text-sand/60">Verificado</span>
                            <span className="font-mono text-[9px] text-sand/40">Fuente documental Fremen</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="border border-amber-600/50 bg-amber-600/10 px-1.5 py-0.5 font-mono text-[8px] text-amber-500">◈ Aprox.</span>
                            <span className="font-mono text-[9px] text-sand/40">Traducción aproximada</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="border border-blood/40 bg-blood/10 px-1.5 py-0.5 font-mono text-[8px] text-blood/80">✕ No registrado</span>
                            <span className="font-mono text-[9px] text-sand/40">Sin equivalente documentado</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* DICCIONARIO */}
            <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="eyebrow mb-2">Léxico esencial</p>
                        <h2 className="text-display text-4xl text-sand-soft md:text-5xl">
                            Terminología del Imperio
                        </h2>
                    </div>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar término…"
                        className="border border-sand/20 bg-dune-black px-4 py-2 font-mono text-sm text-sand-soft outline-none placeholder:text-sand/30 focus:border-spice sm:w-64"
                    />
                </div>

                <div className="grid grid-cols-1 gap-px border border-sand/10 bg-sand/10 sm:grid-cols-2 md:grid-cols-3">
                    {filteredDict.map(([word, def]) => (
                        <div key={word} className="group relative bg-dune-black p-5 transition-colors hover:bg-card">
                            <span className={`absolute top-3 right-3 font-mono text-[7px] tracking-[0.2em] uppercase ${def.verified ? "text-sand/20" : "text-amber-600/60"}`}>
                                {def.verified ? "◆" : "◈ Aprox"}
                            </span>
                            <p className="text-display pr-8 text-xl text-sand-soft capitalize">{word}</p>
                            <p className="mt-2 text-sm text-muted-foreground">{capitalize(def.meaning)}</p>
                            {def.note && (
                                <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-spice/70 uppercase">
                                    ◊ {def.note}
                                </p>
                            )}
                        </div>
                    ))}
                    {filteredDict.length === 0 && (
                        <div className="col-span-3 bg-dune-black p-10 text-center">
                            <p className="font-mono text-sm text-sand/40">
                                › Ningún término registrado en el léxico imperial para «{search}»
                            </p>
                        </div>
                    )}
                </div>

                <p className="mt-6 text-center font-mono text-[10px] tracking-[0.3em] text-sand/30 uppercase">
                    {verifiedCount} términos verificados · {approxCount} aproximados · Fuente: Dune Fandom Wiki · Frank Herbert
                </p>
            </section>

            {/* FRASES SAGRADAS */}
            <section className="bg-sand py-24 text-dune-black grain">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <p className="eyebrow mb-8 text-blood">Frases sagradas</p>
                    <div className="space-y-10">
                        {chakobsaPhrases.map((p) => (
                            <div key={p.phrase}>
                                <p className="text-display text-3xl md:text-5xl">{p.phrase}</p>
                                <p className="mt-3 text-sm tracking-[0.2em] text-dune-black/70 uppercase">
                                    {p.meaning}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <SiteFooter />
        </div>
    );
}
