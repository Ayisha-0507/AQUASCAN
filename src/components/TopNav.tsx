import { useState } from 'react'
import './TopNav.css'

const tabs = ['DASHBOARD', 'SURVEY ANALYTICS', 'AUV FLEET', 'DATA REPOSITORY', 'HISTORY']

export default function TopNav() {
  const [active, setActive] = useState(0)
  return (
    <nav className="nav">
      <div className="nav-logo">
        <span className="mark">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" /><path d="M2 7l10 5 10-5" /><path d="M12 22V12" />
          </svg>
        </span>
        <span><span className="accent">AquaScan AI</span> — Debris Intelligence Dashboard</span>
      </div>

      <div className="nav-tabs">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={i === active ? 'active' : ''}
            onClick={() => setActive(i)}
            disabled={i !== 0}
            aria-disabled={i !== 0}
            title={i !== 0 ? 'Module preview coming soon' : 'Open dashboard'}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="nav-right">
        <div className="nav-state">
          <span className="badge sim"><span className="dot a" /> Simulation</span>
          <span className="badge live"><span className="dot g" /> Link Stable</span>
          <span className="badge info">Model v1.8.2</span>
        </div>
        <div className="nav-icons">
          <div className="ic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0116 0"/></svg></div>
          <div className="ic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/></svg></div>
          <div className="ic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg><span className="b">3</span></div>
          <div className="ic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></div>
        </div>
        <div className="divider-v" />
        <span className="nav-time">Last Update 00:30:14 UTC</span>
      </div>
    </nav>
  )
}
