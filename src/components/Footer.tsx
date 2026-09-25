import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="foot-left">
        <span className="ic"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></span>
        <span className="date">2026-09-25 · 00:30:14 UTC</span>
        <span className="status"><span className="dot g" /> Status: Online</span>
      </div>
      <div className="foot-right"><span className="accent">Your Team Name</span></div>
    </footer>
  )
}
