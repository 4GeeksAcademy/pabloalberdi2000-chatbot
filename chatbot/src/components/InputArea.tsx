
'use client';
import React, { useState } from "react";

export default function InputArea() {
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(1);
  const [jsonMode, setJsonMode] = useState(false);

  return (
    <form className="flex flex-col gap-3 p-6 border-t border-outline-variant bg-surface shadow-sm">
      <div className="flex gap-2">
        <textarea
          className="flex-1 resize-none rounded-lg border border-outline-variant p-3 font-mono bg-background focus:ring-2 focus:ring-primary transition"
          rows={2}
          placeholder="Escribe tu mensaje..."
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-on-primary rounded-lg px-6 py-2 font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Enviar
        </button>
      </div>
      <div className="flex flex-wrap gap-6 items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <label htmlFor="temp" className="text-sm text-on-surface font-medium">Temperature</label>
          <input
            id="temp"
            type="range"
            min={0}
            max={2}
            step={0.01}
            value={temperature}
            onChange={e => setTemperature(Number(e.target.value))}
            className="accent-primary w-32"
          />
          <span className="font-mono text-xs text-primary">{temperature}</span>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="topP" className="text-sm text-on-surface font-medium">Top P</label>
          <input
            id="topP"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={topP}
            onChange={e => setTopP(Number(e.target.value))}
            className="accent-secondary w-32"
          />
          <span className="font-mono text-xs text-secondary">{topP}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-on-surface font-medium">JSON_MODE</span>
          <button
            type="button"
            onClick={() => setJsonMode(j => !j)}
            className={`w-12 h-6 rounded-full flex items-center transition-colors duration-200 px-1 ${jsonMode ? 'bg-secondary' : 'bg-outline-variant'}`}
          >
            <span
              className={`h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ${jsonMode ? 'translate-x-6' : ''}`}
            />
          </button>
        </div>
      </div>
    </form>
  );
}
