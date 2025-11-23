import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; // <--- Importamos Outlet
import { ThemeProvider } from "@/components/theme-provider";
import { HomePage } from "./pages/home";
import PricingPage from "./pages/pricing";
import ChatAi from "./pages/chat-ai";
import Reporte from "./pages/reporte";
import { AboutSection } from "./pages/about";
import Login from "./pages/login"; // Tu componente Login existente
import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/auth.layout";
import Register from "./pages/register";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* GRUPO 1: Rutas con Navbar (Públicas/App) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat-ai" element={<ChatAi />} />
            <Route path="/reporte" element={<Reporte />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutSection />} />
          </Route>

          {/* GRUPO 2: Rutas de Autenticación (Sin Navbar, Centradas) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;