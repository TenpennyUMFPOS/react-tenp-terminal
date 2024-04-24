
import { Terminal } from './components'

function App() {
  const commands = {
    "about": "about section boyyyy",
    "commands": "commands boii",
  };

  return (
    <div className='h-screen w-screen'>
      <Terminal commands={commands} />
    </div>

  )
}

export default App
