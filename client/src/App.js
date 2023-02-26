import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home"
import CreateItem from './pages/CreateItem';
import Item from './pages/Item';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from './helpers/AuthContext';
import {useState, useEffect} from "react";
import axios from "axios";


function App() {

  const [authState, setAuthState] = useState(false);// as it false by default it will show Login and Password after refresh the page despite the fact we've logged in. To avoid this we need check whether we've logged in right away after rerender(refresh the page) and if so, make authState is to be true. Looks like useEffect:

  useEffect(() => {
    axios.get("http://localhost:3002/auth/auth", {headers: {accessToken: localStorage.getItem("accessTokenn"),}})
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      })
  }, [])  

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className="navbar">
            <Link to="createitem">Create a New Item</Link>
            <Link to="/">Home page</Link>
            {!authState && (
            <>
            <Link to="registration">Registration</Link>
            <Link to="login">Login</Link>
            </>
            )
            }            
          </div>

          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createitem" exact element={<CreateItem />} />
            <Route path="/items/:id" exact element={<Item />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/login" exact element={<Login />} />
          </Routes>

        </Router>
      </AuthContext.Provider>

    </div>
  );
}

export default App;
