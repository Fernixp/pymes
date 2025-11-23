import { useState } from 'react';
import { FileText, BarChart3, GitCompare, Lightbulb, Download, Home, TrendingDown, Sparkles, Brain } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const MOCK_DATA = {
  companyName: "Empresa Cliente",
  problem: "Desorganización en procesos y baja moral",
  problemType: "blando",
  subsystems: {
    ventas: 4,
    compras: 2,
    produccion: 1,
    rrhh: 5
  },
  currentActivities: ["Proceso manual", "Comunicación informal", "Sin métricas"],
  idealActivities: ["CRM Automatizado", "Canales definidos", "Dashboard en tiempo real"]
};

export default function Reporte() {
  const [data] = useState(MOCK_DATA);

  const subsystemsData = [
    { subsystem: 'Ventas', value: data.subsystems.ventas },
    { subsystem: 'Compras', value: data.subsystems.compras },
    { subsystem: 'Producción', value: data.subsystems.produccion },
    { subsystem: 'RRHH', value: data.subsystems.rrhh },
  ];

  const totalImpact = subsystemsData.reduce((sum, item) => sum + item.value, 0);
  const avgImpact = totalImpact / subsystemsData.length;
  const entropyLevel = (avgImpact / 5) * 100;

  const interventions = [
    ...(data.subsystems.ventas >= 3 ? [{ area: 'Ventas', text: 'Implementar CRM y seguimiento.', impact: 'Alto' }] : []),
    ...(data.subsystems.rrhh >= 3 ? [{ area: 'RRHH', text: 'Capacitación y mejora de clima.', impact: 'Alto' }] : []),
    { area: 'Sistémica', text: 'Reuniones de retroalimentación.', impact: 'Medio' },
    { area: 'Control', text: 'Tablero de indicadores.', impact: 'Medio' },
  ];

  const msbGaps = data.currentActivities.map((current, i) => ({
    current,
    ideal: data.idealActivities[i] || "No definido",
    hasGap: current !== data.idealActivities[i]
  }));

  // --- Render ---
  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* Header Minimalista */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Diagnóstico IA Generado</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{data.companyName}</h1>
          <p className="text-muted-foreground">{data.problem}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/chat-ai">
              <Home className="mr-2 h-4 w-4" />
              Nuevo
            </Link>
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entropía Organizacional</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entropyLevel.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">Nivel de desorden sistémico</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tipología</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{data.problemType}</div>
            <p className="text-xs text-muted-foreground">Clasificación Problemológica</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subsistemas Críticos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subsystemsData.filter(s => s.value >= 3).length}</div>
            <p className="text-xs text-muted-foreground">Áreas con impacto alto</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Impacto por Subsistema</CardTitle>
            <CardDescription>Análisis de afectación por área.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subsystemsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="subsystem" className="text-xs" tickLine={false} axisLine={false} />
                <YAxis className="text-xs" tickLine={false} axisLine={false} domain={[0, 5]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: 'var(--radius)' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Radar Sistémico</CardTitle>
            <CardDescription>Visualización holística del problema.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subsystemsData}>
                <PolarGrid className="stroke-muted" />
                <PolarAngleAxis dataKey="subsystem" className="text-xs fill-muted-foreground" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} className="text-xs fill-muted-foreground" />
                <Radar name="Impacto" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Comparativa MSB y Soluciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Comparación */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <GitCompare className="h-5 w-5" />
              <CardTitle>Comparación MSB</CardTitle>
            </div>
            <CardDescription>Brecha entre Realidad vs. Situación Ideal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {msbGaps.map((gap, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 text-sm border p-3 rounded-md">
                <div>
                  <span className="font-semibold block mb-1">Realidad:</span>
                  <span className="text-muted-foreground">{gap.current}</span>
                </div>
                <div>
                  <span className="font-semibold block mb-1">Ideal:</span>
                  <span className="text-foreground">{gap.ideal}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Intervenciones */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              <CardTitle>Intervenciones Propuestas</CardTitle>
            </div>
            <CardDescription>Acciones recomendadas por la IA.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {interventions.map((item, i) => (
              <div key={i} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary">{item.area}</Badge>
                  </div>
                  <p className="text-sm">{item.text}</p>
                </div>
                <Badge variant={item.impact === 'Alto' ? 'destructive' : 'outline'}>
                  {item.impact}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/50 border rounded-lg p-4 flex gap-3 items-start">
        <Brain className="h-5 w-5 mt-0.5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Este reporte es un modelo preliminar basado en la información proporcionada. Se recomienda la validación humana antes de la implementación.
        </p>
      </div>
    </div>
  );
}