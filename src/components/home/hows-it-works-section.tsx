import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    id: 1,
    title: "Describe tu Problema",
    description: "Conversa naturalmente con la IA. Describe lo que está pasando en tu empresa.",
  },
  {
    id: 2,
    title: "IA Analiza",
    description: "La IA aplica Problemología y MSB para diagnosticar y modelar tu situación.",
  },
  {
    id: 3,
    title: "Recibe Soluciones",
    description: "Obtén un diagnóstico completo con intervenciones sistémicas específicas.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-4">¿Cómo Funciona?</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Un proceso simple de tres pasos para transformar los problemas de tu empresa en soluciones sistémicas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Línea conectora (Dashed y centrada detrás de las cards) */}
        {/* Solo visible en desktop, ajustada para pasar por detrás de los círculos */}
        <div className="hidden md:block absolute top-0 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-muted z-0" />

        {steps.map((step) => (
          <div key={step.id} className="relative pt-6 group">
            
            {/* BADGE DEL NÚMERO (Flotando arriba) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold shadow-lg ring-8 ring-background transition-transform duration-300 group-hover:scale-110"
              >
                {step.id}
              </div>
            </div>

            {/* CONTENIDO (Card) */}
            <Card className="h-full pt-8 text-center border-muted hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="mt-2 text-xl font-semibold">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
            
          </div>
        ))}
      </div>
    </section>
  );
}