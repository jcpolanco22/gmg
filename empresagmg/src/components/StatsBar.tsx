const stats = [
  { value: "6", label: "Empresas" },
  { value: "50+", label: "Vacantes activas" },
  { value: "15+", label: "Países" },
  { value: "1000+", label: "Empleados" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-extrabold text-gmg-blue sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
