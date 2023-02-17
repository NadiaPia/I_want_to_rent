import React, { useState } from "react";
import axios from 'axios';


function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        const data = {userName: userName, password: password};
        axios.post("http://localhost:3002/auth/login", data ).then((response) => {
            console.log(response.data)               //we have to use response.data as it contain messages about arrors
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
