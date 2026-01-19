import { Route, Routes, Navigate } from "react-router-dom"
import Layout from "./layout/Layout"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useAppContext } from "./contexts/AppContext"
import AddFlights from "./pages/AddFlights"

function App() {

  const { isLoggedIn } = useAppContext(); 
  return (  

    <Routes>
      <Route path="/" element={<Layout><></></Layout>}/>
      <Route path="/search" element={<>Search Page</>}/>
      <Route path="/register" element={<Layout><Register/></Layout>}/>
      <Route path="/sign-in" element={<Layout><Login/></Layout>}/>
      {isLoggedIn && 
        <>
          <Route
            path="/add-flight"
            element={<Layout><AddFlights/></Layout>}
          />
        </>
      }
      <Route path="*" element={<Navigate to='/'/>}/>
    </Routes>

  )
}

export default App
