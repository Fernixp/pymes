"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// 1. AGREGAR ArrowLeft AQUÍ
import { Github, ArrowLeft } from "lucide-react"; 
import { Link } from "react-router-dom";

// ... (GoogleIcon se mantiene igual) ...
const GoogleIcon = () => (
  <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
    />
  </svg>
);

export const title = "Login Card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 relative">
        
        <div className="absolute left-6 top-0">
            <Button variant="ghost" size="icon" className="-ml-2 h-8 w-8" asChild>
                <Link to="/" aria-label="Volver al inicio">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
            </Button>
        </div>

        <CardTitle className="text-2xl font-bold text-center">
          Iniciar sesión
        </CardTitle>
        <CardDescription className="text-center">
          Ingresa tu correo electrónico para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@ejemplo.com"
            type="email"
            value={email}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            <a
              className="text-sm text-muted-foreground hover:underline"
              href="#"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
        </div>

        <Button className="w-full">Iniciar sesión</Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              O continúa con
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full flex" asChild>
            <Link to="#">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to={"#"}>
              <GoogleIcon />
              Google
            </Link>
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-muted-foreground text-sm">
          ¿No tienes una cuenta?{" "}
          <Link
            to={"/register"}
            className="font-medium text-primary hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;