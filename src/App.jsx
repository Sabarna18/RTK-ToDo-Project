
import './App.css'
import { TaskList , TaskForm } from './Components'
function App() {


  return (
    <div className='max-w-xl mx-auto p-4'>
      
      <TaskForm />
      <TaskList />
    </div>
  )
}

export default App