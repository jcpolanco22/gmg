// Utilidad para exportar candidatos a un archivo CSV descargable
// desde el navegador (sin backend, todo del lado del cliente).

import { Candidato } from "@/types";

const COLUMNAS: { key: keyof Candidato; label: string }[] = [
  { key: "nombre", label: "Nombre" },
  { key: "apellido", label: "Apellido" },
  { key: "email", label: "Correo" },
  { key: "telefono", label: "Teléfono" },
  { key: "cedula", label: "Cédula" },
  { key: "fechaNacimiento", label: "Fecha de nacimiento" },
  { key: "pais", label: "País" },
  { key: "ciudad", label: "Ciudad" },
  { key: "nivelEducativo", label: "Nivel educativo" },
  { key: "institucion", label: "Institución" },
  { key: "ultimaEmpresa", label: "Última empresa" },
  { key: "cargo", label: "Cargo" },
  { key: "tiempoExperiencia", label: "Experiencia" },
  { key: "empresaDeseada", label: "Empresa deseada" },
  { key: "modalidad", label: "Modalidad" },
  { key: "salarioEsperado", label: "Salario esperado" },
  { key: "estado", label: "Estado" },
  { key: "createdAt", label: "Fecha de solicitud" },
];

// Escapa comillas y envuelve el valor si contiene comas, comillas o saltos de línea
function escaparCelda(valor: string): string {
  const texto = valor ?? "";
  if (/[",\n]/.test(texto)) {
    return `"${texto.replace(/"/g, '""')}"`;
  }
  return texto;
}

export function candidatosToCSV(candidatos: Candidato[]): string {
  const encabezado = COLUMNAS.map((c) => escaparCelda(c.label)).join(",");
  const filas = candidatos.map((candidato) =>
    COLUMNAS.map((c) => escaparCelda(String(candidato[c.key] ?? ""))).join(",")
  );
  // BOM UTF-8 al inicio para que Excel abra los acentos correctamente
  return "\uFEFF" + [encabezado, ...filas].join("\n");
}

export function descargarCandidatosCSV(candidatos: Candidato[]): void {
  const csv = candidatosToCSV(candidatos);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const fecha = new Date().toISOString().slice(0, 10);
  const link = document.createElement("a");
  link.href = url;
  link.download = `candidatos-empresagmg-${fecha}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
