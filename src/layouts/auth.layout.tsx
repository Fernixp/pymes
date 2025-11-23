import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
      // Usamos flex, items-center y justify-center para centrar perfectamente el login
      <div className="min-h-svh w-full flex items-center justify-center bg-background text-foreground">
        <div className="w-full max-w-md px-4">
          <Outlet />
        </div>
      </div>
    );
  };