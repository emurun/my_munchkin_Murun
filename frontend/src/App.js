import './App.css';
import { useEffect, useState, createContext } from "react";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Table } from './components/Table';
import { AddRecipe } from './components/AddRecipe';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { ShowRecipe } from './components/ShowRecipe';

function App() {

  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user !== "undefined") setUser(JSON.parse(user))
  }, [])

  return (
    <>
      <Router>
        <Navbar user={user} setUser={setUser} />

        <Routes>
          <Route
            element={<Table />}
            path="/"
            exact

          />
          <Route
            element={<AddRecipe user={user} />}
            path="/add"
          />

          <Route
            element={<SignUp setUser={setUser} user={user} />}
            path="/signup"
          />

          <Route
            element={<Login setUser={setUser} user={user} />}
            path="/login"
          />
          <Route
            element={<ShowRecipe setUser={setUser} user={user} />}
            path="/recipes/:id"
          />

        </Routes>
      </Router>
    </>
  );
}

export default App;
