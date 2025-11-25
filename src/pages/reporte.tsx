import { useDiagnostic } from "@/context/DiagnosticContext"; // <--- Importar
import {FileJson, Info, FileText, BarChart3, GitCompare, Lightbulb, Download, Home, TrendingDown, Sparkles, Brain, TrendingUp, Scale } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DiagnosticPDF } from "@/components/report/PDFDocument";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function Reporte() {
  const { data } = useDiagnostic(); // <--- Usar datos reales del contexto

  // Preparamos datos para los gráficos
  const subsystemsData = [
    { subsystem: 'Ventas', value: data.subsystems.ventas },
    { subsystem: 'Compras', value: data.subsystems.compras },
    { subsystem: 'Prod.', value: data.subsystems.produccion },
    { subsystem: 'RRHH', value: data.subsystems.rrhh },
  ];
const handleExportJSON = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `data-sistemica-${data.companyName.replace(/\s+/g, '-').toLowerCase()}.json`;
    link.click();
  };

  // Intervenciones dinámicas con Tipos de Bucles Sistémicos
  const interventions = [
    data.problemType === 'blando' 
      ? { 
          area: 'RRHH', 
          text: 'Talleres de comunicación y definición de roles (MSB).', 
          impact: 'Alto',
          loop: 'Refuerzo (R)' // Bucle positivo: mejora comunicación -> mejora clima -> mejora comunicación
        }
      : { 
          area: 'Operaciones', 
          text: 'Estandarización de procesos productivos.', 
          impact: 'Alto',
          loop: 'Compensación (B)' // Bucle negativo: detecta error -> corrige -> estabilidad
        },
    { 
      area: 'Sistémica', 
      text: 'Establecer reuniones de retroalimentación semanal.', 
      impact: 'Medio',
      loop: 'Compensación (B)' // Mecanismo de control para mantener el rumbo
    },
    data.entropyLevel > 60 
      ? { 
          area: 'Gestión', 
          text: 'Plan de choque para reducción de entropía.', 
          impact: 'Crítico',
          loop: 'Compensación (B)' 
        }
      : { 
          area: 'Control', 
          text: 'Monitorización de KPIs básicos.', 
          impact: 'Bajo',
          loop: 'Refuerzo (R)' // Optimización continua
        }
  ];
  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Diagnóstico Sistémico Finalizado</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{data.companyName}</h1>
          <p className="text-muted-foreground max-w-2xl">{data.problemDescription}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/chat-ai">
              <Home className="mr-2 h-4 w-4" />
              Nuevo Diagnóstico
            </Link>
          </Button>
          <Button variant="secondary" onClick={handleExportJSON} title="Exportar datos para portabilidad">
             <FileJson className="mr-2 h-4 w-4" />
             JSON
          </Button>
          {/* --- BOTÓN DE DESCARGA PDF --- */}
          <PDFDownloadLink
            document={<DiagnosticPDF data={data} />}
            fileName={`reporte-${data.companyName.replace(/\s+/g, '-').toLowerCase()}.pdf`}
          >
            {/* Usamos una render prop para saber si está cargando */}
            {({ loading }) => (
              <Button disabled={loading}>
                <Download className="mr-2 h-4 w-4" />
                {loading ? 'Generando...' : 'Descargar PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <Separator />

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={data.entropyLevel > 70 ? "border-destructive/50" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Entropía Organizacional</CardTitle>
              
              {/* NUEVO: Popover explicativo (El Escudo) */}
              <Popover>
                <PopoverTrigger>
                  <Info className="h-3 w-3 text-muted-foreground hover:text-primary cursor-help transition-colors" />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Cálculo Heurístico</h4>
                    <p className="text-xs text-muted-foreground text-justify">
                      Este indicador no es una medida física. Es una <strong>proyección algorítmica</strong> basada en la detección de ambigüedades, contradicciones y falta de procesos definidos en el lenguaje natural del usuario.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold", data.entropyLevel > 70 ? "text-destructive" : "")}>
              {data.entropyLevel.toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">Nivel de desorden sistémico</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tipología de Problema</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={data.problemType === 'blando' ? 'secondary' : 'outline'} className="text-lg capitalize mb-1">
              {data.problemType}
            </Badge>
            <p className="text-xs text-muted-foreground">Según Checkland</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subsistemas Críticos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subsystemsData.filter(s => s.value >= 4).length}</div>
            <p className="text-xs text-muted-foreground">Áreas con impacto alto ({'>'}3)</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Impacto en Subsistemas</CardTitle>
            <CardDescription>Afectación (1-5) según tu entrevista.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subsystemsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="subsystem" className="text-xs" />
                <YAxis className="text-xs" domain={[0, 5]} />
                <Tooltip 
                   contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Radar Holístico</CardTitle>
            <CardDescription>Visualización del desbalance del sistema.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subsystemsData}>
                <PolarGrid className="stroke-muted" />
                <PolarAngleAxis dataKey="subsystem" className="text-xs fill-muted-foreground" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} className="text-xs" />
                <Radar name="Impacto" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Metodología de Sistemas Blandos (MSB) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <GitCompare className="h-5 w-5 text-primary" />
              <CardTitle>Comparación MSB (Realidad vs Ideal)</CardTitle>
            </div>
            <CardDescription>Brecha detectada en la entrevista.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.msbAnalysis.length > 0 ? (
              data.msbAnalysis.map((gap, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border p-4 rounded-lg bg-card/50">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-red-400"></div> Realidad Actual
                    </span>
                    <p className="text-foreground leading-relaxed pl-3 border-l-2 border-red-400/20">{gap.current}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                       <div className="h-2 w-2 rounded-full bg-green-400"></div> Modelo Ideal
                    </span>
                    <p className="text-foreground leading-relaxed pl-3 border-l-2 border-green-400/20">{gap.ideal}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No hay datos de análisis comparativo.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Intervenciones */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <CardTitle>Intervenciones Sistémicas</CardTitle>
            </div>
            <CardDescription>Acciones para reducir la entropía.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {interventions.map((item, i) => (
              <div key={i} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-[10px] uppercase">{item.area}</Badge>
                    
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "text-[10px] border gap-1", // Agregamos gap-1 para separar icono de texto
                        item.loop.includes('(R)') 
                          ? "border-green-500/50 text-green-700 bg-green-50 dark:bg-green-900/20" 
                          : "border-blue-500/50 text-blue-700 bg-blue-50 dark:bg-blue-900/20"
                      )}
                    >
                      {item.loop.includes('(R)') ? (
                        <TrendingUp className="h-3 w-3" /> 
                      ) : (
                        <Scale className="h-3 w-3" />
                      )}
                      {item.loop}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{item.text}</p>
                </div>
                <Badge className={cn(
                  item.impact === 'Alto' || item.impact === 'Crítico' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {item.impact}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3 items-start">
        <Brain className="h-5 w-5 mt-0.5 text-primary" />
        <p className="text-sm text-foreground/80">
          <strong>Análisis IA:</strong> El sistema presenta un nivel de entropía del {data.entropyLevel.toFixed(0)}%. Se recomienda priorizar los subsistemas marcados en el radar para estabilizar el suprasistema organizacional.
        </p>
      </div>
    </div>
  );
}

// Helper para concatenar clases (debe estar en tu utils, pero por si acaso)
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}