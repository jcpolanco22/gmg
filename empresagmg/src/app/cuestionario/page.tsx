"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, ArrowLeft, ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { CandidatoFormData } from "@/types";
import { saveCandidato } from "@/lib/storage";

const PASOS = [
  "Información Personal",
  "Ubicación",
  "Educación",
  "Experiencia Laboral",
  "Habilidades",
  "Preferencias",
  "Revisión y Envío",
];

const initialData: CandidatoFormData = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  cedula: "",
  fechaNacimiento: "",
  pais: "",
  ciudad: "",
  direccion: "",
  codigoPostal: "",
  nivelEducativo: "",
  institucion: "",
  titulo: "",
  anioGraduacion: "",
  ultimaEmpresa: "",
  cargo: "",
  tiempoExperiencia: "",
  descripcionExperiencia: "",
  habilidadesTecnicas: "",
  idiomas: "",
  certificaciones: "",
  empresaDeseada: "",
  disponibilidad: "",
  salarioEsperado: "",
  modalidad: "",
};

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gmg-dark">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-gmg-blue focus:ring-2 focus:ring-gmg-blue/20"
      />
    </label>
  );
}

function Textarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block sm:col-span-2">
      <span className="mb-1.5 block text-sm font-medium text-gmg-dark">
        {label}
      </span>
      <textarea
        {...props}
        rows={4}
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-gmg-blue focus:ring-2 focus:ring-gmg-blue/20"
      />
    </label>
  );
}

