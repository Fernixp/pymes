import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { HeroSection } from "./components/home/hero-section";
import { FeaturesSection } from "./components/home/features-section";
import { HowItWorksSection } from "./components/home/hows-it-works-section";
import { TheorySection } from "./components/home/theory-section";
import { ScrollToTop } from "./components/home/scroll-to-top";

function App() {

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
          <FeaturesSection />
          <HowItWorksSection />
          <TheorySection />
        </main>
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}
export default App;
