import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EmpresaGMG | Portal de Reclutamiento",
  description:
    "Global Multiservice Group — Únete a nuestras empresas subsidiarias. Encuentra tu próxima oportunidad laboral.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
