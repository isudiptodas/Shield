import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import GeneratePassword from './pages/GeneratePassword.jsx';
import NewPassword from './pages/NewPassword.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import OTPRecover from './pages/OTPRecover.jsx';
import QuestionRecover from './pages/QuestionRecover.jsx';
import AddNewPassword from './pages/AddNewPassword.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
<ProtectedRoute></ProtectedRoute>
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<><LandingPage/></>}/>
        <Route path='/auth/login' element={<><Login/></>}/>
        <Route path='/auth/register' element={<><Register/></>}/>
        <Route path='/dashboard' element={<><ProtectedRoute><Dashboard/></ProtectedRoute></>}/>
        <Route path='/generate-password' element={<><ProtectedRoute><GeneratePassword/></ProtectedRoute></>}/>
        <Route path='/add-password' element={<><ProtectedRoute><NewPassword/></ProtectedRoute></>}/>
        <Route path='/recover-password' element={<><ForgotPassword/></>}/>
        <Route path='/recover/otp' element={<><OTPRecover/></>}/>
        <Route path='/recover/question' element={<><QuestionRecover/></>}/>
        <Route path='/recover/add/new-password' element={<><AddNewPassword/></>}/>
      </Routes>
    </>
  )
}

export default App
