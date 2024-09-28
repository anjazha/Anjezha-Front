import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import HomePage from './pages/HomePage'
import Search from './pages/Search'
import { Toaster } from 'react-hot-toast'
import BecomeTasker from './pages/BecomeTasker'
import GlobalRoutes from './pages/GlobalRoutes'
import ProtectRoutes from './pages/ProtectRoutes'
import Categories from './pages/Categories'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import SubCategories from './pages/SubCategories'

function App() {

  return (
    <div className='flex flex-col justify-between min-h-screen bg-bodyColor dark:bg-bodyDark font'>
      <Navbar/>
      <div className="Routes">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route element={<GlobalRoutes />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            
          </Route>
          <Route element={<ProtectRoutes />}>
            <Route path='/search' element={<Search />} />
            <Route path='/becomeTasker' element={<BecomeTasker />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/createPost' element={<CreatePost />} />
            <Route path='/subCategories/:id' element={<SubCategories />} />
          </Route>
        </Routes>
      </div>
      <Footer/>
      <Toaster />
    </div>
  )
}

export default App
