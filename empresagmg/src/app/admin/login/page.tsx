"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Building2, Lock, User, AlertCircle } from "lucide-react";
import { login } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (login(usuario, password)) {
      router.push("/admin/candidatos");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gmg-dark px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gmg-blue/30 blur-3xl" />
        <div className="animate-blob absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gmg-gold/20 blur-3xl [animation-delay:4s]" />
      </div>

      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gmg-blue to-gmg-accent text-white">
          <Building2 className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-center text-xl font-bold text-white">
          Panel Administrativo
        </h1>
        <p className="mt-1 text-center text-sm text-slate-400">
          EmpresaGMG · Acceso restringido
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              Usuario
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                autoComplete="username"
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-gmg-gold"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-gmg-gold"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-gmg-gold py-3 text-sm font-semibold text-gmg-dark transition-transform hover:scale-[1.02]"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </main>
  );
}
