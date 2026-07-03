import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gmg-dark pt-40 pb-28 text-white">
      {/* Blobs decorativos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gmg-blue/30 blur-3xl" />
        <div className="animate-blob absolute top-40 right-0 h-96 w-96 rounded-full bg-gmg-gold/20 blur-3xl [animation-delay:4s]" />
        <div className="animate-blob absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-gmg-accent/20 blur-3xl [animation-delay:8s]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="animate-fade-in-up mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gmg-light">
          <Sparkles className="h-4 w-4 text-gmg-gold" />
          Grupo con presencia en más de 15 países
        </div>

        <h1 className="animate-fade-in-up text-4xl font-extrabold leading-tight tracking-tight [animation-delay:0.1s] sm:text-5xl md:text-6xl">
          Construye tu carrera con{" "}
          <span className="bg-gradient-to-r from-gmg-gold to-gmg-blue bg-clip-text text-transparent">
            Global Multiservice Group
          </span>
        </h1>

        <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg text-slate-300 [animation-delay:0.2s]">
          Seis empresas subsidiarias, un mismo propósito: conectar talento con
          oportunidades reales. Postúlate hoy y forma parte de nuestro equipo.
        </p>

        <div className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-4 [animation-delay:0.3s] sm:flex-row">
          <Link
            href="/cuestionario"
            className="group flex items-center gap-2 rounded-full bg-gmg-gold px-8 py-3.5 font-semibold text-gmg-dark transition-transform hover:scale-105"
          >
            Aplicar Ahora
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#vacantes"
            className="rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Ver Vacantes
          </a>
        </div>
      </div>
    </section>
  );
}
