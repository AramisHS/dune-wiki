import { useState, useEffect, useRef } from "react";
import { X, ArrowUp } from "lucide-react";
import { searchLocalKnowledge, getActivePersonaje } from "@/lib/mentat-knowledge";
import { askGroq } from "@/lib/groq-client";
import { mentatMessages } from "@/lib/mentat-messages";
import mentatLogo from "@/assets/mentat-logo-chat.jpg";

const HIDE_DURATION = 8 * 60 * 1000;
const SHAKE_INTERVAL = 20 * 1000;

type Message = {
    role: "user" | "assistant";
    content: string;
};

const STORAGE_KEY = "mentat-conversation";

export function MentatButton() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [hiddenUntil, setHiddenUntil] = useState<number | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<number | null>(null);
    const shakeTimeoutRef = useRef<number | null>(null);

    const scrollToBottom = () => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (messagesEndRef.current) {
                    messagesEndRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                    });
                } else if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
            });
        });
    };

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setMessages(parsed);
                } else {
                    setMessages([{ role: "assistant", content: "Soy Mentat Imperial, ¿qué deseas saber del universo DUNE?" }]);
                }
            } else {
                setMessages([{ role: "assistant", content: "Soy Mentat Imperial, ¿qué deseas saber del universo DUNE?" }]);
            }
        } catch (e) {
            console.warn("Error cargando conversación:", e);
            setMessages([{ role: "assistant", content: "Soy Mentat Imperial, ¿qué deseas saber del universo DUNE?" }]);
        }

        setInitialized(true);
    }, []);

    useEffect(() => {
        if (!initialized) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch (e) {
            console.warn("Error guardando conversación:", e);
        }
    }, [messages, initialized]);

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    useEffect(() => {
        if (open && initialized) {
            setTimeout(() => {
                scrollToBottom();
            }, 200);
        }
    }, [open, initialized]);

    useEffect(() => {
        if (initialized && open) {
            scrollToBottom();
        }
    }, [initialized, open]);

    useEffect(() => {
        if (open) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = null;
            return;
        }
        if (!intervalRef.current) {
            intervalRef.current = window.setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % mentatMessages.length);
            }, 15000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = null;
        };
    }, [open]);

    useEffect(() => {
        if (hiddenUntil === null) return;
        const check = setInterval(() => {
            if (Date.now() > hiddenUntil) setHiddenUntil(null);
        }, 1000);
        return () => clearInterval(check);
    }, [hiddenUntil]);

    useEffect(() => {
        const shouldShake = !open && !isHidden;
        if (!shouldShake) {
            if (shakeTimeoutRef.current) {
                clearTimeout(shakeTimeoutRef.current);
                shakeTimeoutRef.current = null;
            }
            setIsShaking(false);
            return;
        }
        const scheduleShake = () => {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 600);
            shakeTimeoutRef.current = window.setTimeout(scheduleShake, SHAKE_INTERVAL);
        };
        shakeTimeoutRef.current = window.setTimeout(scheduleShake, 3000);
        return () => {
            if (shakeTimeoutRef.current) {
                clearTimeout(shakeTimeoutRef.current);
                shakeTimeoutRef.current = null;
            }
        };
    }, [open, hiddenUntil]);

    const isHidden = hiddenUntil !== null && Date.now() < hiddenUntil;
    const shouldShowBubble = !open && !isHidden;
    const currentMessage = mentatMessages[currentIndex];
    const hasText = input.trim().length > 0;

    const handleSend = async () => {
        if (!input.trim() || isLoading || !initialized) return;

        const userMsg: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        const currentInput = input;
        setInput("");
        setIsLoading(true);

        const localResult = searchLocalKnowledge(currentInput);

        if (localResult.type === "local" && localResult.response) {
            setMessages((prev) => [...prev, { role: "assistant", content: localResult.response ?? "" }]);
            setIsLoading(false);
            return;
        }

        try {
            const history: { role: "assistant" | "user"; content: string }[] = messages.slice(-10).map((m) => ({
                role: m.role === "assistant" ? "assistant" : "user",
                content: m.content,
            }));

            const activePersonaje = getActivePersonaje();
            let contextInfo = "";
            if (activePersonaje) {
                contextInfo = `Estamos hablando de ${activePersonaje.name || activePersonaje.fullName}. `;
            }

            const groqMessages: { role: "assistant" | "user" | "system"; content: string }[] = [
                {
                    role: "system",
                    content: `Eres Mentat Imperial, un asistente experto en el universo DUNE de Frank Herbert.
                                Respondes de forma breve, elegante y con un toque de sabiduría.
                                Usas un tono formal pero accesible, como un consejero imperial.
                                Siempre das respuestas directas y concisas, máximo 4 líneas.
                                Si no sabes algo, lo admites con honestidad.
                ${contextInfo}`,
                },
                ...history,
                { role: "user", content: currentInput },
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

    const handleCloseBubble = () => setHiddenUntil(Date.now() + HIDE_DURATION);

    const handleToggleChat = () => {
        setOpen(!open);
        if (!open) setHiddenUntil(null);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
                {shouldShowBubble && (
                    <div
                        className="relative mb-3 max-w-xs px-5 py-3 text-sm text-sand-soft bg-dune-black/80 border border-spice/30 rounded-2xl shadow-xl shadow-spice/10 backdrop-blur-sm animate-fade-in-up"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {isHovering && (
                            <button
                                onClick={handleCloseBubble}
                                className="absolute -top-2 -right-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-dune-black/90 border border-spice/40 text-spice hover:bg-spice/20 hover:text-sand-soft transition-colors"
                                aria-label="Cerrar mensaje"
                            >
                                <X size={14} />
                            </button>
                        )}
                        {currentMessage}
                        <div
                            className="absolute -bottom-2 right-6 h-4 w-4 bg-dune-black/80 border-r border-b border-spice/30 rotate-45 rounded-br-sm"
                            style={{ clipPath: "inset(0 0 0 0)" }}
                        />
                    </div>
                )}

                <button
                    onClick={handleToggleChat}
                    className={`relative flex size-14 cursor-pointer items-center justify-center rounded-full shadow-lg shadow-spice/40 transition-all duration-300 ease-out hover:scale-105 active:scale-95 ${open ? "scale-110 shadow-spice/60" : ""} overflow-hidden border-2 border-spice/50 bg-transparent ${isShaking && !open ? "animate-gentle-shake" : ""}`}
                    style={{ background: "transparent" }}
                >
                    <img src={mentatLogo} alt="Mentat" className="h-full w-full object-cover" suppressHydrationWarning />
                    {!open && !isHidden && (
                        <span className="absolute inset-0 rounded-full animate-ping-slow border border-spice/40" />
                    )}
                </button>
            </div>

            {/* Panel de chat */}
            {open && initialized && (
                <div className="fixed bottom-24 right-6 z-50">
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
                                onClick={handleToggleChat}
                                className="cursor-pointer rounded-full p-1 text-sand/60 transition-colors hover:bg-spice/20 hover:text-sand-soft"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div
                            ref={containerRef}
                            className="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll"
                        >
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
                                    <div className="bg-sand/10 rounded-2xl px-4 py-2 text-sm text-sand/60 animate-pulse">
                                        Mentat está pensando...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="border-t border-sand/10 p-3">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Pregunta a Mentat..."
                                    className="flex-1 cursor-text rounded-full border border-sand/20 bg-dune-black/80 px-4 py-2 text-sm text-sand-soft outline-none transition-colors placeholder:text-sand/40 focus:border-spice/70"
                                />
                                <button
                                    type="submit"
                                    disabled={!hasText || isLoading}
                                    className={`cursor-pointer rounded-full p-2 transition-all duration-200 ${hasText && !isLoading
                                        ? "bg-spice/70 text-dune-black hover:bg-spice/90"
                                        : "bg-spice/20 text-spice/50"
                                        }`}
                                >
                                    <ArrowUp size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}