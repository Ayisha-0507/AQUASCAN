import { useState } from 'react'
import TopNav from './components/TopNav'
import LeftSidebar from './components/LeftSidebar'
import CenterPanel from './components/CenterPanel'
import RightPanel from './components/RightPanel'
import BottomPanel from './components/BottomPanel'
import Footer from './components/Footer'
import { tabs } from './components/TopNav'
import { auvFleet, demoPins } from './data'
import './layout.css'

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map(row => row.map(value => `"${value.replace(/"/g, '""')}"`).join(',')).join('\n')
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

function WorkspaceView({ tab }: { tab: number }) {
  const views = [
    { eyebrow: 'ANALYTICS OVERVIEW', title: 'Survey analytics', copy: 'Review detection volume, confidence trends, and risk distribution across active survey sectors.', metrics: ['2,450 total detections', '92% model confidence', '120 high-risk hazards'] },
    { eyebrow: 'FLEET CONTROL', title: 'AUV fleet operations', copy: 'Monitor vehicle health, mission state, battery reserve, and current telemetry in one operational view.', metrics: ['AUV01 surveying', 'AUV02 deployed', 'AUV03 charging'] },
    { eyebrow: 'MISSION DATA', title: 'Data repository', copy: 'Access indexed sonar captures, verified debris records, and the latest INCOIS prediction stream.', metrics: ['1,284 sonar captures', '850 ghost gear targets', 'Last sync 00:28:14Z'] },
    { eyebrow: 'MISSION ARCHIVE', title: 'Survey history', copy: 'Trace completed missions, recovery events, and model outputs from previous operating windows.', metrics: ['18 completed missions', '43 recovery events', '98.4% archive integrity'] },
  ]
  const view = views[tab - 1]
  const [range, setRange] = useState('24H')
  const [fleet, setFleet] = useState(auvFleet)
  const [search, setSearch] = useState('')
  const [riskFilter, setRiskFilter] = useState('ALL')
  const [verified, setVerified] = useState<string[]>(['DEB-001'])
  const filteredDetections = demoPins.filter(pin => `${pin.id} ${pin.classification}`.toLowerCase().includes(search.toLowerCase()) && (riskFilter === 'ALL' || pin.risk === riskFilter))
  const filteredHistory = ['Sector 4 / AUV01 / 25 Sep 2026 / 850 objects', 'Sector 3 / AUV02 / 21 Sep 2026 / 412 objects', 'Harbor approach / AUV03 / 18 Sep 2026 / 296 objects'].filter(row => row.toLowerCase().includes(search.toLowerCase()))
  const toggleMission = (id: string) => setFleet(items => items.map(item => item.id === id ? { ...item, status: item.status === 'SURVEYING' ? 'PAUSED' : 'SURVEYING' } : item))

  return <main className="workspace-view">
    <div className="workspace-heading"><span className="hdr">{view.eyebrow}</span><span className="sub">AQUASCAN AI / CONTROL ROOM</span></div>
    <section className="workspace-hero card"><span className="workspace-kicker">{tabs[tab]}</span><h1>{view.title}</h1><p>{view.copy}</p></section>
    <section className="workspace-metrics">{view.metrics.map((metric, index) => <div className="workspace-metric card" key={metric}><span className="metric-index">0{index + 1}</span><strong>{metric}</strong><span className="metric-state">LIVE DATA</span></div>)}</section>
    {tab === 1 && <section className="workspace-tool card"><div className="tool-head"><div><div className="hdr">Detection performance</div><div className="sub">CONFIDENCE AND RISK DISTRIBUTION / {range}</div></div><div className="tool-actions">{['24H', '7D', '30D'].map(item => <button className={range === item ? 'active' : ''} key={item} onClick={() => setRange(item)}>{item}</button>)}</div></div><div className="analytics-bars"><div><span>HIGH RISK</span><i><b style={{ width: '74%' }} /></i><strong>120</strong></div><div><span>MEDIUM RISK</span><i><b className="amber" style={{ width: '57%' }} /></i><strong>86</strong></div><div><span>LOW RISK</span><i><b className="green" style={{ width: '39%' }} /></i><strong>54</strong></div></div><div className="workspace-log-row"><span className="dot g" /> Model precision is holding at 92% across the active survey window.</div></section>}
    {tab === 2 && <section className="workspace-tool card"><div className="tool-head"><div><div className="hdr">Fleet command</div><div className="sub">TELEMETRY / MISSION CONTROL</div></div><span className="live-status"><span className="dot g" /> LINKED</span></div><div className="fleet-table">{fleet.map(item => <div className="fleet-row" key={item.id}><span className={`dot ${item.dot}`} /><strong>{item.id}</strong><span className="fleet-state">{item.status}</span><span className="fleet-stat">{item.battery || 78}% BAT</span><button onClick={() => toggleMission(item.id)}>{item.status === 'SURVEYING' ? 'PAUSE' : 'START'}</button></div>)}</div></section>}
    {tab === 3 && <section className="workspace-tool card"><div className="tool-head"><div><div className="hdr">Detection repository</div><div className="sub">{filteredDetections.length} RECORDS / LOCAL INDEX</div></div><button className="action-button" onClick={() => downloadCsv('aquascan-detections.csv', [['ID', 'CLASSIFICATION', 'RISK', 'CONFIDENCE'], ...filteredDetections.map(pin => [pin.id, pin.classification, pin.risk, `${pin.confidence}%`])])}>EXPORT CSV</button></div><div className="filter-row"><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search detections..." /><select value={riskFilter} onChange={event => setRiskFilter(event.target.value)}><option>ALL</option><option>HIGH</option><option>MEDIUM</option><option>LOW</option></select></div><div className="detection-table">{filteredDetections.map(pin => <div className="detection-row" key={pin.id}><span className={`dot ${pin.color}`} /><strong>{pin.id}</strong><span>{pin.classification}</span><span>{pin.risk}</span><span>{pin.confidence}%</span><button onClick={() => setVerified(current => current.includes(pin.id) ? current.filter(id => id !== pin.id) : [...current, pin.id])}>{verified.includes(pin.id) ? 'VERIFIED' : 'VERIFY'}</button></div>)}</div></section>}
    {tab === 4 && <section className="workspace-tool card"><div className="tool-head"><div><div className="hdr">Mission archive</div><div className="sub">COMPLETED SURVEYS / RECOVERY EVENTS</div></div><button className="action-button" onClick={() => downloadCsv('aquascan-mission-history.csv', [['MISSION', 'AUV', 'DATE', 'DETECTIONS'], ...filteredHistory.map(row => row.split(' / '))])}>EXPORT REPORT</button></div><div className="filter-row"><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search mission history..." /></div><div className="history-list">{filteredHistory.map(row => <div className="history-row" key={row}><span className="dot g" /><span>{row}</span><strong>ARCHIVED</strong></div>)}</div></section>}
    <section className="workspace-log card"><div className="hdr">Operational feed</div><div className="workspace-log-row"><span className="dot g" /> {tabs[tab]} channel synchronized with AUV01 telemetry.</div><div className="workspace-log-row"><span className="dot y" /> INCOIS drift projection refreshed for Sector 4.</div><div className="workspace-log-row"><span className="dot g" /> No critical system faults detected.</div></section>
  </main>
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <div className="app">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 0 ? <>
        <div className="mid">
          <LeftSidebar />
          <CenterPanel />
          <RightPanel />
        </div>
        <BottomPanel />
      </> : <WorkspaceView tab={activeTab} />}
      <Footer />
    </div>
  )
}
