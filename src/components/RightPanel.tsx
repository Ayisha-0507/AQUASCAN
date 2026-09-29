import { activeObject } from '../data'
import { useState } from 'react'
import { ApiResponse } from '../api'
import './RightPanel.css'

interface RightPanelProps {
  detectionData?: ApiResponse | null;
}

export default function RightPanel({ detectionData }: RightPanelProps) {
  const selectedDetection = detectionData?.detections[0]
  const o = selectedDetection ? {
    ...activeObject,
    id: selectedDetection.detection_id,
    classification: selectedDetection.classification.replace(/_/g, ' ').toUpperCase(),
    risk: selectedDetection.confidence_score >= 85 ? 'High' : selectedDetection.confidence_score >= 70 ? 'Medium' : 'Low',
    confidence: selectedDetection.confidence_score,
    reasoning: [
      `${selectedDetection.model_source || 'Selected model'} detection confidence: ${selectedDetection.raw_confidence}%.`,
      selectedDetection.has_acoustic_shadow ? `Acoustic shadow confirmed; estimated height ${selectedDetection.estimated_height_meters}m.` : 'No acoustic shadow confirmed for this object.',
    ],
    sources: [
      { k: 'Model', v: selectedDetection.model_source || 'AquaScan' },
      { k: 'Timestamp', v: selectedDetection.timestamp },
      { k: 'Lat / Lon', v: `${selectedDetection.location.latitude}° N · ${selectedDetection.location.longitude}° E` },
      { k: 'Height', v: `${selectedDetection.estimated_height_meters} m` },
    ],
  } : activeObject
  const [visualMode, setVisualMode] = useState<'heatmap' | '3d'>('heatmap')
  const liveDetections = detectionData?.detections || []
  const heatPoints = liveDetections.map((detection, index) => {
    const latitudes = liveDetections.map(item => item.location.latitude)
    const longitudes = liveDetections.map(item => item.location.longitude)
    const latRange = Math.max(...latitudes) - Math.min(...latitudes) || 1
    const lonRange = Math.max(...longitudes) - Math.min(...longitudes) || 1
    return {
      detection,
      index,
      left: 12 + ((detection.location.longitude - Math.min(...longitudes)) / lonRange) * 76,
      top: 78 - ((detection.location.latitude - Math.min(...latitudes)) / latRange) * 58,
    }
  })
  return (
    <aside className="right">
      {/* Object Analysis */}
      <section className="card r-card">
        <div className="hdr">Object Analysis ({o.id})</div>
        <div className="split">
          <div className="mini">
            <span className="mt">AI Classification Results</span>
            <span className="class-big">{o.classification}</span>
            <div className="kv"><span>Risk Level</span><span className="v red">{o.risk}</span></div>
            <div className="kv"><span>Confidence</span><span className="v">{o.confidence}%</span></div>
          </div>
          <div className="mini">
            <span className="mt">Explainable Debris AI</span>
            <div className="reason-list">
              {o.reasoning.map((r, i) => <div key={i} className="reason">{r}</div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Benefits */}
      <section className="card r-card">
        <div>
          <div className="hdr">Impact & Benefits</div>
          <div className="sub">RECOVERY IMPACT ASSESSMENT</div>
        </div>
        {o.impact.map((row, i) => (
          <div key={i} className="impact-row">
            <span className={`ic ${row.color}`}>
              {row.icon === 'ok'
                ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/></svg>
              }
            </span>
            <span className={`t ${row.color}`}>{row.text}</span>
          </div>
        ))}
      </section>

      {/* Data Sources */}
      <section className="card r-card">
        <div className="hdr">Data Sources</div>
        {o.sources.map(s => (
          <div key={s.k} className="src-row">
            <span className="k">{s.k}</span>
            <span className="v">{s.v}</span>
          </div>
        ))}
        <div className="verified">{o.verified}</div>
      </section>

      <section className="card r-card spatial-card">
        <div className="spatial-heading">
          <div><div className="hdr">Spatial Intelligence</div><div className="sub">SECTOR 4 / OBJECT PROXIMITY MODEL</div></div>
          <div className="spatial-tabs">
            <button className={visualMode === 'heatmap' ? 'active' : ''} onClick={() => setVisualMode('heatmap')}>Heatmap</button>
            <button className={visualMode === '3d' ? 'active' : ''} onClick={() => setVisualMode('3d')}>3D View</button>
          </div>
        </div>
        {visualMode === 'heatmap' ? (
          <div className="heatmap-view">
            <div className="heatmap-grid" />
            {detectionData ? heatPoints.length ? heatPoints.map(point => <span key={point.detection.detection_id} className="heat-point" style={{ left: `${point.left}%`, top: `${point.top}%`, borderColor: point.detection.confidence_score >= 85 ? 'var(--red)' : point.detection.confidence_score >= 70 ? 'var(--amber)' : 'var(--green)' }}><span className="heat-label">{point.detection.classification} / {point.detection.confidence_score}%</span></span>) : <span className="no-detections">NO DETECTIONS IN CURRENT IMAGE</span> : <><span className="heat-point hp-one" /><span className="heat-point hp-two" /><span className="heat-point hp-three" /><span className="heat-label hl-one">DEB-001 / 92%</span><span className="heat-label hl-two">DEB-004 / 88%</span></>}
            <div className="heatmap-scale"><span>LOW</span><i /><span>HIGH RISK</span></div>
          </div>
        ) : (
          <div className="seabed-view">
            <div className="seabed-horizon" />
            <div className="seabed-plane" />
            <div className="seabed-object"><span>0.61M</span></div>
            <div className="seabed-depth">DEPTH 42.6M</div>
            <div className="seabed-axis x">X-TRACK</div><div className="seabed-axis y">Y-TRACK</div>
          </div>
        )}
        <div className="spatial-footer"><span><span className="dot r" /> HIGH RISK ZONE</span><span>MODEL CONFIDENCE 92%</span></div>
      </section>
    </aside>
  )
}
