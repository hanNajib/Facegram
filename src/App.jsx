import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login, Register } from "./page/Authentication"
import Homepage from "./page/Homepage"
import ProtectedRoute from "./ProtectedRoute"
import Profile from "./page/Profile"
import NewPost from "./page/NewPost"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Homepage />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="new-post" element={<NewPost/>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
