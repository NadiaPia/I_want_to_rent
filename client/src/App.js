import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home"
import CreateItem from './pages/CreateItem';
import Item from './pages/Item';



function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="createitem">Create a New Item</Link>
          <Link to="/">Home page</Link>
        </div>

        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/createitem" exact element={<CreateItem/>}/>
          <Route path="/items/:id" exact element={<Item/>}/>
        </Routes>

      </Router>
      
      
    </div>
  );
}

export default App;
