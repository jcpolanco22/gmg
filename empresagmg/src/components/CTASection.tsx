import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-gmg-blue to-gmg-accent py-20 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl">
          ¿Listo para dar el siguiente paso?
        </h2>
        <p className="mt-4 text-lg text-blue-50">
          Completa nuestro formulario de reclutamiento en menos de 10 minutos.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/cuestionario"
            className="group flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-gmg-blue transition-transform hover:scale-105"
          >
            Aplicar Ahora
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#contacto"
            className="rounded-full border border-white/40 px-8 py-3.5 font-semibold text-white hover:bg-white/10"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
}
