import React from "react";

export default function Sidebar() {
  return (
    <aside className="h-full w-72 min-w-[240px] bg-gradient-to-b from-surface to-background border-r border-outline-variant shadow-lg flex flex-col p-6 gap-4">
      <h2 className="text-xl font-bold tracking-tight text-primary mb-2">Sesiones</h2>
      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {/* Ejemplo de sesiones, reemplazar por mapeo real */}
        <button className="text-left px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors border border-transparent focus:outline-none focus:ring-2 focus:ring-primary">
          Sesión actual
        </button>
        <button className="text-left px-3 py-2 rounded-lg hover:bg-outline-variant/30 text-on-surface transition-colors border border-transparent">Otra sesión</button>
      </nav>
      <button className="mt-4 bg-primary hover:bg-primary/90 text-on-primary rounded-lg px-4 py-2 font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
        + Nueva sesión
      </button>
    </aside>
  );
}
