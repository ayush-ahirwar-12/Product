import React from 'react'
import Home from '../pages/Home'
import {Routes,Route} from "react-router-dom"
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginUser'
import Auth from '../pages/Auth'
import Seller from '../pages/seller'

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/auth' element={<Auth/>} />
        <Route path='/seller' element={<Seller/>} />


    </Routes>
  )
}

export default AppRouter;