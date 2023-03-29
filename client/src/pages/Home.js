import React from 'react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";




function Home() {

    const [listOfItems, setListOfItems] = useState([]);
    const {authState, setAuthState} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {

        if (!localStorage.getItem("accessTokenn")) {
            
            navigate("/login")
        } else {

            axios.get("http://localhost:3002/items").then((response) => {
                setListOfItems(response.data.reverse())                  //reverse makes new Items go first in a list
                console.log(response.data)
    
            })
        }
    }, []);

    useEffect(() => {
        if(!authState.status) {
            navigate("/login")
        }
    }, [authState.status])   //when click on logout button from the Home page, we go authomatically to the login page only if authState.status chanches

    return (
        <div className="Items">
            {listOfItems.map((value, key) => {
            return (
                <div className="item" key={key} onClick={() => {navigate(`/items/${value.id}`)}}>                              
                    <div className="id"> id:{value.id} </div>
                    <div className="photo"> {value.photo.type} </div>
                    <div className="title"> {value.title} </div>
                    <div className="price"> {value.price}$ </div>
                    <div className="description"> {value.description} </div>
                    <div className="username"> {value.userName} </div>
                </div>
            );
            })}
        </div>
    )
}

export default Home

