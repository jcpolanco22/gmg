import {
  Building2,
  Truck,
  ShieldCheck,
  HeartPulse,
  Landmark,
  Wrench,
} from "lucide-react";

const empresas = [
  {
    icon: Building2,
    nombre: "GMG Corporativo",
    descripcion: "Servicios administrativos y de gestión empresarial.",
  },
  {
    icon: Truck,
    nombre: "GMG Logística",
    descripcion: "Transporte, distribución y cadena de suministro.",
  },
  {
    icon: ShieldCheck,
    nombre: "GMG Seguridad",
    descripcion: "Soluciones de seguridad física y vigilancia.",
  },
  {
    icon: HeartPulse,
    nombre: "GMG Salud",
    descripcion: "Servicios de salud ocupacional y bienestar.",
  },
  {
    icon: Landmark,
    nombre: "GMG Financiero",
    descripcion: "Servicios financieros y de gestión de nómina.",
  },
  {
    icon: Wrench,
    nombre: "GMG Facilities",
    descripcion: "Mantenimiento y gestión de instalaciones.",
  },
];

export default function CompaniesGrid() {
  return (
    <section id="empresas" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gmg-blue">
            Nuestro grupo
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-gmg-dark sm:text-4xl">
            Seis empresas, un mismo compromiso
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {empresas.map((empresa) => (
            <div
              key={empresa.nombre}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gmg-light text-gmg-blue transition-colors group-hover:bg-gmg-blue group-hover:text-white">
                <empresa.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gmg-dark">
                {empresa.nombre}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {empresa.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
