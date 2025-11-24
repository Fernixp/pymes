import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Loader2, FileText, RefreshCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { sendMessageToGemini, generateDiagnosticJSON } from "@/lib/gemini";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// 1. Definimos una constante para la Key del localStorage
const LOCAL_STORAGE_KEY = "pymes_chat_history_v1";

// Mensaje por defecto extraído para reutilizar
const DEFAULT_MESSAGE: Message = {
  id: "0",
  role: "assistant",
  content:
    "¡Hola! Soy tu Analista Sistémico basado en IA (Gemini). Para comenzar, cuéntame: ¿Cómo se llama tu empresa y qué problema estás observando?",
};

export default function ChatAi() {
  const navigate = useNavigate();
  const { updateData, resetDiagnosis } = useDiagnostic();

  // 2. Inicialización del estado leyendo LocalStorage
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
    } catch (error) {
      console.error("Error leyendo del localStorage:", error);
    }
    return [DEFAULT_MESSAGE];
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll al final al cambiar mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3. NUEVO: Guardar en LocalStorage cada vez que 'messages' cambie
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const processResponse = async (userInput: string) => {
    if (!userInput.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userInput,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const historyForApi = messages.slice(1).map((m) => ({
        role: m.role,
        parts: m.content,
      }));

      const responseText = await sendMessageToGemini(historyForApi, userInput);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: "err",
          role: "assistant",
          content:
            "⚠️ Error de conexión. Abre la consola (F12) para ver el detalle.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Función de Reinicio mejorada
  const handleReset = () => {
    if (
      confirm("¿Estás seguro de que deseas borrar toda la conversación actual?")
    ) {
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Borrar persistencia
      setMessages([DEFAULT_MESSAGE]); // Resetear estado visual
      resetDiagnosis(); // Resetear contexto global
      // No es necesario window.location.reload() si gestionamos bien el estado
    }
  };

  const handleGenerateReport = async () => {
    setIsAnalyzing(true);
    try {
      const transcript = messages
        .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
        .join("\n");
      const data = await generateDiagnosticJSON(transcript);

      if (data) {
        updateData(data);
        // Opcional: Limpiar el chat al generar reporte exitoso si así lo deseas
        // localStorage.removeItem(LOCAL_STORAGE_KEY);
        navigate("/reporte");
      } else {
        alert("Error: La IA no devolvió un JSON válido.");
      }
    } catch (e) {
      console.error(e);
      alert("Error al analizar los datos.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading && !isAnalyzing) processResponse(input);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center bg-muted/30 p-4 md:p-8">
      <Card className="flex h-full w-full max-w-4xl flex-col overflow-hidden shadow-xl border-primary/10">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-card/50 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Consultor IA
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </h2>
              <p className="text-xs text-muted-foreground">
                Metodología de Sistemas Blandos
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset} // Usamos la nueva función handleReset
              title="Reiniciar conversación"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>

            {messages.length > 2 && (
              <Button
                size="sm"
                onClick={handleGenerateReport}
                disabled={isLoading || isAnalyzing}
                className={cn(
                  "transition-all bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-md",
                  isAnalyzing && "opacity-80"
                )}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Analizando...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" /> Finalizar Diagnóstico
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 scroll-smooth bg-gradient-to-b from-background to-muted/20">
          <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex w-full gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border shadow-sm mt-1",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card bg-white/50 backdrop-blur"
                  )}
                >
                  {msg.role === "user" ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-5 py-3.5 text-sm shadow-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-card border text-card-foreground rounded-tl-none bg-white/50 backdrop-blur"
                  )}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground text-xs pl-14 animate-pulse">
                <Bot className="h-3 w-3" /> Analizando respuesta sistémica...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t bg-background/80 backdrop-blur p-4">
          <div className="max-w-3xl mx-auto relative flex items-end gap-2 rounded-xl border bg-muted/30 p-2 focus-within:ring-1 focus-within:ring-primary/30 transition-all shadow-inner">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe tu problema o responde a la IA..."
              className="flex-1 resize-none bg-transparent py-3 px-2 text-sm outline-none placeholder:text-muted-foreground max-h-[120px] min-h-[44px]"
              rows={1}
              disabled={isLoading || isAnalyzing}
            />
            <Button
              onClick={() => processResponse(input)}
              size="icon"
              className="mb-0.5 h-9 w-9 shadow-sm"
              disabled={!input.trim() || isLoading || isAnalyzing}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-muted-foreground">
              IA potenciada por Google Gemini Pro.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
