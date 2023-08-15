import '../App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './NavBar';
import Home from './Home';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
// import Logout from './components/Logout';
import Wines from '../pages/Wines';
import WineCard from '../pages/WineCard';
import AddWine from '../pages/AddWine';
import Profile from '../pages/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [wines, setWines] = useState([])
  useEffect(() => {
    fetch("/wines")
    .then(r => r.json())
    .then(wines => setWines(wines))
  }, [])
  
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
        });
      }
    });
  }, []);

  function handleAddWine(addedWine) {
    setWines([addedWine, ...wines])
  }
console.log("User")
console.log(user)
  return (
    <div className="App">
      <Router>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path='/testing' element={<h1>Test Route</h1>}/>
          <Route path="/signin" element={<SigninForm onSignin={setUser}/>} />
          <Route path="/signup" element={<SignupForm user={user} onSignin={setUser} />} />
          <Route path='/wines' element={<Wines wines={wines}/>} />
          <Route path='/wines/:id' element={<WineCard wines={wines} setWines={setWines} user={user} setUser={setUser} />} />
          <Route path='/+wine' element={<AddWine handleAddWine={handleAddWine} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
