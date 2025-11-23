import { Target, Users, Zap, ShieldCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const values = [
  {
    icon: Target,
    title: "Enfoque Sistémico",
    description: "No vemos problemas aislados. Analizamos la empresa como un todo interconectado, donde cada parte afecta al conjunto.",
  },
  {
    icon: Users,
    title: "Factor Humano",
    description: "Entendemos que las PyMES son personas. Priorizamos los 'problemas blandos' (cultura, comunicación, liderazgo) sobre los puramente técnicos.",
  },
  {
    icon: Zap,
    title: "Tecnología Accesible",
    description: "Democratizamos herramientas de consultoría de alto nivel. Lo que antes costaba miles de dólares, hoy es accesible mediante IA.",
  },
  {
    icon: ShieldCheck,
    title: "Rigor Metodológico",
    description: "Nuestra IA no alucina soluciones. Sigue estrictamente los pasos de la Metodología de Sistemas Blandos (MSB) de Checkland.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-4 py-24 md:py-32 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Encabezado de la sección */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="outline" className="px-4 py-1 text-sm border-primary/20 bg-primary/5 text-primary">
          Nuestra Misión
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Consultoría de Clase Mundial para <br className="hidden sm:inline" />
          <span className="text-primary">Pequeñas y Medianas Empresas</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Nacimos con una convicción: el pensamiento sistémico no debería ser exclusivo de las grandes corporaciones. Unimos la Problemología académica con la velocidad de la Inteligencia Artificial.
        </p>
      </div>

      {/* Grid de Valores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((item, index) => (
          <Card key={index} className="bg-card/50 border-muted hover:border-primary/40 transition-colors duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-foreground" />
              </div>
              <CardTitle className="text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bloque de 'Historia' o 'Contexto' simple */}
      <div className="rounded-2xl border bg-muted/30 p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">¿Por qué "Sistemas Blandos"?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Peter Checkland desarrolló la MSB para abordar situaciones donde el problema no está claramente definido y donde el factor humano es crucial.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              En una PyME, el 80% de los problemas no son de maquinaria o software, son de <strong>coordinación, roles y propósito</strong>. Nuestra herramienta está diseñada específicamente para navegar esa complejidad humana.
            </p>
          </div>
          
          {/* Estadística Simple Minimalista */}
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            <Card className="text-center py-6 border-none shadow-none bg-background">
              <div className="text-4xl font-bold text-primary mb-2">+500</div>
              <div className="text-sm text-muted-foreground font-medium">Diagnósticos Generados</div>
            </Card>
            <Card className="text-center py-6yb border-none shadow-none bg-background">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground font-medium">Disponibilidad IA</div>
            </Card>
            <Card className="text-center py-6 border-none shadow-none bg-background col-span-2">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground font-medium">Enfoque Sistémico</div>
            </Card>
          </div>
        </div>
      </div>

    </section>
  );
}