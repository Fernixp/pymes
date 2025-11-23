import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Loader2, Paperclip, Mic } from "lucide-react";
import { Card } from "@/components/ui/card";

// --- Tipos ---
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// --- Componentes Internos (Simulando lo que instalarías) ---

const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";
  
  return (
    <div className={cn(
      "flex w-full gap-3 p-4",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      {/* Avatar */}
      <div className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-sm",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Contenido del mensaje */}
      <div className={cn(
        "flex max-w-[80%] flex-col gap-2 rounded-2xl px-4 py-3 shadow-sm text-sm",
        isUser 
          ? "bg-primary text-primary-foreground rounded-tr-none" 
          : "bg-card border text-card-foreground rounded-tl-none"
      )}>
        <div className="whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  );
};

// --- Página Principal del Chat ---

export default function ChatAi() {
  // Estado
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "¡Hola! Soy PymeBot. Puedo ayudarte a diagnosticar problemas en tu empresa usando metodología sistémica. ¿Qué está pasando?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Referencias para el scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll al nuevo mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Manejador de envío
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulación de respuesta de IA (Delay + Streaming fake)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Entiendo. Basado en la Problemología, ¿dirías que este es un problema 'duro' (técnico, definido) o 'blando' (social, político, mal definido)?",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  // Ajuste automático de altura del textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Resetear altura para calcular correctamente al borrar
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Enviar con Enter (sin Shift)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center bg-muted/30 p-4 md:p-8">
      {/* Contenedor Principal */}
      <Card className="flex h-full w-full max-w-4xl flex-col overflow-hidden shadow-xl ring-1 ring-border/50">
        
        {/* Header del Chat */}
        <div className="flex items-center justify-between border-b bg-card/50 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Diagnóstico IA</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                En línea - Modelo MSB v1.0
              </p>
            </div>
          </div>
        </div>

        {/* Área de Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
          <div className="flex flex-col gap-2">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            
            {/* Indicador de "Escribiendo..." */}
            {isLoading && (
              <div className="flex w-full gap-3 p-4">
                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted border shadow-sm">
                    <Bot className="h-4 w-4" />
                 </div>
                 <div className="bg-card border px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Analizando...</span>
                    <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Área de Input (Prompt) */}
        <div className="border-t bg-background p-4">
          <div className="relative flex items-end gap-2 rounded-xl border bg-muted/30 p-2 shadow-sm focus-within:ring-1 focus-within:ring-ring">
            
            {/* Botones de adjuntos (Visuales) */}
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground shrink-0 mb-0.5">
              <Paperclip className="h-5 w-5" />
            </Button>

            {/* Textarea Auto-resizable */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Describe el problema aquí..."
              className="flex-1 resize-none bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground max-h-[150px] overflow-y-auto"
              rows={1}
            />

            {/* Botón de Enviar */}
            <div className="flex items-center gap-2 pb-0.5">
              {input.trim() ? (
                <Button 
                  onClick={() => handleSubmit()} 
                  size="icon" 
                  className="h-8 w-8 rounded-lg transition-all duration-200"
                  disabled={isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              ) : (
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Mic className="h-4 w-4" />
                 </Button>
              )}
            </div>
          </div>
          <div className="mt-2 text-center text-[10px] text-muted-foreground">
            La IA puede cometer errores. Verifica la información importante.
          </div>
        </div>

      </Card>
    </div>
  );
}