import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import {
    chakobsa,
    chakobsaPhrases,
    chakobsaAffixes,
    chakobsaFullPhrases,
} from "@/lib/dune-data";
import { ClientOnly } from "@/components/ClientOnly";

export const Route = createFileRoute("/chakobsa")({
    head: () => ({
        meta: [
            { title: "Terminología del Imperio · Arrakis Wiki" },
            {
                name: "description",
                content:
                    "Diccionario Chakobsa-Español y traductor de la lengua secreta Fremen de Arrakis.",
            },
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

const normalize = (str: string) =>
    str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

const tokenize = (str: string) => normalize(str).split(/\s+/).filter(Boolean);

// ====== ANÁLISIS MORFOLÓGICO MEJORADO ======
function analyzeWord(
    word: string
): { root: string; meaning: string; verified: boolean } | null {
    const normalized = normalize(word);
    if (!normalized) return null;

    // 1. Búsqueda directa
    const direct = chakobsa[normalized];
    if (direct) {
        return { root: normalized, meaning: direct.meaning, verified: direct.verified };
    }

    // 2. Obtener lista de sufijos (claves que contienen el sufijo sin guión)
    const suffixKeys = Object.keys(chakobsaAffixes).filter(
        (k) => chakobsaAffixes[k].type === "suffix"
    );
    // Ordenar por longitud descendente (para que "sh" no gane a "ash")
    suffixKeys.sort((a, b) => b.replace(/^-/, "").length - a.replace(/^-/, "").length);

    for (const suffixKey of suffixKeys) {
        // Quitamos el guión si existe para comparar
        const suffix = suffixKey.replace(/^-/, "");
        if (normalized.endsWith(suffix)) {
            const possibleRoot = normalized.slice(0, -suffix.length);
            // Buscar la raíz en el diccionario principal
            const rootDef = chakobsa[possibleRoot];
            if (rootDef) {
                const affixMeaning = chakobsaAffixes[suffixKey].meaning;
                const combined = `${rootDef.meaning} (${affixMeaning})`;
                return {
                    root: possibleRoot,
                    meaning: combined,
                    verified: rootDef.verified,
                };
            }
        }
    }

    // 3. Prefijos
    const prefixKeys = Object.keys(chakobsaAffixes).filter(
        (k) => chakobsaAffixes[k].type === "prefix"
    );
    prefixKeys.sort((a, b) => b.replace(/-$/, "").length - a.replace(/-$/, "").length);

    for (const prefixKey of prefixKeys) {
        const prefix = prefixKey.replace(/-$/, "");
        if (normalized.startsWith(prefix)) {
            const possibleRoot = normalized.slice(prefix.length);
            const rootDef = chakobsa[possibleRoot];
            if (rootDef) {
                const affixMeaning = chakobsaAffixes[prefixKey].meaning;
                const combined = `${affixMeaning} + ${rootDef.meaning}`;
                return {
                    root: possibleRoot,
                    meaning: combined,
                    verified: rootDef.verified,
                };
            }
        }
    }

    return null;
}

// ====== TRADUCTOR PRINCIPAL ======
function translateText(
    text: string,
    direction: Direction
): Array<{ original: string; result: string; found: boolean; verified: boolean }> {
    if (!text || !text.trim()) return [];

    const trimmed = text.trim();
    const results: Array<{ original: string; result: string; found: boolean; verified: boolean }> = [];

    if (direction === "ch→es") {
        // 1. Frase completa en el corpus
        for (const phrase of chakobsaFullPhrases) {
            if (normalize(phrase.chakobsa) === normalize(trimmed)) {
                return [
                    {
                        original: trimmed,
                        result: phrase.spanish,
                        found: true,
                        verified: true,
                    },
                ];
            }
        }

        // 2. Tokenizar y analizar cada palabra
        const words = trimmed.split(/\s+/);
        for (const word of words) {
            const clean = normalize(word);
            if (!clean) continue;

            // Buscar directo
            const def = chakobsa[clean];
            if (def) {
                results.push({
                    original: word,
                    result: capitalize(def.meaning),
                    found: true,
                    verified: def.verified,
                });
                continue;
            }

            // Análisis morfológico
            const analyzed = analyzeWord(clean);
            if (analyzed) {
                results.push({
                    original: word,
                    result: capitalize(analyzed.meaning),
                    found: true,
                    verified: analyzed.verified,
                });
                continue;
            }

            // No encontrado
            results.push({
                original: word,
                result: "Sin traducción documentada",
                found: false,
                verified: false,
            });
        }
    } else {
        // Español → Chakobsa (similar pero inverso)
        for (const phrase of chakobsaFullPhrases) {
            if (normalize(phrase.spanish) === normalize(trimmed)) {
                return [
                    {
                        original: trimmed,
                        result: phrase.chakobsa,
                        found: true,
                        verified: true,
                    },
                ];
            }
        }

        const words = trimmed.split(/\s+/);
        for (const word of words) {
            const clean = normalize(word);
            if (!clean) continue;

            // Coincidencia directa (palabra es clave Chakobsa)
            const direct = chakobsa[clean];
            if (direct) {
                results.push({
                    original: word,
                    result: clean,
                    found: true,
                    verified: direct.verified,
                });
                continue;
            }

            // Búsqueda inversa (buscar en significados)
            let found = false;
            for (const [key, def] of Object.entries(chakobsa)) {
                if (normalize(def.meaning).includes(clean)) {
                    results.push({
                        original: word,
                        result: key,
                        found: true,
                        verified: def.verified,
                    });
                    found = true;
                    break;
                }
            }

            if (!found) {
                results.push({
                    original: word,
                    result: "Sin equivalente en Chakobsa",
                    found: false,
                    verified: false,
                });
            }
        }
    }

    return results;
}

// ====== COMPONENTE ======
function ChakobsaPage() {
    const [direction, setDirection] = useState<Direction>("ch→es");
    const [input, setInput] = useState("Dimalash ludhii e-l isnii-dh");
    const [search, setSearch] = useState("");

    const lines = useMemo(() => translateText(input, direction), [input, direction]);

    const filteredDict = useMemo(() => {
        const entries = Object.entries(chakobsa);
        if (!search.trim()) return entries;
        const s = search.toLowerCase();
        return entries.filter(
            ([k, v]) => k.includes(s) || v.meaning.toLowerCase().includes(s)
        );
    }, [search]);

    const handleToggle = () => {
        const next: Direction = direction === "ch→es" ? "es→ch" : "ch→es";
        setDirection(next);
        if (!input.trim()) {
            setInput(
                next === "ch→es"
                    ? "Dimalash ludhii e-l isnii-dh"
                    : "Aleja a los jóvenes de mí"
            );
        }
    };

    const verifiedCount = Object.values(chakobsa).filter((d) => d.verified).length;
    const approxCount = Object.values(chakobsa).filter((d) => !d.verified).length;

    return (
        <ClientOnly
            fallback={
                <div className="flex min-h-screen items-center justify-center text-sand-soft">
                    Cargando intérprete...
                </div>
            }
        >
            <div className="min-h-screen">
                <SiteNav />
                <header className="px-6 pt-40 pb-12 md:px-10">
                    <div className="mx-auto max-w-7xl">
                        <p className="eyebrow mb-4 animate-shimmer">
                            Lengua de los Sietches · Chakobsa
                        </p>
                        <h1 className="text-display text-shimmer text-6xl md:text-8xl">
                            Chakobsa
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                            La lengua secreta del desierto, heredada de los Zensunni errantes.
                            Traduce entre Chakobsa y Español — o consulta el léxico completo del
                            Imperio.
                        </p>
                    </div>
                </header>

                <section className="mx-auto max-w-5xl px-6 py-20 md:px-10">
                    <div className="border border-spice/30 bg-dune-black p-6 shadow-dune md:p-10">
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
                                <span
                                    className={
                                        direction === "ch→es" ? "text-spice" : "text-sand/40"
                                    }
                                >
                                    Chakobsa
                                </span>
                                <span className="text-sand/30">
                                    {direction === "ch→es" ? "→" : "←"}
                                </span>
                                <span
                                    className={
                                        direction === "es→ch" ? "text-spice" : "text-sand/40"
                                    }
                                >
                                    Español
                                </span>
                            </button>
                        </div>

                        <div className="mb-6 flex items-center gap-2">
                            <span className="font-mono text-[9px] tracking-[0.3em] text-sand/40 uppercase">
                                Modo:
                            </span>
                            <span className="font-mono text-[9px] tracking-[0.3em] text-spice uppercase">
                                {direction === "ch→es"
                                    ? "Chakobsa → Español"
                                    : "Español → Chakobsa"}
                            </span>
                        </div>

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
                                    ? "Escribe palabras o frases en Chakobsa…"
                                    : "Escribe en español…"
                            }
                        />

                        <div className="mt-8">
                            <p className="font-mono text-[10px] tracking-[0.3em] text-spice/80 uppercase">
                                ◈ Voz del oráculo
                            </p>
                            <div className="mt-3 space-y-2">
                                {lines.length === 0 ? (
                                    <p className="font-mono text-sm text-sand/40">
                                        › El oráculo aguarda tus palabras_
                                        <span className="animate-blink">|</span>
                                    </p>
                                ) : (
                                    lines.map((line, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <span className="mt-0.5 shrink-0 font-mono text-sm text-spice">
                                                ›
                                            </span>
                                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                                <span className="font-mono text-sm italic text-sand/60">
                                                    «{line.original}»
                                                </span>
                                                {line.found ? (
                                                    <>
                                                        <span className="font-mono text-sm text-sand/40">
                                                            →
                                                        </span>
                                                        <span className="font-mono text-sm text-sand-soft">
                                                            {line.result}
                                                        </span>
                                                        {!line.verified && (
                                                            <span className="border border-amber-600/50 bg-amber-600/10 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.2em] text-amber-500 uppercase">
                                                                ◈ Aprox.
                                                            </span>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="font-mono text-sm text-sand/40">
                                                            →
                                                        </span>
                                                        <span className="font-mono text-sm text-blood/70">
                                                            {line.result}
                                                        </span>
                                                        <span className="border border-blood/40 bg-blood/10 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.2em] text-blood/80 uppercase">
                                                            ✕ No registrado
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4 border-t border-sand/10 pt-6">
                            <div className="flex items-center gap-2">
                                <span className="border border-sand/30 bg-sand/5 px-1.5 py-0.5 font-mono text-[8px] text-sand/60">
                                    Verificado
                                </span>
                                <span className="font-mono text-[9px] text-sand/40">
                                    Fuente documental Fremen
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="border border-amber-600/50 bg-amber-600/10 px-1.5 py-0.5 font-mono text-[8px] text-amber-500">
                                    ◈ Aprox.
                                </span>
                                <span className="font-mono text-[9px] text-sand/40">
                                    Traducción aproximada
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="border border-blood/40 bg-blood/10 px-1.5 py-0.5 font-mono text-[8px] text-blood/80">
                                    ✕ No registrado
                                </span>
                                <span className="font-mono text-[9px] text-sand/40">
                                    Sin equivalente documentado
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

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
                            <div
                                key={word}
                                className="group relative bg-dune-black p-5 transition-colors hover:bg-card"
                            >
                                <span
                                    className={`absolute top-3 right-3 font-mono text-[7px] tracking-[0.2em] uppercase ${def.verified ? "text-sand/20" : "text-amber-600/60"
                                        }`}
                                >
                                    {def.verified ? "◆" : "◈ Aprox"}
                                </span>
                                <p className="text-display pr-8 text-xl text-sand-soft capitalize">
                                    {word}
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {capitalize(def.meaning)}
                                </p>
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
                        {verifiedCount} términos verificados · {approxCount} aproximados · Fuente:
                        Dune Fandom Wiki · Frank Herbert
                    </p>
                </section>

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
        </ClientOnly>
    );
}