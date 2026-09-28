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

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://aquascan-backend.onrender.com";

export async function uploadAndDetectSonar(file: File, model = "both"): Promise<ApiResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("model", model);

  const response = await fetch(`${API_BASE_URL}/api/detect`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Inference server responded with code ${response.status}`);
  }

  return response.json();
}