import {
  GraduationCap,
  HeartHandshake,
  TrendingUp,
  Globe2,
  Clock,
  Users,
} from "lucide-react";

const beneficios = [
  {
    icon: HeartHandshake,
    titulo: "Seguro médico",
    descripcion: "Cobertura de salud para ti y tu familia.",
    gradient: "from-gmg-blue to-gmg-accent",
  },
  {
    icon: TrendingUp,
    titulo: "Crecimiento profesional",
    descripcion: "Planes de carrera y promociones internas.",
    gradient: "from-gmg-gold to-orange-500",
  },
  {
    icon: GraduationCap,
    titulo: "Capacitación continua",
    descripcion: "Programas de formación y certificaciones.",
    gradient: "from-gmg-accent to-blue-400",
  },
  {
    icon: Globe2,
    titulo: "Movilidad internacional",
    descripcion: "Oportunidades en más de 15 países.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Clock,
    titulo: "Flexibilidad horaria",
    descripcion: "Modalidades presencial, remota e híbrida.",
    gradient: "from-amber-400 to-gmg-gold",
  },
  {
    icon: Users,
    titulo: "Cultura colaborativa",
    descripcion: "Un equipo que impulsa tus ideas.",
    gradient: "from-gmg-dark to-slate-600",
  },
];

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gmg-blue">
            Beneficios
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-gmg-dark sm:text-4xl">
            Lo que ofrecemos a nuestro equipo
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((b) => (
            <div
              key={b.titulo}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${b.gradient} text-white`}
              >
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gmg-dark">
                {b.titulo}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{b.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
