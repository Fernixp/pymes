import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const modelId = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.0-flash-lite";
// 1. Validación de API Key
if (!apiKey) {
  console.error("❌ ERROR CRÍTICO: No se encontró VITE_GEMINI_API_KEY en las variables de entorno.");
}

const genAI = new GoogleGenerativeAI(apiKey || "NO_API_KEY");
const model = genAI.getGenerativeModel({ model: modelId });

const SYSTEM_INSTRUCTION = `
Actúa como un Consultor Experto en Teoría General de Sistemas y Metodología de Sistemas Blandos (MSB).
Tu objetivo es entrevistar al usuario para diagnosticar su empresa.
1. Sé empático pero profesional.
2. Haz preguntas una por una.
3. Identifica subsistemas (Ventas, Producción, RRHH, Compras).
4. NO des el diagnóstico completo todavía.
5. Mantén respuestas concisas.
`;

export const sendMessageToGemini = async (history: { role: string; parts: string }[], message: string) => {
  console.log(`🔵 [Gemini - ${modelId}] Enviando mensaje...`, { historyLength: history.length, message });

  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        {
          role: "model",
          parts: [{ text: "Entendido. Soy el consultor experto." }],
        },
        // Mapeamos el historial asegurándonos de que sea texto
        ...history.map(h => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.parts || "" }]
        }))
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    console.log("jq [Gemini] Respuesta recibida:", text.substring(0, 50) + "...");
    return text;

  } catch (error: any) {
    console.error("❌ [Gemini] Error detallado:", error);
    
    // Loguear detalles específicos si existen
    if (error.message) console.error("Mensaje de error:", error.message);
    if (error.status) console.error("Status HTTP:", error.status);
    
    throw error; // Re-lanzamos para que lo capture el componente
  }
};
export const generateDiagnosticJSON = async (fullConversation: string) => {
    console.log(`🔵 [Gemini - ${modelId}] Enviando mensaje...`); 
    const analysisModel = genAI.getGenerativeModel({ model: modelId });
    
    const prompt = `
      TRANSCRIPT DE CONVERSACIÓN:
      ${fullConversation}
  
      ---
      INSTRUCCIÓN DE SALIDA:
      Actúa como un sistema de extracción de datos. 
      Tu única tarea es generar un objeto JSON válido basado en la conversación anterior.
      NO incluyas bloques de código markdown (\`\`\`json), ni explicaciones, ni texto introductorio.
      SOLO devuelve el JSON crudo.
  
      Estructura requerida:
      {
        "companyName": "Nombre detectado o 'Empresa PyME'",
        "problemDescription": "Resumen ejecutivo del problema (max 30 palabras)",
        "problemType": "estructurado" | "semiestructurado" | "blando",
        "subsystems": { 
          "ventas": 1-5, 
          "compras": 1-5, 
          "produccion": 1-5, 
          "rrhh": 1-5 
        },
        "msbAnalysis": [
          { 
            "current": "Descripción breve de la situación actual (problemática)", 
            "ideal": "Descripción breve del modelo conceptual ideal" 
          }
        ],
        "entropyLevel": 0-100
      }
    `;
    
    try {
      const result = await analysisModel.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Limpieza robusta
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      // Validación rápida antes de parsear
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        text = text.substring(jsonStart, jsonEnd + 1);
      }
  
      console.log("✅ [Gemini] JSON generado correctamente");
      return JSON.parse(text);
    } catch (error) {
      console.error("❌ [Gemini] Error generando JSON:", error);
      return null;
    }
  };