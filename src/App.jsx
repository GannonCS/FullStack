import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Create from './pages/Create'
import Edit from './pages/Edit'

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState(null);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home setExerciseToEdit={setExerciseToEdit}/>}></Route>
          <Route path="/create" element={<Create/>}></Route>
          <Route path="/edit" element={<Edit exerciseToEdit={exerciseToEdit}/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
