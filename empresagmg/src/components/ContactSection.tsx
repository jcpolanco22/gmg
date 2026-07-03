import { Mail, Phone, MapPin } from "lucide-react";

const contactos = [
  {
    icon: Mail,
    label: "Correo",
    value: "reclutamiento@empresagmg.com",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+1 (809) 555-0100",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Santo Domingo, República Dominicana",
  },
];

export default function ContactSection() {
  return (
    <section id="contacto" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gmg-blue">
            Contacto
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-gmg-dark sm:text-4xl">
            ¿Tienes preguntas?
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {contactos.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-slate-200 p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gmg-light text-gmg-blue">
                <c.icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-500">
                {c.label}
              </p>
              <p className="mt-1 font-medium text-gmg-dark">{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
