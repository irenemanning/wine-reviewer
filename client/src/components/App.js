import '../App.css'
import React, { useState, useEffect, useContext } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Loading from './Loading'
import NavBar from './NavBar'
import Home from '../pages/Home'
import Signin from './Signin'
import Wines from '../pages/Wines'
import WineCard from '../pages/WineCard'
import AddWine from '../pages/AddWine'
import Profile from '../pages/Profile'
import { AuthContext } from '../contexts/AuthContext'

function App() {
  const [wines, setWines] = useState([])
  const [showSignin, setShowSignin] = useState(true)
  const [loading, setLoading] = useState(true)
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    fetch("/wines")
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch wines')
            }
            return response.json()
        })
        .then(data => {
            setWines(data)
            setLoading(true)
        })
        .catch(error => {
            console.error('Error fetching wines:', error)
            setLoading(false) 
        })
  }, [])

  function handleAddWine(addedWine) {
    setWines(prevWines => [...prevWines, addedWine])
  }
  
  if (loading) {
    return (<Loading />)
  }

  return (
    <div className="App">
      <Router>
        <NavBar user={user} setUser={setUser} setShowSignin={setShowSignin} />
        <Routes> 
          <Route path="/" element={<Home />} />
          {user? (
            <>
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path='/wines' element={<Wines wines={wines}/>} />
            <Route path='/wines/:id' element={<WineCard wines={wines} setWines={setWines} user={user} setUser={setUser} />} />
            <Route path='/+wine' element={<AddWine handleAddWine={handleAddWine} />} />
            </>
          ) : (
            <>
            <Route path="/signin" element={<Signin showSignin={showSignin} setShowSignin={setShowSignin}  />} />
            </>
            
          )}
        </Routes>
      </Router>
    </div>
  )
}

export default App
