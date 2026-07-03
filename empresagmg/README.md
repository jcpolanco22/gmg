# EmpresaGMG — Portal de Reclutamiento

Portal de reclutamiento de Global Multiservice Group, construido con Next.js 16 (App Router), TailwindCSS v4 y Lucide Icons.

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── cuestionario/page.tsx     # Formulario de 7 pasos
│   └── admin/
│       ├── login/page.tsx        # Login del panel admin
│       └── candidatos/page.tsx   # Dashboard de candidatos (protegido)
├── components/                   # Componentes de la landing + AdminGuard
├── lib/
│   ├── auth.ts                   # Login/logout basado en sessionStorage
│   ├── storage.ts                # CRUD de candidatos en localStorage
│   └── export.ts                 # Exportación a CSV
└── types/index.ts                # Tipos TypeScript compartidos
```

## Requisitos

- Node.js 18.18 o superior
- npm

## Instalación local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Variables de entorno

Copia `.env.local` (o crea uno propio) con las credenciales del panel admin:

```
NEXT_PUBLIC_ADMIN_USER=administrator
NEXT_PUBLIC_ADMIN_PASS=admin-gmg-4321
```

> Importante: cambia estas credenciales antes de desplegar a producción. No dejes `.env.local` en un repositorio público — está incluido en `.gitignore` por defecto.

## Scripts disponibles

| Comando         | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Servidor de desarrollo                    |
| `npm run build`  | Build de producción                       |
| `npm run start`  | Sirve el build de producción              |
| `npm run lint`   | Corre ESLint                              |

## Despliegue en Vercel

### Opción A — Desde la CLI

```bash
npm install -g vercel
vercel login
vercel
```

Sigue las instrucciones en pantalla. Al finalizar, Vercel te dará una URL tipo `empresagmg.vercel.app`.

Cuando te pregunte por variables de entorno, agrega `NEXT_PUBLIC_ADMIN_USER` y `NEXT_PUBLIC_ADMIN_PASS`, o configúralas después en el dashboard de Vercel (Project → Settings → Environment Variables) y vuelve a desplegar con:

```bash
vercel --prod
```

### Opción B — Desde GitHub (recomendada para trabajo en equipo)

1. Sube el proyecto a un repositorio de GitHub:
   ```bash
   git init
   git add .
   git commit -m "Portal EmpresaGMG"
   git branch -M main
   git remote add origin <URL_DE_TU_REPO>
   git push -u origin main
   ```
2. Entra a vercel.com/new e importa el repositorio.
3. Vercel detecta Next.js automáticamente — no necesitas cambiar ningún setting de build.
4. En Environment Variables, agrega:
   - `NEXT_PUBLIC_ADMIN_USER`
   - `NEXT_PUBLIC_ADMIN_PASS`
5. Haz clic en Deploy. Cada `git push` a `main` generará un nuevo despliegue automáticamente.

### Dominio personalizado

En el dashboard de Vercel: Project → Settings → Domains → Add. Vercel te dará los registros DNS (normalmente un CNAME o A record) que debes configurar en el proveedor donde tengas registrado tu dominio.

## Limitaciones conocidas (a resolver antes de producción real)

- Almacenamiento de candidatos: actualmente usa `localStorage`, es decir, los datos viven solo en el navegador de quien use el panel admin — no hay backup ni acceso multi-dispositivo. Se recomienda migrar a una base de datos (PostgreSQL, MongoDB, etc.) detrás de una API antes de manejar candidatos reales a escala.
- Autenticación: el login usa `sessionStorage` con credenciales en variables de entorno públicas (`NEXT_PUBLIC_*`), razonable para una demo pero no para proteger datos personales sensibles en producción. Se recomienda NextAuth.js (o similar) con sesiones firmadas por servidor.
- Exportación CSV: exporta lo que esté cargado en el navegador actual (respetando los filtros activos en el dashboard).
