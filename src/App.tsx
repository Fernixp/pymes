import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import { ScrollToTop } from "./components/home/scroll-to-top";
import { Navbar01 } from "./components/ui/shadc-io/navbar-01";
import { HomePage } from "./pages/home";
import PricingPage from "./pages/pricing";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-svh bg-background text-foreground transition-colors duration-300 relative">
          
          <header className="border-b bg-card/50 sticky top-0 z-50 backdrop-blur-md">
            <div className="container mx-auto px-4">
              <Navbar01 
                navigationLinks={[
                  { label: "Home", href: "/" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "About", href: "#about" } 
                ]}
              />
            </div>
          </header>

          <main className="container mx-auto px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pricing" element={<PricingPage />} />
            </Routes>
          </main>

          <ScrollToTop />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;