type Message = {
    role: 'user' | 'assistant' | 'system' | string;
    content: string;
};

export function MessageList({ messages, isLoading }: { messages: Message[]; isLoading: boolean }) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.role === 'user' ? 'bg-spice/20 text-sand-soft' : 'bg-sand/10 text-sand'
                        }`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-sand/10 rounded-lg px-4 py-2 text-sand/60">
                        <span className="animate-pulse">Escribiendo...</span>
                    </div>
                </div>
            )}
        </div>
    );
}