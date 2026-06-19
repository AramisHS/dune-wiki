import { useState, useRef, useEffect } from "react";
import { X, ArrowUp } from "lucide-react";
import { searchLocalKnowledge, isOpenQuestion } from "@/lib/mentat-knowledge";
import { askGroq } from "@/lib/groq-client";

type Message = {
    role: "assistant" | "user";
    content: string;
};

interface MentatPanelProps {
    onClose: () => void;
}

export function MentatPanel({ onClose }: MentatPanelProps) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Soy Mentat Imperial, ¿qué deseas saber del universo DUNE?" },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [contextPersonaje, setContextPersonaje] = useState<any>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        const currentInput = input;
        setInput("");
        setIsLoading(true);

        const localResult = searchLocalKnowledge(currentInput);

        if (localResult.type === "local" && localResult.response) {
            if (localResult.personaje) {
                setContextPersonaje(localResult.personaje);
            }
            setMessages((prev) => [...prev, { role: "assistant", content: localResult.response! }]);
            setIsLoading(false);
            return;
        }
        try {
            const history = messages.slice(-10).map((m) => ({
                role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
                content: m.content,
            }));

            let contextInfo = "";
            if (contextPersonaje) {
                contextInfo = `Estamos hablando de ${contextPersonaje.name || contextPersonaje.fullName}. `;
            }

            const groqMessages = [
                {
                    role: "system" as const,
                    content: `Eres Mentat Imperial, un asistente experto en el universo DUNE de Frank Herbert. 
                                Respondes de forma breve, elegante y con un toque de sabiduría. 
                                Usas un tono formal pero accesible, como un consejero imperial. 
                                Siempre das respuestas directas y concisas, máximo 4 líneas. 
                                Si no sabes algo, lo admites con honestidad.
                ${contextInfo}`,
                },
                ...history,
                { role: "user" as const, content: currentInput },
            ];

            const groqReply = await askGroq(groqMessages);
            setMessages((prev) => [...prev, { role: "assistant", content: groqReply }]);
        } catch (error) {
            console.error("Error con Groq:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Lo siento, mi mente está en pausa. Inténtalo de nuevo." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const hasText = input.trim().length > 0;

    return (
        <div className="relative flex h-105 w-96 flex-col rounded-3xl border border-spice/30 bg-dune-black/80 shadow-2xl shadow-spice/20 backdrop-blur-sm">
            <div
                className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-r border-b border-spice/30 bg-dune-black/80"
                style={{ clipPath: "inset(0 0 0 0)" }}
            />

            <div className="flex items-center justify-between border-b border-sand/10 px-5 py-3">
                <span className="font-display text-lg tracking-wider text-spice drop-shadow-glow">
                    MENTAT IMPERIAL
                </span>
                <button
                    onClick={onClose}
                    className="cursor-pointer rounded-full p-1 text-sand/60 transition-colors hover:bg-spice/20 hover:text-sand-soft"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm wrap-break-word ${msg.role === "user"
                                    ? "bg-spice/30 text-sand-soft font-medium"
                                    : "bg-sand/15 border border-sand/30 text-sand-soft"
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-sand/10 rounded-2xl px-4 py-2 text-sm text-sand/60">
                            <span className="animate-pulse">Mentat está pensando...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-sand/10 p-3">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Pregunta a Mentat..."
                        className="flex-1 cursor-text rounded-full border border-sand/20 bg-dune-black/80 px-4 py-2 text-sm text-sand-soft outline-none transition-colors placeholder:text-sand/40 focus:border-spice/70"
                    />
                    <button
                        type="submit"
                        disabled={!hasText}
                        className={`cursor-pointer rounded-full p-2 transition-all duration-200 ${hasText
                                ? "bg-spice/70 text-dune-black hover:bg-spice/90"
                                : "bg-spice/20 text-spice/50"
                            }`}
                    >
                        <ArrowUp size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}