import { useEffect, useState } from 'react'
import { auvFleet } from '../data'
import { formatElapsed } from '../time'
import './LeftSidebar.css'

export default function LeftSidebar() {
  const [missionStart] = useState(() => Date.now() - (4 * 60 * 60 + 18 * 60 + 32) * 1000)
  const [elapsed, setElapsed] = useState(() => Date.now() - missionStart)

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed(Date.now() - missionStart), 1000)
    return () => window.clearInterval(timer)
  }, [missionStart])

  return (
    <aside className="sidebar">
      {/* AUV Fleet Status */}
      <section className="card sb-card">
        <div>
          <div className="hdr">AUV Fleet Status</div>
          <div className="sub">AUVs with real-time telemetry</div>
        </div>
        <div className="card-scroll" style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {auvFleet.map(auv => (
            <div key={auv.id} className="auv-row" style={{ flexDirection: auv.battery ? 'row' : 'row', flexWrap: 'wrap' }}>
              <span className={`dot ${auv.dot}`} />
              <span className="auv-id">{auv.id}</span>
              <span className={`auv-st ${auv.dot}`}>{auv.status}</span>
              {auv.battery > 0 && (
                <div className="auv-bars">
                  <div className="auv-bar">
                    <span className="lab">Battery</span>
                    <div className="bar" style={{ flex: 1 }}><span style={{ width: `${auv.battery}%`, background: 'var(--green)', boxShadow: '0 0 6px var(--green-glow)' }} /></div>
                    <span className="val">{auv.battery}%</span>
                  </div>
                  <div className="auv-bar">
                    <span className="lab">Storage</span>
                    <div className="bar" style={{ flex: 1 }}><span style={{ width: `${auv.storage}%`, background: 'var(--accent)', boxShadow: '0 0 6px var(--accent-glow)' }} /></div>
                    <span className="val">{auv.storage}%</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Edge Intelligence */}
      <section className="card sb-card">
        <div className="hdr">Real-Time Edge Intelligence</div>
        <div className="edge-row">
          <span className="lbl">Edge CPU Load (Jetson Nano)</span>
          <span className="edge-big a">64<small>%</small></span>
          <div className="bar"><span style={{ width: '64%', background: 'var(--amber)', boxShadow: '0 0 6px var(--amber-glow)' }} /></div>
        </div>
        <div className="edge-row">
          <span className="lbl">Dual-Model Inference Speed</span>
          <span className="edge-big c">0.1<small>s/km</small></span>
          <div className="bar"><span style={{ width: '88%', background: 'var(--accent)', boxShadow: '0 0 6px var(--accent-glow)' }} /></div>
        </div>
        <div className="edge-row">
          <span className="lbl">U-Net Segmentation Confidence</span>
          <span className="edge-big g">92<small>%</small></span>
          <div className="bar"><span style={{ width: '92%', background: 'var(--green)', boxShadow: '0 0 6px var(--green-glow)' }} /></div>
        </div>
      </section>

      {/* INCOIS */}
      <section className="card sb-card">
        <div className="hdr">INCOIS Current API Status</div>
        <div className="incos-pill">
          <span className="pulse" /> LIVE DRIFT PREDICTIONS
        </div>
      </section>

      <section className="card sb-card mission-card">
        <div>
          <div className="hdr">Live Mission Telemetry</div>
          <div className="sub">AUV01 / SECTOR 4 OPERATING WINDOW</div>
        </div>
        <div className="telemetry-readout"><span>MISSION ELAPSED</span><strong>{formatElapsed(elapsed)}</strong></div>
        <div className="telemetry-readout"><span>SONAR COVERAGE</span><strong className="c">68.4%</strong></div>
        <div className="telemetry-line"><span style={{ width: '68%' }} /></div>
        <div className="telemetry-readout"><span>VEHICLE DEPTH</span><strong>42.6 m</strong></div>
        <div className="telemetry-readout"><span>WATER TEMP</span><strong>18.4 °C</strong></div>
        <div className="telemetry-chart" aria-label="Sonar signal trend">
          <svg viewBox="0 0 240 55" preserveAspectRatio="none">
            <path d="M0 39 L14 35 L25 42 L39 27 L52 32 L65 20 L77 31 L91 18 L105 25 L119 14 L132 28 L147 22 L160 34 L176 17 L191 24 L207 11 L222 22 L240 16" fill="none" stroke="var(--accent)" strokeWidth="2" />
            <path d="M0 39 L14 35 L25 42 L39 27 L52 32 L65 20 L77 31 L91 18 L105 25 L119 14 L132 28 L147 22 L160 34 L176 17 L191 24 L207 11 L222 22 L240 16 L240 55 L0 55 Z" fill="rgba(77,212,232,.1)" />
          </svg>
          <span>SIGNAL RETURN / LAST 60 MIN</span>
        </div>
      </section>
    </aside>
  )
}
