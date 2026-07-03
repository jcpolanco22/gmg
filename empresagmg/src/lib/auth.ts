// Autenticación simple para el panel admin, basada en sessionStorage.
//
// NOTA DE SEGURIDAD:
// - Las credenciales pueden definirse con variables de entorno públicas
//   `NEXT_PUBLIC_ADMIN_USER` y `NEXT_PUBLIC_ADMIN_PASS`.
// - Por defecto se usa administrator / admin-gmg-4321 para esta demo.
// - sessionStorage protege solo del lado del cliente: cualquiera con acceso
//   a las devtools del navegador podría, en teoría, alterar el estado de
//   sesión. Para un entorno de producción con datos sensibles, lo ideal es
//   migrar a NextAuth.js (o similar) con sesiones firmadas por servidor.

const SESSION_KEY = "gmg_admin_session";

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER || "administrator";
const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "admin-gmg-4321";

function isBrowser() {
  return typeof window !== "undefined";
}

export function login(usuario: string, password: string): boolean {
  if (usuario === ADMIN_USER && password === ADMIN_PASS) {
    if (isBrowser()) {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    }
    return true;
  }
  return false;
}

export function logout(): void {
  if (isBrowser()) {
    window.sessionStorage.removeItem(SESSION_KEY);
  }
}

export function isAuthenticated(): boolean {
  if (!isBrowser()) return false;
  return window.sessionStorage.getItem(SESSION_KEY) === "true";
}
