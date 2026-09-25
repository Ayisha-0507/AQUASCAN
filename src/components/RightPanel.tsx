import { useState } from 'react'
import { activeObject } from '../data'
import './RightPanel.css'

export default function RightPanel() {
  const o = activeObject
  const [feedback, setFeedback] = useState('No operator action taken yet.')
  return (
    <aside className="right">
      <section className="card r-card">
        <div className="hdr">Mission Workflow</div>
        <div className="workflow">
          <span className="wf done">AUV Scan</span>
          <span className="wf done">AI Detection</span>
          <span className="wf active">Risk Assessment</span>
          <span className="wf">Recommended Action</span>
        </div>
        <button className="cta-main" onClick={() => setFeedback(`Investigation opened for ${o.id}.`)}>
          Open {o.id} Investigation
        </button>
      </section>

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
          <div className="sub">Outcome summary generated from current mission evidence</div>
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
        <div className="hdr">Evidence & Verification</div>
        <div className="ev-grid">
          <div className="ev-card">
            <span className="ev-k">Detection Window</span>
            <span className="ev-v">Frame 224 · Side Scan Sonar</span>
          </div>
          <div className="ev-card">
            <span className="ev-k">Human Verification</span>
            <span className="ev-v amber">Pending Operator Review</span>
          </div>
        </div>
        <div className="btn-grid">
          <button className="act-btn" onClick={() => setFeedback('Detection sent for human verification.')}>Verify Detection</button>
          <button className="act-btn" onClick={() => setFeedback('Recovery mission assignment queued.')}>Assign Recovery Mission</button>
          <button className="act-btn warn" onClick={() => setFeedback('Detection marked as potential false positive.')}>Mark False Positive</button>
          <button className="act-btn" onClick={() => setFeedback('Mission report export generated (UI preview).')}>Export Report</button>
        </div>
        <div className="feedback">{feedback}</div>
      </section>

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
    </aside>
  )
}