function Select({
  label,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gmg-dark">
        {label}
      </span>
      <select
        {...props}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-gmg-blue focus:ring-2 focus:ring-gmg-blue/20"
      >
        <option value="">Selecciona una opción</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function CuestionarioPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CandidatoFormData>(initialData);
  const [enviado, setEnviado] = useState(false);

  const update = (field: keyof CandidatoFormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => Math.min(s + 1, PASOS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    saveCandidato(data);
    setEnviado(true);
  };

  if (enviado) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gmg-dark">
            ¡Solicitud enviada!
          </h1>
          <p className="mt-3 text-slate-500">
            Gracias, {data.nombre}. Hemos recibido tu solicitud. Nuestro
            equipo de reclutamiento la revisará y se pondrá en contacto
            contigo pronto.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-gmg-blue px-6 py-2.5 text-sm font-semibold text-white"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gmg-blue to-gmg-accent text-white">
              <Building2 className="h-4 w-4" />
            </span>
            <span className="font-bold text-gmg-dark">
              Empresa<span className="text-gmg-gold">GMG</span>
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-1 text-sm text-slate-500 hover:text-gmg-dark">
            <ArrowLeft className="h-4 w-4" /> Salir
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 pt-10">
        {/* Indicador de pasos */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {PASOS.map((p, i) => (
            <div key={p} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  i < step
                    ? "bg-gmg-blue text-white"
                    : i === step
                    ? "bg-gmg-gold text-gmg-dark"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < PASOS.length - 1 && (
                <div
                  className={`h-0.5 w-6 sm:w-10 ${
                    i < step ? "bg-gmg-blue" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-1 text-xl font-bold text-gmg-dark">
            Paso {step + 1} de {PASOS.length}
          </h2>
          <p className="mb-6 text-sm text-slate-500">{PASOS[step]}</p>

          {/* Paso 1: Información Personal */}
          {step === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Nombre" value={data.nombre} onChange={(e) => update("nombre", e.target.value)} />
              <Input label="Apellido" value={data.apellido} onChange={(e) => update("apellido", e.target.value)} />
              <Input label="Correo electrónico" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} />
              <Input label="Teléfono" value={data.telefono} onChange={(e) => update("telefono", e.target.value)} />
              <Input label="Cédula / Documento de identidad" value={data.cedula} onChange={(e) => update("cedula", e.target.value)} />
              <Input label="Fecha de nacimiento" type="date" value={data.fechaNacimiento} onChange={(e) => update("fechaNacimiento", e.target.value)} />
            </div>
          )}

          {/* Paso 2: Ubicación */}
          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="País" value={data.pais} onChange={(e) => update("pais", e.target.value)} />
              <Input label="Ciudad" value={data.ciudad} onChange={(e) => update("ciudad", e.target.value)} />
              <Textarea label="Dirección" value={data.direccion} onChange={(e) => update("direccion", e.target.value)} />
              <Input label="Código postal" value={data.codigoPostal} onChange={(e) => update("codigoPostal", e.target.value)} />
            </div>
          )}

          {/* Paso 3: Educación */}
          {step === 2 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Select
                label="Nivel educativo"
                value={data.nivelEducativo}
                onChange={(e) => update("nivelEducativo", e.target.value)}
                options={["Secundaria", "Técnico", "Universitario", "Postgrado", "Maestría", "Doctorado"]}
              />
              <Input label="Institución" value={data.institucion} onChange={(e) => update("institucion", e.target.value)} />
              <Input label="Título obtenido" value={data.titulo} onChange={(e) => update("titulo", e.target.value)} />
              <Input label="Año de graduación" value={data.anioGraduacion} onChange={(e) => update("anioGraduacion", e.target.value)} />
            </div>
          )}

          {/* Paso 4: Experiencia Laboral */}
          {step === 3 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Última empresa" value={data.ultimaEmpresa} onChange={(e) => update("ultimaEmpresa", e.target.value)} />
              <Input label="Cargo" value={data.cargo} onChange={(e) => update("cargo", e.target.value)} />
              <Input label="Tiempo de experiencia" value={data.tiempoExperiencia} onChange={(e) => update("tiempoExperiencia", e.target.value)} placeholder="Ej: 2 años" />
              <Textarea label="Descripción de tus funciones" value={data.descripcionExperiencia} onChange={(e) => update("descripcionExperiencia", e.target.value)} />
            </div>
          )}

          {/* Paso 5: Habilidades */}
          {step === 4 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Textarea label="Habilidades técnicas" value={data.habilidadesTecnicas} onChange={(e) => update("habilidadesTecnicas", e.target.value)} />
              <Input label="Idiomas" value={data.idiomas} onChange={(e) => update("idiomas", e.target.value)} placeholder="Ej: Español, Inglés" />
              <Input label="Certificaciones" value={data.certificaciones} onChange={(e) => update("certificaciones", e.target.value)} />
            </div>
          )}

          {/* Paso 6: Preferencias */}
          {step === 5 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Empresa deseada dentro del grupo" value={data.empresaDeseada} onChange={(e) => update("empresaDeseada", e.target.value)} />
              <Select
                label="Disponibilidad"
                value={data.disponibilidad}
                onChange={(e) => update("disponibilidad", e.target.value)}
                options={["Inmediata", "1-2 semanas", "1 mes", "Más de 1 mes"]}
              />
              <Input label="Salario esperado" value={data.salarioEsperado} onChange={(e) => update("salarioEsperado", e.target.value)} />
              <Select
                label="Modalidad preferida"
                value={data.modalidad}
                onChange={(e) => update("modalidad", e.target.value)}
                options={["Presencial", "Remota", "Híbrida"]}
              />
            </div>
          )}

          {/* Paso 7: Revisión */}
          {step === 6 && (
            <div className="space-y-6 text-sm">
              <ResumenGrupo titulo="Información Personal" datos={[
                ["Nombre", `${data.nombre} ${data.apellido}`],
                ["Correo", data.email],
                ["Teléfono", data.telefono],
                ["Cédula", data.cedula],
              ]} />
              <ResumenGrupo titulo="Ubicación" datos={[
                ["País", data.pais],
                ["Ciudad", data.ciudad],
              ]} />
              <ResumenGrupo titulo="Educación" datos={[
                ["Nivel", data.nivelEducativo],
                ["Institución", data.institucion],
              ]} />
              <ResumenGrupo titulo="Experiencia" datos={[
                ["Última empresa", data.ultimaEmpresa],
                ["Cargo", data.cargo],
              ]} />
              <ResumenGrupo titulo="Preferencias" datos={[
                ["Empresa deseada", data.empresaDeseada],
                ["Modalidad", data.modalidad],
              ]} />
              <p className="rounded-lg bg-gmg-light px-4 py-3 text-gmg-dark">
                Al enviar, confirmas que la información proporcionada es
                correcta y autorizas a EmpresaGMG a procesarla con fines de
                reclutamiento.
              </p>
            </div>
          )}

          {/* Navegación */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
            <button
              onClick={prev}
              disabled={step === 0}
              className="flex items-center gap-1 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-500 disabled:opacity-0"
            >
              <ArrowLeft className="h-4 w-4" /> Anterior
            </button>

            {step < PASOS.length - 1 ? (
              <button
                onClick={next}
                className="flex items-center gap-1 rounded-full bg-gmg-blue px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                Siguiente <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-1 rounded-full bg-gmg-gold px-6 py-2.5 text-sm font-semibold text-gmg-dark transition-transform hover:scale-105"
              >
                Enviar solicitud <Check className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function ResumenGrupo({
  titulo,
  datos,
}: {
  titulo: string;
  datos: [string, string][];
}) {
  return (
    <div>
      <h3 className="mb-2 font-bold text-gmg-dark">{titulo}</h3>
      <dl className="grid gap-2 rounded-lg bg-slate-50 p-4 sm:grid-cols-2">
        {datos.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-medium text-slate-400">{label}</dt>
            <dd className="text-slate-700">{value || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
