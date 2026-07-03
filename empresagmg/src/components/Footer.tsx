import Link from "next/link";
import { Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gmg-dark py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row">
          <div className="flex items-center gap-2 text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gmg-blue to-gmg-accent">
              <Building2 className="h-4 w-4" />
            </span>
            <span className="font-bold">
              Empresa<span className="text-gmg-gold">GMG</span>
            </span>
          </div>

          <div className="flex gap-6 text-sm">
            <a href="#empresas" className="hover:text-white">
              Empresas
            </a>
            <a href="#vacantes" className="hover:text-white">
              Vacantes
            </a>
            <a href="#contacto" className="hover:text-white">
              Contacto
            </a>
            <Link href="/admin/login" className="hover:text-white">
              Admin
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-sm">
          © {new Date().getFullYear()} Global Multiservice Group. Todos los
          derechos reservados.
        </p>
      </div>
    </footer>
  );
}
