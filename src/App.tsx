import TopNav from './components/TopNav'
import LeftSidebar from './components/LeftSidebar'
import CenterPanel from './components/CenterPanel'
import RightPanel from './components/RightPanel'
import BottomPanel from './components/BottomPanel'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app">
      <TopNav />
      <div className="mid">
        <LeftSidebar />
        <CenterPanel />
        <RightPanel />
      </div>
      <BottomPanel />
      <Footer />
    </div>
  )
}
