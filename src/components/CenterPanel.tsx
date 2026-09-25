import { MapContainer, Polyline, CircleMarker, Popup, Polygon, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import { demoPins, surveyPath, inventory } from '../data'
import './CenterPanel.css'

const colorMap: Record<string, string> = {
  red: '#ff5c5c',
  amber: '#ffb13d',
  green: '#3edc81',
}

function FitBounds() {
  const map = useMap()
  useEffect(() => {
    const b = L.latLngBounds(surveyPath)
    map.fitBounds(b.pad(0.2), { animate: false })
  }, [map])
  return null
}

const icons = {
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  locate: 'M12 2v4M12 18v4M2 12h4M18 12h4M12 8a4 4 0 100 8 4 4 0 000-8z',
  layers: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  settings: 'M12 8a4 4 0 100 8 4 4 0 000-8zM12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1',
  fs: 'M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3',
}

export default function CenterPanel() {
  const lats = surveyPath.map(([lat]) => lat)
  const lngs = surveyPath.map(([, lng]) => lng)
  const boundary: [number, number][] = [
    [Math.min(...lats) - 0.18, Math.min(...lngs) - 0.18],
    [Math.min(...lats) - 0.18, Math.max(...lngs) + 0.18],
    [Math.max(...lats) + 0.18, Math.max(...lngs) + 0.18],
    [Math.max(...lats) + 0.18, Math.min(...lngs) - 0.18],
  ]

  return (
    <main className="center">
      <div className="card map-card">
        <div className="map-meta">
          <span className="badge sim"><span className="dot a" /> Simulation Mode</span>
          <span className="mono">Survey Boundary: Goa West Grid</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={[15.4, 73.5]} zoom={9} zoomControl={false} attributionControl={false} style={{ height: '100%', width: '100%' }}>
            <Polygon
              positions={boundary}
              pathOptions={{ color: '#4dd4e8', weight: 1, opacity: 0.35, dashArray: '6 6', fillOpacity: 0.06, fillColor: '#4dd4e8' }}
            />
            <Polyline positions={surveyPath} pathOptions={{ color: '#4dd4e8', weight: 1.5, opacity: 0.6, dashArray: '5 6' }} />
            {demoPins.map((p, i) => (
              <CircleMarker
                key={p.id}
                center={[p.lat, p.lng]}
                radius={7}
                pathOptions={{ color: colorMap[p.color], fillColor: colorMap[p.color], fillOpacity: 0.8, weight: 2 }}
              >
                {i === 0 && (
                  <Popup>
                    <div>
                      <div className="popup-id">Object ID: {p.id}</div>
                      <div className="popup-row"><span className="k">Classification:</span><span className="v">{p.classification}</span></div>
                      <div className="popup-row"><span className="k">Risk:</span><span className="v r">{p.risk}</span></div>
                      <div className="popup-row"><span className="k">Confidence:</span><span className="v">{p.confidence}%</span></div>
                    </div>
                  </Popup>
                )}
              </CircleMarker>
            ))}
            <CircleMarker
              center={[demoPins[0].lat, demoPins[0].lng]}
              radius={13}
              pathOptions={{ color: '#ff5c5c', opacity: 0.5, fillOpacity: 0, weight: 1.5, dashArray: '3 5' }}
            />
            <FitBounds />
          </MapContainer>
          <div className="sim-grid" aria-hidden />
          <div className="coord-chip mono">Center 15.40°N · 73.50°E</div>
        </div>

        <div className="map-controls">
          {['plus', 'minus', 'locate', 'layers', 'settings'].map(n => (
            <button key={n} className="mc" disabled title={`${n} disabled in simulation mode`} aria-label={`${n} control disabled in simulation mode`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={icons[n as keyof typeof icons]} /></svg>
            </button>
          ))}
        </div>

        <div className="legend">
          <div className="row"><span className="line route" /> Survey Route</div>
          <div className="row"><span className="line boundary" /> Survey Boundary</div>
          <div className="row"><span className="dot r" /> High Risk</div>
          <div className="row"><span className="dot a" /> Review Required</div>
        </div>

        <div className="map-fs">
          <button className="mc" disabled title="Fullscreen disabled in simulation mode" aria-label="fullscreen control disabled in simulation mode"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={icons.fs} /></svg></button>
        </div>
      </div>

      <div className="card inv-bar">
        {inventory.map(s => (
          <div key={s.label} className="inv-stat">
            <span className="l">{s.label}</span>
            <span className="v" style={{ color: s.color }}>{s.value}</span>
          </div>
        ))}
      </div>
    </main>
  )
}
