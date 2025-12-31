import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/home"
import { Register } from "./pages/register"
import { User } from "./pages/user"
import { Layout } from "./pages/layout"


function App() {

  return (

    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/user" element={<User/>}/>
        </Route>
      </Routes>
    </Router>

  )

}

export default App;
