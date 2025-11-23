import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, RefreshCcw, Building2, GitBranch, BrainCircuit } from "lucide-react";

export function TheorySection() {
  return (
    <section className="container mx-auto px-4 py-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Contenedor Principal con efecto 'Glass' premium y borde sutil */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl overflow-hidden ring-1 ring-white/10 dark:ring-white/5">
        
        <CardHeader className="text-center pb-12 pt-12 relative">
          {/* Decoración de fondo sutil (Glow) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-primary/5 blur-[50px] rounded-full -z-10" />
          
          <Badge variant="secondary" className="w-fit mx-auto mb-6 px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/10 text-primary">
            Metodología Sistémica
          </Badge>
          <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Fundamento Teórico
          </CardTitle>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Nuestra IA no improvisa. Se basa en marcos teóricos sólidos de la <span className="text-foreground font-medium">Problemología</span> y la <span className="text-foreground font-medium">Metodología de Sistemas Blandos (MSB)</span>.
          </p>
        </CardHeader>
        
        <CardContent className="p-8 md:p-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* --- COLUMNA IZQUIERDA: Conceptos Clave --- */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                   <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">Conceptos Clave</h3>
              </div>
              
              <div className="grid gap-5">
                {/* Concepto 1: Tipología */}
                <div className="group flex items-start gap-5 p-5 rounded-2xl border border-muted/60 bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background border border-border shadow-sm group-hover:border-primary/50 group-hover:text-primary transition-colors">
                    <GitBranch className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">Tipología de Problemas</h4>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      Clasificación precisa entre problemas estructurados, semiestructurados y blandos para determinar la estrategia de solución adecuada.
                    </p>
                  </div>
                </div>

                {/* Concepto 2: Suprasistema */}
                <div className="group flex items-start gap-5 p-5 rounded-2xl border border-muted/60 bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background border border-border shadow-sm group-hover:border-primary/50 group-hover:text-primary transition-colors">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">Suprasistema PyME</h4>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      Análisis holístico que integra ventas, compras, producción y RRHH como un ecosistema interconectado y vivo.
                    </p>
                  </div>
                </div>

                {/* Concepto 3: Retroalimentación */}
                <div className="group flex items-start gap-5 p-5 rounded-2xl border border-muted/60 bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background border border-border shadow-sm group-hover:border-primary/50 group-hover:text-primary transition-colors">
                    <RefreshCcw className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">Retroalimentación</h4>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      Mecanismos de control cibernético mediante reuniones e indicadores (KPIs) para asegurar la mejora continua y adaptación.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- COLUMNA DERECHA: Análisis IA (Timeline) --- */}
            <div className="space-y-8 relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">Análisis Sistémico IA</h3>
              </div>
              
              {/* Línea vertical conectora refinada (con gradiente) */}
              <div className="absolute left-[22px] top-[80px] bottom-6 w-[2px] bg-gradient-to-b from-primary/20 via-primary/10 to-transparent" />

              <ul className="space-y-8 relative">
                {[
                  "Identificación y delimitación del problema real",
                  "Clasificación según tipología sistémica",
                  "Evaluación de impacto en subsistemas críticos",
                  "Modelado de situación ideal vs. real (MSB)",
                  "Cálculo de entropía y propuesta de valor"
                ].map((item, index) => (
                  <li key={index} className="group flex items-center gap-5">
                    {/* Nodo de la timeline */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card border-4 border-background shadow-md ring-1 ring-border group-hover:ring-primary group-hover:scale-110 transition-all duration-300">
                       <span className="text-sm font-bold text-foreground group-hover:text-primary">{index + 1}</span>
                    </div>
                    
                    {/* Tarjeta de paso */}
                    <div className="flex-1 py-3 px-5 rounded-xl border border-transparent bg-muted/10 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300">
                      <span className="text-base font-medium text-foreground/80 group-hover:text-foreground">
                        {item}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </CardContent>
      </Card>
    </section>
  );
}