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
import BookNow from './pages/BookNow';
import BrowseTasks from './pages/BrowseTasks'
import ApplyTask from './pages/ApplyTask'
import UserTasks from './pages/UserTasks';
import TaskerApplication from './pages/TaskerApplication'
import TaskerProfile from './pages/TaskerProfile'
import UpdateTask from './pages/UpdateTask'
import Porpasel from './pages/Porpasel'
import VerifyEmail from './pages/VerifyEmail'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import VerifyCode from './pages/VerifyCode'
import Chats from './pages/Chats'

function App() {

  return (
    <div className='flex flex-col justify-between min-h-screen bg-bodyColor dark:bg-bodyDark font'>
      <Navbar/>
      <div className="Routes">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route element={<GlobalRoutes />}>
            <Route path='/login' element={<Login />} />
            <Route path='/forgetPassword' element={<ForgetPassword />} />
            <Route path='/resetPassword/:token' element={<ResetPassword />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verifyEmail' element={<VerifyEmail />} />
            <Route path='/verifyCode' element={<VerifyCode />} />
          </Route>
            <Route path='/categories' element={<Categories />} />
            <Route path='/search' element={<Search />} />
          <Route element={<ProtectRoutes />}>
            <Route path='/becomeTasker' element={<BecomeTasker />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/createPost' element={<CreatePost />} />
            <Route path='/subCategories/:id' element={<SubCategories />} />
            <Route path='/BookNow/:id' element={<BookNow/>} />
            <Route path='/browseTasks' element={<BrowseTasks />} />
            <Route path='/applyTask/:id' element={<ApplyTask />} />
            <Route path='/userTasks' element={<UserTasks />} />
            <Route path='/taskerApplication/:id' element={<TaskerApplication />} />
            <Route path='/taskerProfile/:id' element={<TaskerProfile />} />
            <Route path='/updateTask/:id' element={<UpdateTask />} />
            <Route path='/porpasel/:id/:index' element={<Porpasel />} />
            <Route path='/chats/*' element={<Chats />} />
          </Route>
        </Routes>
      </div>
      <Footer/>
      <Toaster />
    </div>
  )
}

export default App
