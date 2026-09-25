import { auvFleet } from '../data'
import './LeftSidebar.css'

export default function LeftSidebar() {
  return (
    <aside className="sidebar">
      <section className="card sb-card upload-card">
        <div className="hdr">Mission Upload Queue</div>
        <div className="sub">Upload → Scan → Detect → Verify → Act</div>
        <div className="upload-zone">
          <div className="upload-copy">Drop sonar image here or choose a file to start scan.</div>
          <label className="upload-btn ghost-btn" htmlFor="sonar-upload-left">Choose File</label>
          <input id="sonar-upload-left" type="file" accept="image/png,image/jpeg,image/jpg" />
          <button className="upload-btn run-btn" type="button">Run AI Scan</button>
        </div>
      </section>

      {/* AUV Fleet Status */}
      <section className="card sb-card grow">
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
          <span className="lbl">YOLOv8 Inference Speed</span>
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
    </aside>
  )
}
