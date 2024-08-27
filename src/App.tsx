import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import HomePage from './pages/HomePage'

function App() {

  return (
    <div className='flex flex-col justify-between min-h-screen bg-bodyColor dark:bg-bodyDark'>
      <Navbar/>
      <div className="Routes">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
