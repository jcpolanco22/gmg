// Tipos compartidos del proyecto EmpresaGMG

export type EstadoCandidato =
  | "Nuevo"
  | "En Revisión"
  | "Entrevista"
  | "Aprobado"
  | "Rechazado";

export interface Candidato {
  id: string;
  createdAt: string;
  estado: EstadoCandidato;

  // Paso 1: Información personal
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  cedula: string;
  fechaNacimiento: string;

  // Paso 2: Ubicación
  pais: string;
  ciudad: string;
  direccion: string;
  codigoPostal: string;

  // Paso 3: Educación
  nivelEducativo: string;
  institucion: string;
  titulo: string;
  anioGraduacion: string;

  // Paso 4: Experiencia laboral
  ultimaEmpresa: string;
  cargo: string;
  tiempoExperiencia: string;
  descripcionExperiencia: string;

  // Paso 5: Habilidades
  habilidadesTecnicas: string;
  idiomas: string;
  certificaciones: string;

  // Paso 6: Preferencias
  empresaDeseada: string;
  disponibilidad: string;
  salarioEsperado: string;
  modalidad: string;
}

export type CandidatoFormData = Omit<Candidato, "id" | "createdAt" | "estado">;

export interface Empresa {
  nombre: string;
  descripcion: string;
}
