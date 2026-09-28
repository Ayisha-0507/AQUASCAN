import { activeObject } from '../data'
import { useState } from 'react'
import './RightPanel.css'

export default function RightPanel() {
  const o = activeObject
  const [visualMode, setVisualMode] = useState<'heatmap' | '3d'>('heatmap')
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
          <div className="sub">referencing previous slides</div>
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
            <span className="heat-point hp-one" /><span className="heat-point hp-two" /><span className="heat-point hp-three" />
            <span className="heat-label hl-one">DEB-001 / 92%</span><span className="heat-label hl-two">DEB-004 / 88%</span>
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
