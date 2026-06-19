import { characters, houses, places, codex, autores, chakobsaLanguage, duneTerminology, } from "@/data";

let activePersonaje: any = null;
let lastFactIndex: { [slug: string]: number } = {};

export function getActivePersonaje() {
    return activePersonaje;
}

export function setActivePersonaje(personaje: any) {
    activePersonaje = personaje;
}

export function getNextFact(personaje: any): string | null {
    if (!personaje || !personaje.facts || personaje.facts.length === 0) return null;
    const slug = personaje.slug || personaje.name;
    if (!lastFactIndex[slug]) lastFactIndex[slug] = 0;
    const index = lastFactIndex[slug];
    const fact = personaje.facts[index];
    lastFactIndex[slug] = (index + 1) % personaje.facts.length;
    return fact;
}

const normalize = (str: string) =>
    str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

function matches(query: string, text: string): boolean {
    const q = normalize(query);
    const t = normalize(text);
    if (!q || !t) return false;
    return t.includes(q) || q.includes(t);
}

function extractAllText(obj: any): string[] {
    const values: string[] = [];
    if (!obj) return values;
    if (typeof obj === "string") {
        values.push(obj);
        return values;
    }
    if (Array.isArray(obj)) {
        for (const item of obj) {
            values.push(...extractAllText(item));
        }
        return values;
    }
    if (typeof obj === "object") {
        for (const key of Object.keys(obj)) {
            values.push(...extractAllText(obj[key]));
        }
        return values;
    }
    return values;
}

const OPEN_QUESTION_KEYWORDS = ["opinas", "opinión",
    "piensas", "crees", "explica", "explícame",
    "por qué", "cómo", "qué significa",
    "que significa", "describe", "analiza",
    "comparar", "diferencia", "parece", "sientes",
    "imagina", "que opinas", "cuál es tu", "que tal",
];

const CONCRETE_QUESTION_KEYWORDS = [
    "dato", "curioso", "curiosidad", "sabías", "sabes",
    "anecdota", "frase", "cita", "dijo", "declaró", "expresó",
    "hijo", "hijos", "descendencia", "heredero", "personalidad",
    "carácter", "temperamento", "como es", "rasgos", "habilidad",
    "habilidades", "poder", "poderes", "capacidad", "destreza",
    "relación", "relaciones", "amigo", "amigos", "enemigo",
    "enemigos", "aliado", "aliados", "vínculo", "línea",
    "tiempo", "cronología", "historia", "sucesos", "eventos",
];

export function isOpenQuestion(query: string): boolean {
    const q = normalize(query);
    for (const kw of OPEN_QUESTION_KEYWORDS) {
        if (q.includes(kw)) return true;
    }
    for (const kw of CONCRETE_QUESTION_KEYWORDS) {
        if (q.includes(kw)) return false;
    }
    return false;
}

function detectIntent(query: string): {
    type:
    | "facts"
    | "quote"
    | "children"
    | "personality"
    | "abilities"
    | "relationships"
    | "timeline"
    | "unknown";
    confidence: number;
} {
    const q = normalize(query);

    const patterns = {
        facts: [
            "dato",
            "curioso",
            "curiosidad",
            "curiosos",
            "sabías",
            "sabes",
            "anecdota",
            "curio",
        ],
        quote: [
            "frase",
            "cita",
            "dijo",
            "decir",
            "palabras",
            "mencionó",
            "declaró",
            "expresó",
        ],
        children: [
            "hijo",
            "hijos",
            "descendencia",
            "heredero",
            "herederos",
            "descendientes",
        ],
        personality: [
            "personalidad",
            "carácter",
            "temperamento",
            "como es",
            "rasgos",
            "forma de ser",
        ],
        abilities: [
            "habilidad",
            "habilidades",
            "poder",
            "poderes",
            "capacidad",
            "capacidades",
            "destreza",
            "entrenamiento",
            "conocimientos",
        ],
        relationships: [
            "relación",
            "relaciones",
            "amigo",
            "amigos",
            "enemigo",
            "enemigos",
            "aliado",
            "aliados",
            "vínculo",
            "vínculos",
        ],
        timeline: [
            "línea",
            "tiempo",
            "cronología",
            "historia",
            "sucesos",
            "eventos",
            "cronologico",
        ],
    };

    let bestMatch = { type: "unknown" as const, confidence: 0 };
    for (const [type, keywords] of Object.entries(patterns)) {
        const count = keywords.filter((kw) => q.includes(kw)).length;
        if (count > bestMatch.confidence) {
            bestMatch = { type: type as any, confidence: count };
        }
    }
    return bestMatch;
}

function isEntityMatch(entity: any, query: string): boolean {
    const q = normalize(query);
    if (!q) return false;
    const allTexts = extractAllText(entity);
    return allTexts.some((text) => matches(q, text));
}

