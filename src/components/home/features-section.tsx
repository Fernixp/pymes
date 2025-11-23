import { 
    Sparkles, 
    Target, 
    Network, 
    CheckCircle2 
  } from "lucide-react";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  const features = [
    {
      icon: Sparkles,
      title: "IA Conversacional",
      description: "Conversación natural. La IA te guía con preguntas inteligentes para entender el problema.",
    },
    {
      icon: Target,
      title: "Análisis Automático",
      description: "La IA clasifica el problema y analiza subsistemas afectados automáticamente.",
    },
    {
      icon: Network,
      title: "Modelado MSB",
      description: "Genera automáticamente el modelo de situación real vs. ideal usando MSB.",
    },
    {
      icon: CheckCircle2,
      title: "Intervenciones IA",
      description: "Propuestas de mejora personalizadas basadas en el análisis sistémico.",
    },
  ];
  
  export function FeaturesSection() {
    // Agregamos las clases de animación al <section> contenedor
    return (
      <section className="container mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-muted/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                {/* Usamos 'text-primary' para mantenerlo monocromático y acorde al tema */}
                <feature.icon className="h-10 w-10 mb-2 text-primary" />
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }