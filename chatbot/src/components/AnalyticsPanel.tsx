import React from "react";

export default function AnalyticsPanel() {
  return (
    <aside className="w-72 min-w-[220px] bg-gradient-to-b from-surface to-background border-l border-outline-variant shadow-lg p-6 flex flex-col gap-4">
      <h3 className="font-bold text-lg text-primary mb-2">Métricas</h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-block w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-primary font-bold">Σ</span>
          </span>
          <span className="text-on-surface">Total tokens:</span>
          <span className="font-mono text-base text-primary">0</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-block w-4 h-4 bg-secondary/20 rounded-full flex items-center justify-center">
            <span className="text-secondary font-bold">⏱</span>
          </span>
          <span className="text-on-surface">Latencia promedio:</span>
          <span className="font-mono text-base text-secondary">0.00s</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-block w-4 h-4 bg-tertiary/20 rounded-full flex items-center justify-center">
            <span className="text-tertiary font-bold">#</span>
          </span>
          <span className="text-on-surface">Requests:</span>
          <span className="font-mono text-base text-tertiary">0</span>
        </div>
      </div>
    </aside>
  );
}
