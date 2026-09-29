import './Footer.css'
import { useEffect, useState } from 'react'
import { formatUtcTimestamp } from '../time'

export default function Footer() {
  const [currentTime, setCurrentTime] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <footer className="footer">
      <div className="foot-left">
        <span className="ic"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></span>
        <span className="date">{formatUtcTimestamp(currentTime)}</span>
        <span className="status"><span className="dot g" /> Status: Online</span>
      </div>
    </footer>
  )
}
