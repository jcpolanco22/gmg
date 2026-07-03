import { CheckCircle2 } from "lucide-react";

const areas = [
  "Administración y Finanzas",
  "Logística y Transporte",
  "Atención al Cliente",
  "Recursos Humanos",
  "Tecnología de la Información",
  "Ventas y Mercadeo",
  "Operaciones",
  "Seguridad Industrial",
  "Salud Ocupacional",
  "Mantenimiento y Facilities",
];

export default function RecruitmentAreas() {
  return (
    <section id="vacantes" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gmg-blue">
            Áreas de reclutamiento
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-gmg-dark sm:text-4xl">
            Oportunidades en todas las áreas
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <div
              key={area}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-gmg-blue" />
              <span className="font-medium text-gmg-dark">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
