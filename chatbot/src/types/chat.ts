export interface UsageMetrics {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  latency?: number; // en segundos
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  usage?: UsageMetrics;
}

export interface ChatSession {
  id: string;
  name: string;
  messages: ChatMessage[];
  createdAt: number;
}

export interface GroqParams {
  temperature: number;
  top_p: number;
  json_mode: boolean;
}
