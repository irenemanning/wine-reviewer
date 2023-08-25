import '../App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './NavBar';
import Home from './Home';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
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
    setWines(prevWines => [...prevWines, addedWine]);
  }

  function handleAddReview(newReview) {
    setWines(prevWines => {
      const updatedWines = prevWines.map(wine => {
        if (wine.id === newReview.wine_id) {
          return {
            ...wine,
            reviews: [...wine.reviews, newReview]
          };
        }
        return wine;
      });
      return updatedWines;
    });
  }

  function onEditReview(editedReview) {
    console.log(editedReview)
  }

  function onDeleteReview(reviewId) {
    setWines(prevWines => {
        const updatedWines = prevWines.map(wine => ({
            ...wine,
            reviews: wine.reviews.filter(review => review.id !== reviewId)
        }));
        return updatedWines;
    });
  }
  console.log(wines)

  return (
    <div className="App">
      <Router>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile user={user} wines={wines} setWines={setWines} />} />
          <Route path='/testing' element={<h1>Test Route</h1>}/>
          <Route path="/signin" element={<SigninForm onSignin={setUser}/>} />
          <Route path="/signup" element={<SignupForm user={user} onSignin={setUser} />} />
          <Route path='/wines' element={<Wines wines={wines}/>} />
          <Route path='/wines/:id' element={<WineCard wines={wines} setWines={setWines} user={user} setUser={setUser} handleAddReview={handleAddReview} onEditReview={onEditReview} onDeleteReview={onDeleteReview} />} />
          <Route path='/+wine' element={<AddWine handleAddWine={handleAddWine} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
