import { useState } from "react";

export function MessageInput({ onSend, disabled }: { onSend: (text: string) => void; disabled: boolean }) {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() && !disabled) {
            onSend(text);
            setText("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t border-sand/10 p-3">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Pregunta a Mentat..."
                    disabled={disabled}
                    className="flex-1 bg-dune-black/60 border border-sand/20 rounded px-3 py-2 text-sm text-sand-soft placeholder:text-sand/30 outline-none focus:border-spice"
                />
                <button
                    type="submit"
                    disabled={disabled || !text.trim()}
                    className="bg-spice text-dune-black px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
                >
                    Enviar
                </button>
            </div>
        </form>
    );
}