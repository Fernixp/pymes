import { Navbar01 } from "../components/ui/shadc-io/navbar-01";
import { ScrollToTop } from "../components/home/scroll-to-top";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
    return (
      <div className="min-h-svh bg-background text-foreground transition-colors duration-300 relative">
        <header className="border-b bg-card/50 sticky top-0 z-50 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <Navbar01
              navigationLinks={[
                { label: "Home", href: "/" },
                { label: "Chat AI", href: "/chat-ai" },
                { label: "Reporte", href: "/reporte" },
                { label: "Pricing", href: "/pricing" },
                { label: "About", href: "/about" },
              ]}
            />
          </div>
        </header>
  
        <main className="container mx-auto px-4">
          {/* Outlet renderiza la ruta hija seleccionada (Home, Chat, etc.) */}
          <Outlet />
        </main>
  
        <ScrollToTop />
      </div>
    );
  };