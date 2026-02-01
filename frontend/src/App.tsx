import { Route, Routes, Navigate } from "react-router-dom"
import Layout from "./layout/Layout"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useAppContext } from "./contexts/AppContext"
import AddFlights from "./pages/AddFlights"
import MyFlights from "./pages/MyFlights"
import EditFlight from "./pages/EditFlight"
import Search from "./pages/Search"

function App() {

  const { isLoggedIn } = useAppContext(); 
  return (  

    <Routes>
      <Route path="/" element={<Layout><></></Layout>}/>
      <Route path="/register" element={<Layout><Register/></Layout>}/>
      <Route path="/sign-in" element={<Layout><Login/></Layout>}/>
      {isLoggedIn && 
        <>
          <Route
            path="/add-flight"
            element={<Layout><AddFlights/></Layout>}
          />
          <Route
            path="/my-flights"
            element={<Layout><MyFlights/></Layout>}
          />
          <Route
            path="/edit-flight/:flightId"
            element={<Layout><EditFlight/></Layout>}
          />

          <Route
            path="/search"
            element={<Layout><Search/></Layout>}
          />

        </>
      }
     
      <Route path="*" element={<Navigate to='/'/>}/>
    </Routes>

  )
}

export default App
