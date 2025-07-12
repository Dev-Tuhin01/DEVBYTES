import './App.css'
import Navbar from './components/Navbar'
import { Button } from './components/ui/button'

function App() {

  return (
    <div className="font-Funnel-Sans max-h-screen">
      <Navbar />
      <div className='flex items-center justify-center h-screen bg-background'>
        <Button className='h-12 w-32'> Click Me </Button>
      </div>
    </div>
  )
}

export default App
