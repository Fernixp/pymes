// App.tsx (Recordatorio visual)
import { Button } from "./components/ui/button";
import { Navbar } from "./components/navbar";
import useFuturama from "./hooks/useFuturama";

function App() {
  const { fetchFuturama } = useFuturama();

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
           <Navbar />
        </div>
      </header>

      <main className="container mx-auto px-4 flex flex-col items-center justify-center gap-4 py-20">
         {/* ... resto de tu app ... */}
         <Button onClick={fetchFuturama}>Cargar Datos</Button>
      </main>
    </div>
  );
}

export default App;