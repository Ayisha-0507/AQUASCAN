import { useState } from 'react'
import './TopNav.css'

export const tabs = ['DASHBOARD', 'SURVEY ANALYTICS', 'AUV FLEET', 'DATA REPOSITORY', 'HISTORY']

interface TopNavProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

export default function TopNav({ activeTab, onTabChange }: TopNavProps) {
  const [openUtility, setOpenUtility] = useState<'profile' | 'alerts' | null>(null)

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
          <button key={t} className={i === activeTab ? 'active' : ''} onClick={() => onTabChange(i)}>{t}</button>
        ))}
      </div>

      <div className="nav-right">
        <div className="nav-icons">
          <button className={`ic ${openUtility === 'profile' ? 'selected' : ''}`} aria-label="Open operator profile" title="Operator profile" onClick={() => setOpenUtility(openUtility === 'profile' ? null : 'profile')}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0116 0"/></svg></button>
          <div className="ic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/></svg></div>
          <button className={`ic ${openUtility === 'alerts' ? 'selected' : ''}`} aria-label="Open alerts" title="Active alerts" onClick={() => setOpenUtility(openUtility === 'alerts' ? null : 'alerts')}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg><span className="b">3</span></button>
          <div className="ic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></div>
        </div>
        <div className="divider-v" />
        <span className="nav-time">Time 12:30 AM</span>
        {openUtility === 'profile' && <div className="utility-popover"><strong>OPERATOR PROFILE</strong><span>Mission Control / Admin</span><em><span className="dot g" /> ONLINE</em></div>}
        {openUtility === 'alerts' && <div className="utility-popover alert-popover"><strong>ACTIVE ALERTS · 3</strong><span>DEB-001 high-risk ghost gear detected.</span><span>AUV02 telemetry check pending.</span><em>Last sync: 00:28:14Z</em></div>}
      </div>
    </nav>
  )
}
