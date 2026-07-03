import { Quote } from "lucide-react";

export default function CEOSection() {
  return (
    <section className="bg-gmg-dark py-24 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[240px_1fr]">
        <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-gmg-blue to-gmg-accent text-5xl font-bold">
          JCPB
        </div>

        <div>
          <Quote className="h-10 w-10 text-gmg-gold" />
          <p className="mt-4 text-xl font-medium leading-relaxed text-slate-200 sm:text-2xl">
            Nuestro mayor activo es el talento de nuestra gente. Cada persona
            que se une a Global Multiservice Group encuentra un espacio para
            crecer, aportar y construir una carrera con propósito.
          </p>
          <div className="mt-6">
            <p className="font-bold text-white">Juan Carlos Polanco Blanco</p>
            <p className="text-sm text-slate-400">
              CEO, Global Multiservice Group
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
