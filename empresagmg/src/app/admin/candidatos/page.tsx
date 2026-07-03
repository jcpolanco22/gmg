"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  LogOut,
  Search,
  Trash2,
  Mail,
  Phone,
  Users,
  Download,
} from "lucide-react";
import AdminGuard from "@/components/AdminGuard";
import { Candidato, EstadoCandidato } from "@/types";
import {
  getCandidatos,
  deleteCandidato,
  updateEstadoCandidato,
} from "@/lib/storage";
import { descargarCandidatosCSV } from "@/lib/export";
import { logout } from "@/lib/auth";

const ESTADOS: EstadoCandidato[] = [
  "Nuevo",
  "En Revisión",
  "Entrevista",
  "Aprobado",
  "Rechazado",
];

const ESTADO_COLOR: Record<EstadoCandidato, string> = {
  Nuevo: "bg-blue-100 text-blue-700",
  "En Revisión": "bg-amber-100 text-amber-700",
  Entrevista: "bg-purple-100 text-purple-700",
  Aprobado: "bg-green-100 text-green-700",
  Rechazado: "bg-red-100 text-red-700",
};

function DashboardContent() {
  const router = useRouter();
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<string>("Todos");
  const [filtroEmpresa, setFiltroEmpresa] = useState<string>("Todas");
  const [seleccionado, setSeleccionado] = useState<Candidato | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura de localStorage solo disponible en cliente
    setCandidatos(getCandidatos());
  }, []);

  const empresas = useMemo(() => {
    const set = new Set(candidatos.map((c) => c.empresaDeseada).filter(Boolean));
    return Array.from(set);
  }, [candidatos]);

  const filtrados = useMemo(() => {
    return candidatos.filter((c) => {
      const coincideBusqueda =
        `${c.nombre} ${c.apellido} ${c.email}`
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      const coincideEstado =
        filtroEstado === "Todos" || c.estado === filtroEstado;
      const coincideEmpresa =
        filtroEmpresa === "Todas" || c.empresaDeseada === filtroEmpresa;
      return coincideBusqueda && coincideEstado && coincideEmpresa;
    });
  }, [candidatos, busqueda, filtroEstado, filtroEmpresa]);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const handleEstadoChange = (id: string, estado: EstadoCandidato) => {
    updateEstadoCandidato(id, estado);
    setCandidatos(getCandidatos());
    if (seleccionado?.id === id) {
      setSeleccionado((prev) => (prev ? { ...prev, estado } : prev));
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este candidato? Esta acción no se puede deshacer.")) {
      return;
    }
    deleteCandidato(id);
    setCandidatos(getCandidatos());
    if (seleccionado?.id === id) setSeleccionado(null);
  };

  const handleExport = () => {
    descargarCandidatosCSV(filtrados);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gmg-blue to-gmg-accent text-white">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold text-gmg-dark">
                Empresa<span className="text-gmg-gold">GMG</span>
              </p>
              <p className="text-xs text-slate-400">Panel de Candidatos</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" /> Salir
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Contador */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gmg-light text-gmg-blue">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gmg-dark">
                {candidatos.length}
              </p>
              <p className="text-sm text-slate-500">Candidatos totales</p>
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={filtrados.length === 0}
            className="flex items-center gap-2 rounded-full bg-gmg-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gmg-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Download className="h-4 w-4" />
            Exportar CSV
          </button>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre o correo..."
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gmg-blue focus:ring-2 focus:ring-gmg-blue/20"
            />
          </div>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-gmg-blue"
          >
            <option value="Todos">Todos los estados</option>
            {ESTADOS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          <select
            value={filtroEmpresa}
            onChange={(e) => setFiltroEmpresa(e.target.value)}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-gmg-blue"
          >
            <option value="Todas">Todas las empresas</option>
            {empresas.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        {/* Tabla */}
        {filtrados.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-400">
            No hay candidatos que coincidan con los filtros.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3">Candidato</th>
                  <th className="px-5 py-3">Contacto</th>
                  <th className="px-5 py-3">Empresa deseada</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtrados.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSeleccionado(c)}
                        className="font-medium text-gmg-dark hover:text-gmg-blue hover:underline"
                      >
                        {c.nombre} {c.apellido}
                      </button>
                      <p className="text-xs text-slate-400">{c.cargo || "—"}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <p className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" /> {c.email}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" /> {c.telefono}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {c.empresaDeseada || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={c.estado}
                        onChange={(e) =>
                          handleEstadoChange(
                            c.id,
                            e.target.value as EstadoCandidato
                          )
                        }
                        className={`rounded-full border-0 px-3 py-1 text-xs font-semibold outline-none ${ESTADO_COLOR[c.estado]}`}
                      >
                        {ESTADOS.map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                        aria-label="Eliminar candidato"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de detalle */}
      {seleccionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setSeleccionado(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gmg-dark">
              {seleccionado.nombre} {seleccionado.apellido}
            </h3>
            <span
              className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${ESTADO_COLOR[seleccionado.estado]}`}
            >
              {seleccionado.estado}
            </span>

            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <Detalle label="Correo" value={seleccionado.email} />
              <Detalle label="Teléfono" value={seleccionado.telefono} />
              <Detalle label="Cédula" value={seleccionado.cedula} />
              <Detalle label="País / Ciudad" value={`${seleccionado.pais} / ${seleccionado.ciudad}`} />
              <Detalle label="Nivel educativo" value={seleccionado.nivelEducativo} />
              <Detalle label="Institución" value={seleccionado.institucion} />
              <Detalle label="Última empresa" value={seleccionado.ultimaEmpresa} />
              <Detalle label="Cargo" value={seleccionado.cargo} />
              <Detalle label="Experiencia" value={seleccionado.tiempoExperiencia} />
              <Detalle label="Empresa deseada" value={seleccionado.empresaDeseada} />
              <Detalle label="Modalidad" value={seleccionado.modalidad} />
              <Detalle label="Salario esperado" value={seleccionado.salarioEsperado} />
            </dl>

            <button
              onClick={() => setSeleccionado(null)}
              className="mt-6 w-full rounded-lg bg-slate-100 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
        EmpresaGMG · reclutamiento@empresagmg.com · Panel interno de uso
        exclusivo del equipo de RRHH.
      </footer>
    </div>
  );
}

function Detalle({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-slate-400">{label}</dt>
      <dd className="text-slate-700">{value || "—"}</dd>
    </div>
  );
}

export default function CandidatosPage() {
  return (
    <AdminGuard>
      <DashboardContent />
    </AdminGuard>
  );
}
