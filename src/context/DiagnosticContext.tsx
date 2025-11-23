import { createContext, useContext, useState, type ReactNode } from "react";


// Definimos la estructura de datos basada en tus requisitos sistémicos
export interface DiagnosticData {
  companyName: string;
  problemDescription: string;
  problemType: 'estructurado' | 'semiestructurado' | 'blando'; // Tipología
  subsystems: {
    ventas: number;
    compras: number;
    produccion: number;
    rrhh: number;
  };
  msbAnalysis: {
    current: string; // Realidad
    ideal: string;   // Modelo ideal
  }[];
  entropyLevel: number; // 0 a 100
}

interface DiagnosticContextType {
  data: DiagnosticData;
  updateData: (partialData: Partial<DiagnosticData>) => void;
  resetDiagnosis: () => void;
}

// Estado inicial vacío
const defaultData: DiagnosticData = {
  companyName: "Empresa No Definida",
  problemDescription: "Sin diagnóstico",
  problemType: "semiestructurado",
  subsystems: { ventas: 0, compras: 0, produccion: 0, rrhh: 0 },
  msbAnalysis: [],
  entropyLevel: 0,
};

const DiagnosticContext = createContext<DiagnosticContextType | undefined>(undefined);

export const DiagnosticProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DiagnosticData>(defaultData);

  const updateData = (partialData: Partial<DiagnosticData>) => {
    setData((prev) => ({ ...prev, ...partialData }));
  };

  const resetDiagnosis = () => {
    setData(defaultData);
  };

  return (
    <DiagnosticContext.Provider value={{ data, updateData, resetDiagnosis }}>
      {children}
    </DiagnosticContext.Provider>
  );
};

export const useDiagnostic = () => {
  const context = useContext(DiagnosticContext);
  if (!context) {
    throw new Error("useDiagnostic debe usarse dentro de un DiagnosticProvider");
  }
  return context;
};