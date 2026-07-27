import React from 'react'
import { Route,Routes } from "react-router-dom";
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import Start from './pages/Start';
import UserProtectorWrapper from './pages/UserProtectorWrapper';
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainProtectorWrapper from './pages/CaptainProtectorWrapper';
import CaptainLogout from './pages/CaptainLogout';
import Riding from './pages/Riding';

const App = () => {
  return (
    <div >
      
      
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}></Route>
        <Route path='/riding' element={<Riding/>}></Route>
        <Route path='/home' element={
          <UserProtectorWrapper>
            <Home/>
          </UserProtectorWrapper>
          }/>
      
        <Route path='/user/logout' element={
          <UserProtectorWrapper>
            <UserLogout/>
          </UserProtectorWrapper>}>
        </Route>
        <Route path='/captain-home' element={
          <CaptainProtectorWrapper>
            <CaptainHome/>
          </CaptainProtectorWrapper>
          }></Route>

        <Route path='/captains/logout' element={
          <CaptainProtectorWrapper>
            <CaptainLogout/>
          </CaptainProtectorWrapper>
        }></Route>
      </Routes>
    </div>
  )
}

export default App