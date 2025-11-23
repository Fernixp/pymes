import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onActionClick?: () => void;
}

export function HeroSection({  }: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <Badge
        variant="secondary"
        className="py-2 px-5 text-sm font-medium rounded-full"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Potenciado con Inteligencia Artificial
      </Badge>

      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl">
        Diagnóstico Inteligente de <br className="hidden sm:inline" />
        Problemas en PyMES
      </h1>

      <p className="mx-auto max-w-[700px] text-muted-foreground text-base md:text-lg leading-relaxed">
        Solo describe tu problema. Nuestra IA experta en Problemología y MSB
        analizará automáticamente tu situación y generará un diagnóstico
        sistémico completo.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <Button
          size="lg"
          className="font-semibold text-base px-8 h-12 rounded-full"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {/* Usar Link */}
          <Link to={"chat-ai"}>Hablar con la IA Analista</Link>
        </Button>
      </div>
    </section>
  );
}
