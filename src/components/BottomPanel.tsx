import { activeObject } from '../data'
import './BottomPanel.css'

export default function BottomPanel() {
  return (
    <section className="bottom">
      <div className="bot-title">
        <div className="hdr">Sonar Visualization & Height Estimation</div>
        <div className="r4">Drift Projection</div>
      </div>

      {/* 1. Raw Sonar */}
      <div className="card bp">
        <div className="ph">Raw Sonar Image</div>
        <div className="viz">
          <div className="sonar">
            <div className="sonar-grid" />
            <div className="sonar-scan" />
            <div className="sonar-echo" style={{ width: 38, height: 38, left: '52%', top: '40%' }} />
            <div className="sonar-echo" style={{ width: 22, height: 22, left: '30%', top: '55%', background: 'radial-gradient(circle, rgba(255,92,92,0.6), transparent 70%)' }} />
            <div className="sonar-echo" style={{ width: 16, height: 16, left: '70%', top: '62%' }} />
            <div className="sonar-axis x">Cross-track (m)</div>
            <div className="sonar-axis y">Along-track (m)</div>
          </div>
        </div>
      </div>

      {/* 2. AI-Enhanced + Masks */}
      <div className="card bp">
        <div className="ph">AI-Enhanced Sonar & Masks</div>
        <div className="viz">
          <div className="sonar">
            <div className="sonar-grid" />
            <div className="sonar-scan" />
            <div className="sonar-echo" style={{ width: 38, height: 38, left: '52%', top: '40%' }} />
            <div className="mask-box" style={{ left: '48%', top: '36%', width: 56, height: 40 }}>
              <span className="mask-label yolo" style={{ top: -13, left: -1 }}>AquaScan</span>
            </div>
            <div className="unet-mask" style={{ left: '46%', top: '34%', width: 62, height: 46 }}>
              <span className="mask-label unet" style={{ top: -13, right: -1 }}>U-Net</span>
            </div>
            <div className="sonar-echo" style={{ width: 22, height: 22, left: '30%', top: '55%', background: 'radial-gradient(circle, rgba(255,92,92,0.6), transparent 70%)' }} />
            <div className="mask-box" style={{ left: '26%', top: '51%', width: 34, height: 26 }} />
            <div className="sonar-axis x">Cross-track (m)</div>
            <div className="sonar-axis y">Along-track (m)</div>
          </div>
        </div>
      </div>

      {/* 3. Geometric Height Estimation */}
      <div className="card bp">
        <div className="ph">Geometric Height Estimation</div>
        <div className="viz">
          <div className="geo">
            <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
              {/* seabed */}
              <line x1="10" y1="105" x2="190" y2="105" stroke="rgba(77,212,232,0.3)" strokeWidth="1" />
              {/* object */}
              <line x1="80" y1="105" x2="80" y2="58" stroke="var(--accent)" strokeWidth="2.5" />
              {/* altitude H */}
              <line x1="80" y1="105" x2="80" y2="58" stroke="var(--accent)" strokeWidth="0" />
              <text x="84" y="84" fill="var(--accent)" fontSize="9" fontFamily="var(--mono)">H</text>
              {/* range R */}
              <line x1="80" y1="58" x2="160" y2="105" stroke="var(--amber)" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="118" y="78" fill="var(--amber)" fontSize="9" fontFamily="var(--mono)">R</text>
              {/* shadow Ls */}
              <line x1="80" y1="105" x2="160" y2="105" stroke="var(--red)" strokeWidth="2" />
              <text x="110" y="118" fill="var(--red)" fontSize="9" fontFamily="var(--mono)">Ls</text>
              {/* sonar position */}
              <circle cx="80" cy="58" r="4" fill="var(--accent)" />
              <text x="62" y="52" fill="var(--text-dim)" fontSize="7" fontFamily="var(--mono)">SONAR</text>
              {/* angle arc */}
              <path d="M 92 58 A 12 12 0 0 1 90 70" fill="none" stroke="var(--text-faint)" strokeWidth="0.8" />
              <text x="93" y="68" fill="var(--text-faint)" fontSize="7" fontFamily="var(--mono)">θ</text>
            </svg>
            <div className="geo-box">Estimated Height: {activeObject.estHeight}</div>
          </div>
        </div>
      </div>

      {/* 4. Drift Projection */}
      <div className="card bp">
        <div className="ph">Drift Projection</div>
        <div className="viz">
          <div className="drift">
            <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
              <defs>
                <pattern id="dg" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M0 16L16 0" stroke="rgba(77,212,232,0.07)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="200" height="120" fill="url(#dg)" />
              {/* current arrows */}
              <g stroke="rgba(77,212,232,0.25)" strokeWidth="0.8" fill="none">
                <path d="M20 30 L40 38 M36 36 L40 38 M38 34 L40 38" />
                <path d="M60 50 L82 56 M78 54 L82 56 M80 52 L82 56" />
                <path d="M30 70 L52 76 M48 74 L52 76 M50 72 L52 76" />
                <path d="M70 90 L92 94 M88 93 L92 94 M90 91 L92 94" />
              </g>
              {/* current pos */}
              <circle cx="55" cy="40" r="5" fill="var(--accent)" stroke="#04161f" strokeWidth="1.5" />
              {/* projected path */}
              <path d="M55 40 Q 100 55 150 90" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeDasharray="4 3" />
              {/* t+48 marker */}
              <circle cx="150" cy="90" r="5" fill="var(--amber)" stroke="#04161f" strokeWidth="1.5" />
              {/* uncertainty cone */}
              <path d="M55 40 L145 80 L155 100 Z" fill="rgba(255,177,61,0.08)" stroke="rgba(255,177,61,0.2)" strokeWidth="0.5" />
            </svg>
            <div className="drift-label t0">T+0h</div>
            <div className="drift-label t48">T+48h</div>
          </div>
        </div>
      </div>
    </section>
  )
}
