import React, { useState } from "react";
import './CenterPanel.css'; 
import { uploadAndDetectSonar, ApiResponse } from "../api";
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip } from 'react-leaflet';
import { demoPins, surveyPath } from '../data';
import 'leaflet/dist/leaflet.css';

interface CenterPanelProps {
  onDetectionsUpdate?: (data: ApiResponse | null) => void;
  detectionData?: ApiResponse | null;
}

export default function CenterPanel({ onDetectionsUpdate, detectionData }: CenterPanelProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ApiResponse | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [modelChoice, setModelChoice] = useState('pipe');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setLoading(true);
    setServerError(null);
    setResults(null);

    try {
      const data = await uploadAndDetectSonar(file, modelChoice);
      setResults(data);
      if (onDetectionsUpdate) onDetectionsUpdate(data);
    } catch (err) {
      console.error("Backend Connection Error:", err);
      setServerError(err instanceof Error ? err.message : "Detection request failed. Check the Render backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setImagePreview(null);
    setResults(null);
    setServerError(null);
    if (onDetectionsUpdate) onDetectionsUpdate(null);
    // Reset the file input
    const fileInput = document.getElementById("sonar-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const mapPins = detectionData
    ? detectionData.detections.map((detection, index) => ({
      id: detection.detection_id,
      lat: detection.location.latitude,
      lng: detection.location.longitude,
      classification: detection.classification,
      color: detection.confidence_score >= 85 ? 'red' : detection.confidence_score >= 70 ? 'amber' : 'green',
      index,
    }))
    : demoPins;
  const mapPath: [number, number][] = mapPins.map(pin => [pin.lat, pin.lng]);

  return (
    <div className="center-panel-container">
      <div className="sonar-console card">
        <div className="console-header">
          <div>
            <div className="hdr">Sonar Feed <span className="sector">[Sector 4]</span></div>
            <div className="sub">LIVE SYNTHETIC APERTURE SONAR / AUV01</div>
          </div>
          <span className="live-status"><span className="dot g" /> ACTIVE</span>
        </div>
        <div className="console-stage">
          <div className="stage-water" />
          <div className="stage-grid" />
          <div className="stage-sweep" />
          <div className="stage-crosshair" />
          <div className="stage-readout">
            <span>DEPTH: <b>42.6M</b></span>
            <span>FREQ: <b>450KHZ</b></span>
            <span>PITCH: <b>+2.1°</b></span>
          </div>
          <div className="sonar-contact contact-a"><span>DEB-001</span></div>
          <div className="sonar-contact contact-b"><span>DEB-004</span></div>
          <div className="scanline" />
          <div className="stage-footer"><span>RANGE 80M</span><span>GAIN 72%</span><span>MODE: SECTOR SCAN</span></div>
        </div>
      </div>

      <div className="map-card card">
        <div className="map-heading"><span className="hdr">Tactical Map</span><span className="sub">TRACK: AUV01 · INCOIS DRIFT MODEL</span></div>
        <MapContainer center={[15.42, 73.52]} zoom={9} zoomControl={false} attributionControl={false} className="map-wrap">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline positions={mapPath.length > 1 ? mapPath : surveyPath} pathOptions={{ color: '#4dd4e8', weight: 2, opacity: 0.8, dashArray: '5 6' }} />
          {mapPins.map(pin => (
            <CircleMarker key={pin.id} center={[pin.lat, pin.lng]} radius={6} pathOptions={{ color: pin.color === 'red' ? '#ff5c5c' : pin.color === 'amber' ? '#ffb13d' : '#3edc81', fillOpacity: 0.9, weight: 2 }}>
              <Tooltip direction="top" offset={[0, -5]}>{pin.id} · {pin.classification}</Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
        <div className="map-overlay"><span className="map-chip"><span className="dot g" /> AUV01 SURVEYING</span><span>15.350° N · 73.420° E</span></div>
      </div>
      
      {/* Upload & Clear Controls */}
      <div className="upload-controls">
        <input
          type="file" 
          id="sonar-upload" 
          accept="image/*" 
          onChange={handleFileUpload} 
          className="upload-input"
        />
        <label className="upload-button" htmlFor="sonar-upload">Upload Image</label>
        <select className="model-select" value={modelChoice} onChange={event => setModelChoice(event.target.value)} aria-label="Detection model">
          <option value="pipe">Pipe Model</option>
        </select>
        <button className="clear-button" onClick={handleClear} disabled={!imagePreview}>Clear Image</button>
      </div>

      {/* Status Messages */}
      {loading && <h3 className="scan-message">Scanning for Marine Debris...</h3>}
      {serverError && <h3 className="error-message">{serverError}</h3>}

      {/* Image & Bounding Boxes */}
      {imagePreview && (
        <div className="uploaded-image">
          <img 
            src={imagePreview} 
            alt="Sonar Feed" 
            className="uploaded-image-img"
          />

          {/* Render Detections if successful */}
          {results && results.detections.map((det) => {
            const [x, y, w, h] = det.bbox;
            const scaleX = 100 / results.image_dimensions.width;
            const scaleY = 100 / results.image_dimensions.height;

            return (
              <div
                key={det.detection_id}
                style={{
                  position: 'absolute',
                  left: `${x * scaleX}%`,
                  top: `${y * scaleY}%`,
                  width: `${w * scaleX}%`,
                  height: `${h * scaleY}%`,
                  border: '2px solid #22c55e',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  pointerEvents: 'none'
                }}
              >
                <span className="detection-label">
                  {det.classification.toUpperCase()} - {det.confidence_score}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}