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

const SAMPLE_CANDIDATOS: Candidato[] = [
  {
    id: "cand_01",
    createdAt: "2026-06-24T08:00:00.000Z",
    estado: "Nuevo",
    nombre: "Ana",
    apellido: "Gómez",
    email: "ana.gomez@example.com",
    telefono: "+1 809-555-0123",
    cedula: "001-0123456-7",
    fechaNacimiento: "1994-05-18",
    pais: "República Dominicana",
    ciudad: "Santo Domingo",
    direccion: "Av. Independencia 123",
    codigoPostal: "10101",
    nivelEducativo: "Universitario",
    institucion: "Universidad Autónoma de Santo Domingo",
    titulo: "Administración de Empresas",
    anioGraduacion: "2017",
    ultimaEmpresa: "Global Multiservice Group",
    cargo: "Coordinadora de Proyectos",
    tiempoExperiencia: "4 años",
    descripcionExperiencia: "Gestión de proyectos empresariales y coordinación de equipos.",
    habilidadesTecnicas: "Gestión de proyectos, análisis financiero, Excel avanzado",
    idiomas: "Español, Inglés",
    certificaciones: "Scrum Master",
    empresaDeseada: "Global Multiservice Group",
    disponibilidad: "Inmediata",
    salarioEsperado: "RD$75,000",
    modalidad: "Presencial",
  },
  {
    id: "cand_02",
    createdAt: "2026-06-25T08:15:00.000Z",
    estado: "Nuevo",
    nombre: "Carlos",
    apellido: "Pérez",
    email: "carlos.perez@example.com",
    telefono: "+1 809-555-0456",
    cedula: "002-0234567-8",
    fechaNacimiento: "1990-10-02",
    pais: "República Dominicana",
    ciudad: "Santiago",
    direccion: "Calle Las Palmas 45",
    codigoPostal: "51000",
    nivelEducativo: "Técnico",
    institucion: "Instituto Tecnológico de Santo Domingo",
    titulo: "Técnico en Electrónica",
    anioGraduacion: "2012",
    ultimaEmpresa: "Drphone Technology",
    cargo: "Técnico en reparación",
    tiempoExperiencia: "8 años",
    descripcionExperiencia: "Reparación de dispositivos móviles y servicio técnico al cliente.",
    habilidadesTecnicas: "Electrónica, diagnóstico de fallas, mantenimiento preventivo",
    idiomas: "Español",
    certificaciones: "Técnico certificado en reparaciones móviles",
    empresaDeseada: "Drphone Technology",
    disponibilidad: "1 mes",
    salarioEsperado: "RD$45,000",
    modalidad: "Presencial",
  },
  {
    id: "cand_03",
    createdAt: "2026-06-26T08:30:00.000Z",
    estado: "Nuevo",
    nombre: "María",
    apellido: "López",
    email: "maria.lopez@example.com",
    telefono: "+1 809-555-0789",
    cedula: "003-0345678-9",
    fechaNacimiento: "1997-03-14",
    pais: "República Dominicana",
    ciudad: "La Romana",
    direccion: "Blvd. La Romana 789",
    codigoPostal: "43000",
    nivelEducativo: "Universitario",
    institucion: "Pontificia Universidad Católica Madre y Maestra",
    titulo: "Arquitectura de Interiores",
    anioGraduacion: "2019",
    ultimaEmpresa: "Lanco's Decorations",
    cargo: "Diseñadora de interiores",
    tiempoExperiencia: "3 años",
    descripcionExperiencia: "Diseño de espacios residenciales y comerciales.",
    habilidadesTecnicas: "AutoCAD, Photoshop, diseño de interiores",
    idiomas: "Español, Inglés",
    certificaciones: "Decoración profesional",
    empresaDeseada: "Lanco's Decorations",
    disponibilidad: "Inmediata",
    salarioEsperado: "RD$65,000",
    modalidad: "Híbrida",
  },
  {
    id: "cand_04",
    createdAt: "2026-06-27T08:45:00.000Z",
    estado: "Nuevo",
    nombre: "Andrés",
    apellido: "Martínez",
    email: "andres.martinez@example.com",
    telefono: "+1 809-555-0912",
    cedula: "004-0456789-0",
    fechaNacimiento: "1988-11-22",
    pais: "República Dominicana",
    ciudad: "Santo Domingo",
    direccion: "Calle El Millón 100",
    codigoPostal: "10203",
    nivelEducativo: "Universitario",
    institucion: "Universidad Nacional Pedro Henríquez Ureña",
    titulo: "Ingeniería de Sistemas",
    anioGraduacion: "2013",
    ultimaEmpresa: "TechShield Global",
    cargo: "Analista de seguridad",
    tiempoExperiencia: "6 años",
    descripcionExperiencia: "Implementación de medidas de ciberseguridad y protección de datos.",
    habilidadesTecnicas: "Seguridad informática, redes, análisis de amenazas",
    idiomas: "Español, Inglés",
    certificaciones: "Certified Ethical Hacker",
    empresaDeseada: "TechShield Global",
    disponibilidad: "1-2 semanas",
    salarioEsperado: "RD$85,000",
    modalidad: "Presencial",
  },
  {
    id: "cand_05",
    createdAt: "2026-06-28T09:00:00.000Z",
    estado: "Nuevo",
    nombre: "Laura",
    apellido: "Fernández",
    email: "laura.fernandez@example.com",
    telefono: "+1 809-555-0345",
    cedula: "005-0567890-1",
    fechaNacimiento: "1995-07-08",
    pais: "República Dominicana",
    ciudad: "Puerto Plata",
    direccion: "Av. España 222",
    codigoPostal: "57000",
    nivelEducativo: "Universitario",
    institucion: "Universidad Tecnológica de Santiago",
    titulo: "Marketing Digital",
    anioGraduacion: "2018",
    ultimaEmpresa: "OmniFix Solutions",
    cargo: "Coordinadora de servicios",
    tiempoExperiencia: "5 años",
    descripcionExperiencia: "Coordinación de servicios técnicos y atención a clientes.",
    habilidadesTecnicas: "CRM, gestión de proyectos, comunicación",
    idiomas: "Español, Inglés",
    certificaciones: "Gestión de proyectos",
    empresaDeseada: "OmniFix Solutions",
    disponibilidad: "Inmediata",
    salarioEsperado: "RD$60,000",
    modalidad: "Presencial",
  },
  {
    id: "cand_06",
    createdAt: "2026-06-29T09:15:00.000Z",
    estado: "Nuevo",
    nombre: "Pedro",
    apellido: "Santos",
    email: "pedro.santos@example.com",
    telefono: "+1 809-555-0678",
    cedula: "006-0678901-2",
    fechaNacimiento: "1992-01-30",
    pais: "República Dominicana",
    ciudad: "Santo Domingo",
    direccion: "Av. 27 de Febrero 500",
    codigoPostal: "10302",
    nivelEducativo: "Universitario",
    institucion: "Universidad Iberoamericana",
    titulo: "Gestión Inmobiliaria",
    anioGraduacion: "2016",
    ultimaEmpresa: "Komo in Kasa",
    cargo: "Asesor inmobiliario",
    tiempoExperiencia: "7 años",
    descripcionExperiencia: "Venta y gestión de propiedades residenciales e industriales.",
    habilidadesTecnicas: "Ventas, negociación, análisis de mercado",
    idiomas: "Español",
    certificaciones: "Agente inmobiliario certificado",
    empresaDeseada: "Komo in Kasa",
    disponibilidad: "Más de 1 mes",
    salarioEsperado: "RD$70,000",
    modalidad: "Híbrida",
  },
];

function seedSampleCandidatos(): Candidato[] {
  if (!isBrowser()) return [];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_CANDIDATOS));
  return SAMPLE_CANDIDATOS;
}

export function getCandidatos(): Candidato[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedSampleCandidatos();
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
