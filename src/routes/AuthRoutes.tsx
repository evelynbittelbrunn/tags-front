import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login/Login'
import CreateAccount from '../pages/createAccount/CreateAccount'

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/criar" element={<CreateAccount />} />
        </Routes>
    )
}


export default AuthRoutes