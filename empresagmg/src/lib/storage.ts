// Almacenamiento de candidatos en localStorage.
//
// NOTA IMPORTANTE (seguridad / producción):
// Este módulo guarda datos personales (cédula, teléfono, dirección) SOLO
// en el navegador del dispositivo que use el administrador. No hay backup,
// no hay control de acceso por servidor y los datos se pierden si se borra
// la caché del navegador. Para producción real se recomienda migrar a una
// base de datos (PostgreSQL, MongoDB, etc.) detrás de una API protegida.

import { Candidato, CandidatoFormData, EstadoCandidato } from "@/types";

const STORAGE_KEY = "gmg_candidatos";

function isBrowser() {
  return typeof window !== "undefined";
}

function generarId(): string {
  return `cand_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function getCandidatos(): Candidato[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as Candidato[];
    // Los más recientes primero
    return data.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Error leyendo candidatos de localStorage:", error);
    return [];
  }
}

export function saveCandidato(data: CandidatoFormData): Candidato {
  const nuevo: Candidato = {
    ...data,
    id: generarId(),
    createdAt: new Date().toISOString(),
    estado: "Nuevo",
  };

  if (isBrowser()) {
    const actuales = getCandidatos();
    const actualizados = [...actuales, nuevo];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
  }

  return nuevo;
}

export function updateCandidato(
  id: string,
  cambios: Partial<Candidato>
): Candidato | null {
  if (!isBrowser()) return null;
  const actuales = getCandidatos();
  const index = actuales.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const actualizado = { ...actuales[index], ...cambios };
  actuales[index] = actualizado;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(actuales));
  return actualizado;
}

export function updateEstadoCandidato(
  id: string,
  estado: EstadoCandidato
): Candidato | null {
  return updateCandidato(id, { estado });
}

export function deleteCandidato(id: string): void {
  if (!isBrowser()) return;
  const actuales = getCandidatos().filter((c) => c.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(actuales));
}
