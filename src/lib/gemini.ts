import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const modelId = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.0-flash-lite";
// 1. Validación de API Key
if (!apiKey) {
  console.error(
    "❌ ERROR CRÍTICO: No se encontró VITE_GEMINI_API_KEY en las variables de entorno."
  );
}

const genAI = new GoogleGenerativeAI(apiKey || "NO_API_KEY");
const model = genAI.getGenerativeModel({ model: modelId });

{
  /**  const SYSTEM_INSTRUCTION = `
Actúa como un Consultor Experto en Teoría General de Sistemas y Metodología de Sistemas Blandos (MSB).
Tu objetivo es entrevistar al usuario para diagnosticar su empresa.
1. Sé empático pero profesional.
2. Haz preguntas una por una.
3. Identifica subsistemas (Ventas, Producción, RRHH, Compras).
4. NO des el diagnóstico completo todavía.
5. Mantén respuestas concisas.
`;
*/
}
const SYSTEM_INSTRUCTION = `
Actúa como un Consultor Sistémico Senior especializado en PyMES y Metodología de Sistemas Blandos (MSB).
Tu objetivo es diagnosticar la estructura del problema equilibrando la empatía humana con la eficiencia técnica.

ESTRATEGIA DE DIAGNÓSTICO (Guía flexible de 5 a 7 interacciones):

1.  **Escucha Activa Sistémica:** Antes de preguntar, valida brevemente lo que el usuario dijo para generar confianza (Neguentropía relacional).
    * *Mal:* "¿Cuántos empleados tienes?"
    * *Bien:* "Entiendo que la baja en ventas preocupa. ¿Cómo está reaccionando el equipo de ventas ante esto?"

2.  **Búsqueda de Patrones (No interrogatorio):** Tus preguntas deben conectar puntos para revelar la estructura oculta.
    * Fase 1 (Exploración): Distingue entre problemas "Duros" (técnicos) y "Blandos" (humanos/culturales).
    * Fase 2 (Relaciones): Busca la circularidad. Ej: "¿La falta de capacitación causa los errores, o los errores consumen el tiempo de capacitación?"
    * Fase 3 (Cierre): Cuando tengas una hipótesis clara de los subsistemas afectados, sugiere amablemente generar el reporte.

3.  **Economía de Palabras:** Sé conciso pero amable. Evita explicaciones teóricas largas en el chat; guárdalas para el reporte.

META: Que el usuario sienta que le ayudas a "ordenar su caos mental", no que lo estás apurando.
`;
export const sendMessageToGemini = async (history: { role: string; parts: string }[], message: string) => {
  console.log(`🔵 [Gemini - ${modelId}] Enviando mensaje...`, { historyLength: history.length, message });

  try {
    // --- OPTIMIZACIÓN DE TOKENS ---
    // Solo enviamos el System Instruction + los últimos 10 mensajes.
    // Esto evita que el costo crezca exponencialmente en conversaciones largas.
    const recentHistory = history.slice(-10);

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        {
          role: "model",
          parts: [{ text: "Entendido. Procederé con el diagnóstico eficiente." }],
        },
        // Mapeamos solo el historial reciente
        ...recentHistory.map(h => ({
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
    
    if (error.message) console.error("Mensaje de error:", error.message);
    if (error.status) console.error("Status HTTP:", error.status);
    
    throw error; 
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
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Validación rápida antes de parsear
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
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