function buildResponse(entity: any, intent: { type: string; confidence: number }, query: string): string {
    const name = entity.name || entity.fullName || "esta entidad";
    setActivePersonaje(entity);

    const q = normalize(query);
    const isNextRequest = q.includes("otro") || q.includes("siguiente") || q.includes("más");

    switch (intent.type) {
        case "facts": {
            if (isNextRequest) {
                const nextFact = getNextFact(entity);
                if (nextFact) {
                    return `Dato curioso sobre ${name}: ${nextFact}`;
                }
                const slug = entity.slug || entity.name;
                lastFactIndex[slug] = 0;
                return `Dato curioso sobre ${name}: ${entity.facts[0]}`;
            }
            const slug = entity.slug || entity.name;
            lastFactIndex[slug] = 1;
            return `Dato curioso sobre ${name}: ${entity.facts[0]}`;
        }
        case "quote": {
            if (entity.quote) return `Una frase célebre de ${name}: "${entity.quote}"`;
            return `No tengo ninguna frase célebre de ${name}.`;
        }
        case "children": {
            const children = entity.children || [];
            if (children.length === 0) return `${name} no tiene hijos conocidos.`;
            return `Los hijos de ${name} son: ${children.join(", ")}.`;
        }
        case "personality": {
            const personality = entity.personality || [];
            if (personality.length === 0) return `No tengo información sobre la personalidad de ${name}.`;
            return `La personalidad de ${name} se describe como: ${personality.join(", ")}.`;
        }
        case "abilities": {
            const abilities = entity.abilities || [];
            if (abilities.length === 0) return `No tengo información sobre las habilidades de ${name}.`;
            return `${name} posee habilidades como: ${abilities.join(", ")}.`;
        }
        case "relationships": {
            const rels = entity.importantRelationships || {};
            const relNames = Object.keys(rels);
            if (relNames.length === 0) return `No tengo información sobre las relaciones de ${name}.`;
            return `${name} tiene relaciones importantes con: ${relNames.join(", ")}.`;
        }
        case "timeline": {
            const timeline = entity.timeline || [];
            if (timeline.length === 0) return `No tengo información sobre la línea de tiempo de ${name}.`;
            return `Línea de tiempo de ${name}: ${timeline[0]} → ${timeline[timeline.length - 1]}.`;
        }
        default: {
            const topics = [];
            if (entity.facts?.length) topics.push("datos curiosos");
            if (entity.personality?.length) topics.push("su personalidad");
            if (entity.abilities?.length) topics.push("sus habilidades");
            if (entity.children?.length) topics.push("sus hijos");
            if (entity.importantRelationships) topics.push("sus relaciones");
            if (entity.timeline?.length) topics.push("su línea de tiempo");
            if (entity.quote) topics.push("alguna frase célebre");
            const selected = topics.slice(0, 3);
            let response = `Ah, ${name}. ¿Qué te gustaría saber de él/ella? `;
            if (selected.length > 0) {
                response += `Puedo contarte sobre ${selected.join(", ")}.`;
            } else {
                response += `Puedo contarte todo lo que sé.`;
            }
            return response;
        }
    }
}

export function searchLocalKnowledge(query: string): {
    type: "local" | "groq";
    response?: string;
    personaje?: any;
} {
    if (!query || !query.trim()) return { type: "groq" };

    const q = normalize(query);

    const isNextRequest = q.includes("otro") || q.includes("siguiente") || q.includes("más");
    if (isNextRequest && activePersonaje) {
        let targetPersonaje = activePersonaje;
        for (const c of characters) {
            if (isEntityMatch(c, query)) {
                targetPersonaje = c;
                break;
            }
        }
        const intent = detectIntent(query);
        const finalIntent = (intent.confidence > 0) ? intent : { type: "facts" as const, confidence: 1 };
        return {
            type: "local",
            response: buildResponse(targetPersonaje, finalIntent, query),
            personaje: targetPersonaje,
        };
    }

    if (isOpenQuestion(query)) {
        return { type: "groq" };
    }

    for (const h of houses) {
        if (
            matches(query, h.name) ||
            matches(query, h.symbol || "") ||
            matches(query, h.motto || "") ||
            matches(query, h.chatbotContext || "")
        ) {
            return {
                type: "local",
                response: `${h.name} — ${h.motto || "Sin lema"}. Sede: ${h.homeworld || "Desconocida"}. ${h.chatbotContext || "Casa noble del Imperio."}`,
            };
        }
    }

    for (const p of places) {
        const aliasStr = p.aliases?.join(", ") || "";
        if (
            matches(query, p.name) ||
            matches(query, aliasStr) ||
            matches(query, p.type || "") ||
            matches(query, p.chatbotContext || "")
        ) {
            return {
                type: "local",
                response: `${p.name} (${aliasStr || p.type || "Planeta"}): ${p.chatbotContext || "Planeta del Imperio."}`,
            };
        }
    }

    for (const a of autores) {
        if (isEntityMatch(a, query)) {
            const intent = detectIntent(query);
            const finalIntent = (intent.confidence > 0) ? intent : { type: "unknown" as const, confidence: 0 };
            return {
                type: "local",
                response: buildResponse(a, finalIntent, query),
                personaje: a,
            };
        }
    }

    for (const c of characters) {
        if (isEntityMatch(c, query)) {
            const intent = detectIntent(query);
            const finalIntent = (intent.confidence > 0) ? intent : { type: "unknown" as const, confidence: 0 };
            return {
                type: "local",
                response: buildResponse(c, finalIntent, query),
                personaje: c,
            };
        }
    }

    for (const cat of codex) {
        for (const e of cat.entries) {
            const entryName = e.name || e.slug || "";
            const entryCategory = e.category || "";
            const entryDesc = e.description || e.chatbotContext || "";
            if (
                matches(query, entryName) ||
                matches(query, entryCategory) ||
                matches(query, entryDesc)
            ) {
                return {
                    type: "local",
                    response: `${entryName} — ${entryCategory || "Entrada del código"}\n${entryDesc}`,
                };
            }
        }
    }

    for (const [word, def] of Object.entries(chakobsaLanguage)) {
        if (matches(query, word) || matches(query, def.meaning)) {
            return { type: "local", response: `${word}: ${def.meaning}` };
        }
    }
    for (const [term, def] of Object.entries(duneTerminology)) {
        if (matches(query, term) || matches(query, def.meaning)) {
            return { type: "local", response: `${term}: ${def.meaning}` };
        }
    }

    return { type: "groq" };
}