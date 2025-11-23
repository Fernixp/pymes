import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { DiagnosticProvider } from "@/context/DiagnosticContext"; // <--- IMPORTAR

import { HomePage } from "./pages/home";
import PricingPage from "./pages/pricing";
import ChatAi from "./pages/chat-ai";
import Reporte from "./pages/reporte";
import { AboutSection } from "./pages/about";
import Login from "./pages/login";
import Register from "./pages/register";
import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/auth.layout";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Envolvemos todo con el DiagnosticProvider */}
      <DiagnosticProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat-ai" element={<ChatAi />} />
              <Route path="/reporte" element={<Reporte />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutSection />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </Router>
      </DiagnosticProvider>
    </ThemeProvider>
  );
}

export default App;