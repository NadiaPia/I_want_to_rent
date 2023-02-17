import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home"
import CreateItem from './pages/CreateItem';
import Item from './pages/Item';
import Registration from "./pages/Registration";
import Login from "./pages/Login"






function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="createitem">Create a New Item</Link>
          <Link to="/">Home page</Link>
          <Link to="registration">Registration</Link>
          <Link to="login">Login</Link>
        </div>

        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/createitem" exact element={<CreateItem/>}/>
          <Route path="/items/:id" exact element={<Item/>}/>
          <Route path="/registration" exact element={<Registration/>}/>
          <Route path="/login" exact element={<Login/>}/>
        </Routes>

      </Router>
      
      
    </div>
  );
}

export default App;
