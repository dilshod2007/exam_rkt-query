import RouteController from "./routes"
import Sidebar from "./components/sidebar/Sidebar"


function App() {
  return (
    <>
  <div className="relative">
  <Sidebar/>
  <RouteController  />
  </div>
    </>
  )
}

export default App
