import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import useFuturama from "@/hooks/useFuturama";
import { ThemeProvider } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import { HeroSection } from "./components/home/hero-section";

function App() {
  const { fetchFuturama } = useFuturama();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-svh bg-background text-foreground transition-colors duration-300">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <Navbar />
          </div>
        </header>
        <main className="container mx-auto px-4 flex flex-col items-center justify-center py-10 text-center space-y-3">
          <HeroSection />
        </main>
      </div>
    </ThemeProvider>
  );
}
export default App;
