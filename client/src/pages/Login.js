import React, { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";



function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext)

    const navigate = useNavigate();

    const login = () => {
        const data = {userName: userName, password: password};
        axios.post("http://localhost:3002/auth/login", data ).then((response) => {
          
            if(response.data.error) { //we have to use response.data as it contain messages about errors
              alert(response.data.error)
            } else {
              localStorage.setItem("accessTokenn", response.data.token);
              //console.log("response.data", response.data) //{token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZ…1Mjl9.riiC9iVxBgLNTF6prkON6e-IEk_8WfKYoDi79bN8tUI', userName: 'Sonia', id: 10}
              setAuthState({userName: response.data.userName, id: response.data.id, status: true});
              //setAuthState(status: true); //it cannot be a boolean any more as we made it to be an object in the App.js 
              navigate("/")
            }   
            
        })
    }

  return (
    <div className="loginContainer">
      <input type="text" placeholder="Username..." onChange={(event) => {setUserName(event.target.value)}} />
      <input type="text" placeholder="Password..." onChange={(event) => {setPassword(event.target.value)}}/>

      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login;
