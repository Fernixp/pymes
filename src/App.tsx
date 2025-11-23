import { Button } from "./components/ui/button";
import { Navbar } from "./components/navbar";
import useFuturama from "./hooks/useFuturama";
import { ThemeProvider } from "./components/theme-provider"; // <--- IMPORTANTE

function App() {
  const { fetchFuturama } = useFuturama();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-svh bg-background text-foreground transition-colors duration-300">
        
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <Navbar />
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 flex flex-col items-center justify-center gap-4 py-20">
          <h1 className="text-3xl font-bold tracking-tight">Bienvenido al análisis sistémico</h1>
          <p className="text-muted-foreground">Haz clic abajo para probar tu conexión API</p>
          <Button onClick={fetchFuturama}>Cargar Datos de Futurama</Button>
        </main>
        
      </div>
    </ThemeProvider>
  );
}

export default App;