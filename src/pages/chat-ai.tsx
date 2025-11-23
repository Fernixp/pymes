import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useDiagnostic } from "@/context/DiagnosticContext"; // Importamos el contexto

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// --- Pasos del Flujo Sistémico ---
type ChatStep = 
  | 'INTRO' 
  | 'PROBLEM_DESC' 
  | 'SUBSYSTEMS' 
  | 'MSB_REALITY' 
  | 'MSB_IDEAL' 
  | 'FINISHED';

export default function ChatAi() {
  const navigate = useNavigate();
  const { updateData, resetDiagnosis } = useDiagnostic();
  const [step, setStep] = useState<ChatStep>('INTRO');
  
  // Estado temporal para guardar respuestas antes de enviarlas al contexto
  const [tempData, setTempData] = useState({
    name: "",
    desc: "",
    reality: "",
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "¡Hola! Soy PymeBot, tu analista sistémico. Para comenzar el diagnóstico, primero dime: ¿Cuál es el nombre de tu empresa?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- LÓGICA DEL BOT (Preconfigurada) ---
  const processResponse = async (userInput: string) => {
    // 1. Añadir mensaje del usuario
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: userInput };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simular delay de "pensamiento"
    setTimeout(() => {
      let botResponse = "";
      let nextStep = step;

      switch (step) {
        case 'INTRO':
          setTempData({ ...tempData, name: userInput });
          updateData({ companyName: userInput });
          botResponse = `Entendido. Vamos a aplicar Problemología. Describe brevemente el problema principal que detectas en ${userInput}.`;
          nextStep = 'PROBLEM_DESC';
          break;

        case 'PROBLEM_DESC':
          setTempData({ ...tempData, desc: userInput });
          // Lógica simple para determinar tipología (simulada)
          const isSoft = userInput.toLowerCase().includes("gente") || userInput.toLowerCase().includes("comunicación") || userInput.toLowerCase().includes("desorden");
          const type = isSoft ? "blando" : "estructurado";
          
          updateData({ 
            problemDescription: userInput,
            problemType: type 
          });
          
          botResponse = `Interesante. Basado en tu descripción, parece un problema de tipo **${type.toUpperCase()}**. \n\nAhora evaluemos el impacto en los subsistemas (Ventas, Compras, Producción, RRHH). \n\nDel 1 al 5, ¿cuánto afecta esto a las Ventas y a RRHH? (Escribe dos números separados, ej: 4, 5)`;
          nextStep = 'SUBSYSTEMS';
          break;

        case 'SUBSYSTEMS':
          // Parsear números simples (muy básico para el demo)
          const nums = userInput.match(/\d+/g);
          const ventas = nums ? parseInt(nums[0]) : 3;
          const rrhh = nums && nums[1] ? parseInt(nums[1]) : 3;
          
          // Calculamos entropía simulada basada en impacto
          const entropy = ((ventas + rrhh) / 10) * 100;

          updateData({
            subsystems: {
              ventas: ventas,
              rrhh: rrhh,
              compras: Math.floor(Math.random() * 5) + 1, // Simulado
              produccion: Math.floor(Math.random() * 5) + 1 // Simulado
            },
            entropyLevel: entropy
          });

          botResponse = "Datos registrados. Pasemos a la Metodología de Sistemas Blandos (MSB). \n\n¿Cómo se realiza ACTUALMENTE la actividad problemática? (Situación Real)";
          nextStep = 'MSB_REALITY';
          break;

        case 'MSB_REALITY':
          setTempData({ ...tempData, reality: userInput });
          botResponse = "¿Y cómo debería realizarse IDEALMENTE para que el sistema funcione correctamente? (Situación Ideal)";
          nextStep = 'MSB_IDEAL';
          break;

        case 'MSB_IDEAL':
          updateData({
            msbAnalysis: [{
              current: tempData.reality,
              ideal: userInput
            }]
          });
          botResponse = "¡Perfecto! He completado el diagnóstico sistémico. \n\nEstoy generando tu reporte con el cálculo de entropía y comparación MSB...";
          nextStep = 'FINISHED';
          break;
      }

      setStep(nextStep);
      
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: botResponse };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);

      // Si terminó, redirigir después de un momento
      if (nextStep === 'FINISHED') {
        setTimeout(() => navigate("/reporte"), 3000);
      }

    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) processResponse(input);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center bg-muted/30 p-4 md:p-8">
      <Card className="flex h-full w-full max-w-4xl flex-col overflow-hidden shadow-xl">
        <div className="flex items-center justify-between border-b bg-card/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Analista Sistémico IA</h2>
              <p className="text-xs text-muted-foreground">MSB + Problemología</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { resetDiagnosis(); window.location.reload(); }}>
            Reiniciar
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex w-full gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-sm", msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={cn("max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm", msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-card border text-card-foreground rounded-tl-none")}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm pl-12">
                <Loader2 className="h-3 w-3 animate-spin" /> Analizando sistema...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t bg-background p-4">
          <div className="relative flex items-end gap-2 rounded-xl border bg-muted/30 p-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu respuesta..."
              className="flex-1 resize-none bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground max-h-[150px]"
              rows={1}
              disabled={isLoading || step === 'FINISHED'}
            />
            <Button onClick={() => processResponse(input)} size="icon" disabled={!input.trim() || isLoading || step === 'FINISHED'}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}