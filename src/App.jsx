import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Login, Register } from "./page/Authentication"
import Homepage from "./page/Homepage"
import ProtectedRoute from "./ProtectedRoute"

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute/>}>
        <Route index element={<Homepage />} />
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App
