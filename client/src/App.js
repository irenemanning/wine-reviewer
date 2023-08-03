import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<h1>Page Count: {count}</h1>}></Route>
          <Route path='/testing' element={<h1>Test Route</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
