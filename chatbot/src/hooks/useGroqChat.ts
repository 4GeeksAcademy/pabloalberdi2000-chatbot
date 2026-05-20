import { useCallback, useEffect, useRef, useState } from 'react';

export interface GroqMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  usage?: GroqUsage;
  latency?: number; // segundos
}

export interface GroqUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface GroqSession {
  id: string;
  messages: GroqMessage[];
  metrics: {
    totalTokens: number;
    avgLatency: number;
    requests: number;
  };
}

export interface UseGroqChatOptions {
  initialSessions?: GroqSession[];
}

export function useGroqChat({ initialSessions = [] }: UseGroqChatOptions = {}) {
  const [sessions, setSessions] = useState<GroqSession[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('groq_sessions');
      if (saved) return JSON.parse(saved);
    }
    return initialSessions;
  });
  const [activeSessionId, setActiveSessionId] = useState<string | null>(sessions[0]?.id || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState({ temperature: 0.7, top_p: 1, json_mode: false });

  // Persist sessions
  useEffect(() => {
    localStorage.setItem('groq_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || null;

  const newSession = useCallback(() => {
    const id = Date.now().toString();
    const session: GroqSession = {
      id,
      messages: [],
      metrics: { totalTokens: 0, avgLatency: 0, requests: 0 },
    };
    setSessions((prev) => [session, ...prev]);
    setActiveSessionId(id);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeSession) return;
      setLoading(true);
      setError(null);
      const userMsg: GroqMessage = { role: 'user', content };
      const start = performance.now();
      // Append user message instantly
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSession.id
            ? { ...s, messages: [...s.messages, userMsg] }
            : s
        )
      );
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...activeSession.messages, userMsg],
            temperature: params.temperature,
            top_p: params.top_p,
            json_mode: params.json_mode,
          }),
        });
        const end = performance.now();
        const latency = ((end - start) / 1000).toFixed(2);
        if (!res.ok) {
          const err = await res.json();
          setError(err.error || 'Error en la respuesta de la IA');
          setLoading(false);
          return;
        }
        const data = await res.json();
        const aiMsg: GroqMessage = {
          role: 'assistant',
          content: data.choices?.[0]?.message?.content || '',
          usage: data.usage,
          latency: Number(latency),
        };
        setSessions((prev) =>
          prev.map((s) => {
            if (s.id !== activeSession.id) return s;
            const messages = [...s.messages, aiMsg];
            // Métricas
            const totalTokens = messages.reduce(
              (sum, m) => sum + (m.usage?.total_tokens || 0),
              0
            );
            const latencies = messages.filter((m) => m.latency).map((m) => m.latency!);
            const avgLatency =
              latencies.length > 0
                ? Number((latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2))
                : 0;
            const requests = messages.filter((m) => m.role === 'assistant').length;
            return {
              ...s,
              messages,
              metrics: { totalTokens, avgLatency, requests },
            };
          })
        );
      } catch (e: any) {
        setError(e.message || 'Error de red');
      } finally {
        setLoading(false);
      }
    },
    [activeSession, params]
  );

  const setSessionParams = useCallback((paramsUpdate: Partial<typeof params>) => {
    setParams((prev) => ({ ...prev, ...paramsUpdate }));
  }, []);

  return {
    sessions,
    activeSession,
    setActiveSessionId,
    newSession,
    sendMessage,
    loading,
    error,
    params,
    setSessionParams,
  };
}
