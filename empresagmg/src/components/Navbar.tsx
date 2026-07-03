"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Building2 } from "lucide-react";

const links = [
  { href: "#empresas", label: "Empresas" },
  { href: "#vacantes", label: "Vacantes" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-gmg-dark/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gmg-blue to-gmg-accent">
            <Building2 className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Empresa<span className="text-gmg-gold">GMG</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/cuestionario"
            className="rounded-full bg-gmg-gold px-5 py-2.5 text-sm font-semibold text-gmg-dark transition-transform hover:scale-105"
          >
            Aplicar Ahora
          </Link>
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-gmg-dark px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/cuestionario"
              className="mt-2 rounded-full bg-gmg-gold px-5 py-2.5 text-center text-sm font-semibold text-gmg-dark"
            >
              Aplicar Ahora
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
