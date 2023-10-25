import '../App.css';
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import Home from '../pages/Home';
import Signin from './Signin';
import Wines from '../pages/Wines';
import WineCard from '../pages/WineCard';
import AddWine from '../pages/AddWine';
import Profile from '../pages/Profile';
import { AuthContext } from '../contexts/AuthContext';

function App() {
  const [wines, setWines] = useState([])
  const [showSignin, setShowSignin] = useState(true)
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    fetch("/wines")
    .then(r => r.json())
    .then(wines => setWines(wines))
  }, [])

  function handleAddWine(addedWine) {
    setWines(prevWines => [...prevWines, addedWine]);
  }

  return (
    <div className="App">
      <Router>
        <NavBar user={user} setUser={setUser} setShowSignin={setShowSignin} />
        <Routes> 
          <Route path="/" element={<Home />} />
          {user? (
            <>
            <Route path="/profile" element={<Profile user={user} wines={wines} setWines={setWines} />} />
            <Route path='/wines' element={<Wines wines={wines}/>} />
            <Route path='/wines/:id' element={<WineCard wines={wines} setWines={setWines} user={user} setUser={setUser} />} />
            <Route path='/+wine' element={<AddWine handleAddWine={handleAddWine} />} />
            </>
          ) : (
            <>
            <Route path="/signin" element={<Signin user={user} showSignin={showSignin} setShowSignin={setShowSignin}  />} />
            </>
            
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
