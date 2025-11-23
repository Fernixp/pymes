import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  const isAuthenticated = false;

  return (
    <nav className="w-full flex items-center justify-between py-4">
      <a
        href="/"
        className="flex items-center gap-3 select-none transition-opacity hover:opacity-90"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 shadow-sm">
          <Building2 className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col justify-center leading-none">
          <h1 className="text-lg font-bold text-foreground">
            Sistema de Diagnóstico PyMES
          </h1>
          <p className="text-xs text-muted-foreground font-medium">
            Análisis Sistémico Impulsado por IA
          </p>
        </div>
      </a>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <Button asChild variant="default">
            <a href="/dashboard">Dashboard</a>
          </Button>
        ) : (
          <>
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <a href="/login">Iniciar sesión</a>
            </Button>
            <Button asChild>
              <a href="/register">Registrarse</a>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}
