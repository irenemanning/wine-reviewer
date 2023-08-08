import '../App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './NavBar';
import Home from './Home';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
// import Logout from './components/Logout';

function App() {
  const [user, setUser] = useState(null);
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   fetch("/hello")
  //     .then((r) => r.json())
  //     .then((data) => setCount(data.count));
  // }, []);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          console.log(user)
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path='/testing' element={<h1>Test Route</h1>}/>
          <Route path="/signin" element={<SigninForm onSignin={setUser}/>} />
          <Route path="/signup" element={<SignupForm onSignin={setUser} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
