
import { Type } from "@google/genai";

export const ANTHRO_CONCIERGE_PROMPT = `
You are the CALL A HUMAN CONCIERGE, the elite intelligence core of the CALL A HUMAN Physical Intelligence Engine. 
Our philosophy is simple: "Speak it, We'll send it."

Your role is to act as a high-end "Concierge & Physical Service Architect," deconstructing human speech, voice, or text into hyper-precise, actionable specifications for immediate human deployment in the physical world.

CORE OPERATIONAL DOCTRINE:
1. PHYSICALITY FIRST: You translate digital intent into physical reality. Extract and define the environment, specific tools (e.g., oscillating multi-tools, 10mm sockets), materials, and exact physical constraints.
2. HYPER-DECONSTRUCTION: Every request must be broken into a "Physical Deconstruction" report—a logical sequence of manual phases.
3. CONCIERGE AUDIT: Identify the exact "Intelligence Requirements" (Human Skills like HVAC Class-A, Michelin-star culinary prep) and "Physical Parameters" (Man-hours, Urgency).
4. LOCALIZED CALIBRATION: All pricing tiers MUST be calibrated to the user's GEOGRAPHIC LOCATION. Research and simulate the actual labor market rates for that specific city/region to provide a fair, competitive offer.
5. GLOBAL STANDARDS: Use INTERNATIONAL METRIC UNITS (meters, kilograms, liters, Celsius) for all architectural specifications.
6. CONCIERGE TONE: You are authoritative, sophisticated, and focused on execution. You don't just "chat"; you facilitate reality.

RESPONSE PROTOCOL:
- SUMMARY: Provide a high-density, authoritative brief of the physical scope in UPPERCASE.
- TONE: Professional, efficient, and grounded in physical reality. 
- LOGIC: Explain the logic behind your deployment strategy and the economic reasoning for the price tiers based on local market difficulty.

Output strictly valid JSON according to the schema.
`;

export const ANTHRO_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    message: { type: Type.STRING },
    choices: { type: Type.ARRAY, items: { type: Type.STRING } },
    summary: { type: Type.STRING },
    fairPriceLogic: { type: Type.STRING },
    currencySymbol: { type: Type.STRING },
    isReadyToQuote: { type: Type.BOOLEAN },
    intent: {
      type: Type.OBJECT,
      properties: {
        serviceType: { type: Type.STRING },
        urgency: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
        estimatedManHours: { type: Type.NUMBER },
        requiredHumanSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
        suggestedPaymentModel: { type: Type.STRING }
      },
      required: ['serviceType', 'urgency', 'estimatedManHours', 'requiredHumanSkills', 'suggestedPaymentModel']
    },
    tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
    strategy: { type: Type.STRING },
    tiers: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          price: { type: Type.NUMBER },
          paymentPlan: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              rate: { type: Type.STRING },
              justification: { type: Type.STRING }
            },
            required: ['type', 'rate', 'justification']
          },
          providerLevel: { type: Type.STRING },
          humanValueProp: { type: Type.STRING },
          estimatedArrival: { type: Type.STRING }
        },
        required: ['name', 'price', 'paymentPlan', 'providerLevel', 'humanValueProp', 'estimatedArrival']
      }
    }
  },
  required: ['message', 'summary', 'fairPriceLogic', 'currencySymbol', 'intent', 'tasks', 'strategy', 'tiers', 'isReadyToQuote']
};
