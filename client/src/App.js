import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home"
import CreateItem from './pages/CreateItem';
import Item from './pages/Item';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from './pages/PageNotFound';


function App() {

  //const [authState, setAuthState] = useState(false);// as it false by default it will show Login and Password after refresh the page despite the fact we've logged in. To avoid this we need check whether we've logged in right away after rerender(refresh the page) and if so, make authState is to be true. Looks like useEffect:
    const [authState, setAuthState] = useState({userName: "", id: 0, status: false})
  useEffect(() => {
    axios.get("http://localhost:3002/auth/auth", { headers: { accessToken: localStorage.getItem("accessTokenn"), } })
      .then((response) => {
        //console.log("response.data", response.data) //{userName: 'Sonia', id: 10, iat: 1679941297}
        if (response.data.error) {
          setAuthState({...authState, status: false});
        } else {
          setAuthState({userName: response.data.userName, id: response.data.id, status: true});
        }
      })
  }, [])

  const logout = () => {
    localStorage.removeItem("accessTokenn"); //we removed the Tokent> BUT!!!! it will not show any chages in our navbar: logout button will not be replaced with the Login/registration => we need change our state:
    setAuthState({userName: "", id: 0, status: false}); //it will rerender the page
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="registration">Registration</Link>
                  <Link to="login">Login</Link>
                </>
              ) : (
                <>
                  <Link to="/">Home page</Link>
                  <Link to="createitem">Create a New Item</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.userName}</h1>
              <button onClick={logout}>logout</button>
            </div>
          </div>

          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createitem" exact element={<CreateItem />} />
            <Route path="/items/:id" exact element={<Item />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="*" exact element={<PageNotFound />} />

          </Routes>

        </Router>
      </AuthContext.Provider>

    </div>
  );
}

export default App;
