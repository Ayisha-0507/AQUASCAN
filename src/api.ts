export interface DetectionLocation {
  latitude: number;
  longitude: number;
}

export interface DetectionResult {
  detection_id: string;
  timestamp: string;
  classification: string;
  confidence_score: number;
  raw_confidence: number;
  location: DetectionLocation;
  bbox: [number, number, number, number]; // [x, y, width, height]
  estimated_height_meters: number;
  has_acoustic_shadow: boolean;
  model_source?: string;
}

export interface DetectionAlert {
  id: string;
  severity: "CRITICAL" | "WARNING";
  message: string;
  location: DetectionLocation;
  confidence: number;
}

export interface ApiResponse {
  filename: string;
  image_dimensions: { width: number; height: number };
  count: number;
  detections: DetectionResult[];
  alerts: DetectionAlert[];
}

declare global {
  interface ImportMeta {
    readonly env: {
      readonly VITE_API_URL?: string;
    };
  }
}

// Set VITE_API_URL in Vercel to your exact Render URL (no trailing slash), then redeploy.
const API_BASE_URL = (import.meta.env.VITE_API_URL || "https://aquascan-backend.onrender.com").replace(/\/+$/, "");

export async function uploadAndDetectSonar(file: File, model = "pipe"): Promise<ApiResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("model", model);

  // Render free tier can take 30-60s to wake up, so allow a long timeout
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 120000);

  try {
    const response = await fetch(`${API_BASE_URL}/api/detect`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Inference server responded with ${response.status}: ${detail || response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("Server took too long to respond. It may be waking up, try again in a minute.");
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}