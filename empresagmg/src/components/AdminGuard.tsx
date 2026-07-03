"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/admin/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura de sessionStorage solo disponible en cliente
      setChecked(true);
    }
  }, [router]);

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gmg-dark">
        <div className="flex items-center gap-3 text-gmg-light">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gmg-gold border-t-transparent" />
          <span>Verificando sesión…</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
