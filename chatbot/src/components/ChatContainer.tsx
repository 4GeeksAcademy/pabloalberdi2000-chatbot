import React from "react";

// Ejemplo de mensajes, reemplazar por props reales
const messages = [
  {
    id: '1',
    role: 'user',
    content: '¿Cuál es la capital de Francia?',
  },
  {
    id: '2',
    role: 'assistant',
    content: 'La capital de Francia es París.',
    usage: { prompt_tokens: 8, completion_tokens: 6, total_tokens: 14, latency: 0.42 },
  },
];

export default function ChatContainer() {
  return (
    <section className="flex-1 flex flex-col gap-4 overflow-y-auto p-6 bg-background">
      {messages.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">Inicia una conversación para ver los mensajes aquí.</div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-2xl mx-auto flex flex-col items-${msg.role === 'user' ? 'end' : 'start'} gap-1`}
          >
            <div
              className={`px-4 py-3 rounded-2xl shadow-md font-sans text-base whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-primary text-on-primary rounded-br-md'
                  : 'bg-surface text-on-surface rounded-bl-md border border-outline-variant'
              }`}
            >
              {msg.content}
            </div>
            {msg.role === 'assistant' && msg.usage && (
              <div className="text-xs text-gray-500 mt-1 ml-2">
                {msg.usage.prompt_tokens} prompt | {msg.usage.completion_tokens} comp | {msg.usage.latency?.toFixed(2)}s
              </div>
            )}
          </div>
        ))
      )}
    </section>
  );
}
