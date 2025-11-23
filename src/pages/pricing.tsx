'use client';
import NumberFlow from '@number-flow/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: {
      monthly: 'Gratis para siempre',
      yearly: 'Gratis para siempre',
    },
    description:
      'Para emprendedores o PyMEs que quieren diagnosticar sus primeros problemas.',
    features: [
      '3 Diagnósticos/mes',
      'Análisis básico con Problemología',
      'Identificación del tipo de problema',
      'Reporte básico descargable',
      'Soporte por email',
    ],
    cta: 'Comenzar gratis',
  },
  {
    id: 'pro',
    name: 'Profesional',
    price: {
      monthly: 45,
      yearly: 35,
    },
    description:
      'La opción ideal para PyMEs que buscan análisis profundos y continuos con MSB.',
    features: [
      'Diagnósticos ilimitados',
      'Modelado MSB completo',
      'Análisis del suprasistema y subsistemas',
      'Propuestas sistémicas generadas por IA',
      'Prioridad en soporte',
    ],
    cta: 'Suscribirse al Plan Pro',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: 'Consultar',
      yearly: 'Consultar',
    },
    description:
      'Para consultoras, grandes empresas y organizaciones que requieren personalización.',
    features: [
      'Implementación personalizada',
      'Modelado y paneles avanzados',
      'Capacitación y acompañamiento',
      'Integración con sistemas existentes',
      'Equipo de soporte dedicado',
    ],
    cta: 'Solicitar contacto',
  },
];

const PricingPage = () => {
  const [frequency, setFrequency] = useState<string>('monthly');

  return (
    <div className="not-prose flex flex-col gap-16 px-8 py-24 text-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="mb-0 font-semibold text-5xl tracking-tight">
          Precios simples y transparentes
        </h1>
        <p className="mx-auto mt-0 mb-0 max-w-2xl text-lg text-muted-foreground">
          Diagnósticos sistémicos para PyMEs con IA especializada en Problemología y MSB.
          Paga solo por lo que necesitas.
        </p>

        <Tabs defaultValue={frequency} onValueChange={setFrequency}>
          <TabsList>
            <TabsTrigger value="monthly">Mensual</TabsTrigger>
            <TabsTrigger value="yearly">
              Anual
              <Badge variant="secondary">20% off</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-8 grid w-full max-w-4xl gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              className={cn(
                'relative w-full text-left',
                plan.popular && 'ring-2 ring-primary'
              )}
              key={plan.id}
            >
              {plan.popular && (
                <Badge className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full">
                  Más elegido
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="font-medium text-xl">
                  {plan.name}
                </CardTitle>
                <CardDescription>
                  <p>{plan.description}</p>

                  {typeof plan.price[frequency as keyof typeof plan.price] ===
                  'number' ? (
                    <NumberFlow
                      className="font-medium text-foreground"
                      format={{
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      }}
                      suffix={`/mes, facturado ${frequency}.`}
                      value={
                        plan.price[
                          frequency as keyof typeof plan.price
                        ] as number
                      }
                    />
                  ) : (
                    <span className="font-medium text-foreground">
                      {plan.price[frequency as keyof typeof plan.price]}.
                    </span>
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-2">
                {plan.features.map((feature, index) => (
                  <div
                    className="flex items-center gap-2 text-muted-foreground text-sm"
                    key={index}
                  >
                    <BadgeCheck className="h-4 w-4" />
                    {feature}
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'secondary'}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
