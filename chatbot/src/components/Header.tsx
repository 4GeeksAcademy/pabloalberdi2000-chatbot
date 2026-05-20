import React from "react";

export default function Header() {
  return (
    <header className="h-16 bg-surface border-b border-outline-variant flex items-center px-8 justify-between shadow-sm">
      <span className="font-extrabold text-2xl tracking-tight text-primary drop-shadow-sm select-none">
        Developer AI Chat Console
      </span>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Conectado
        </span>
        {/* Aquí puedes agregar avatar o menú de usuario */}
      </div>
    </header>
  );
}
