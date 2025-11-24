import { createContext, useContext, useState, useEffect, type ReactNode } from "react"; // <--- IMPORTANTE: Agregamos useEffect

// Definimos la estructura de datos basada en tus requisitos sistémicos
export interface DiagnosticData {
  companyName: string;
  problemDescription: string;
  problemType: 'estructurado' | 'semiestructurado' | 'blando';
  subsystems: {
    ventas: number;
    compras: number;
    produccion: number;
    rrhh: number;
  };
  msbAnalysis: {
    current: string;
    ideal: string;
  }[];
  entropyLevel: number;
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

// 1. Definimos la clave para LocalStorage
const DIAGNOSTIC_STORAGE_KEY = "pymes_diagnostic_data_v1";

const DiagnosticContext = createContext<DiagnosticContextType | undefined>(undefined);

export const DiagnosticProvider = ({ children }: { children: ReactNode }) => {
  // 2. Inicialización perezosa: Leemos del localStorage al arrancar
  const [data, setData] = useState<DiagnosticData>(() => {
    try {
      const savedData = localStorage.getItem(DIAGNOSTIC_STORAGE_KEY);
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error("Error recuperando datos del diagnóstico:", error);
    }
    return defaultData;
  });

  // 3. Efecto para guardar cambios automáticamente
  useEffect(() => {
    localStorage.setItem(DIAGNOSTIC_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (partialData: Partial<DiagnosticData>) => {
    setData((prev) => ({ ...prev, ...partialData }));
  };

  // 4. Modificamos el reset para limpiar también el almacenamiento
  const resetDiagnosis = () => {
    setData(defaultData);
    localStorage.removeItem(DIAGNOSTIC_STORAGE_KEY);
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