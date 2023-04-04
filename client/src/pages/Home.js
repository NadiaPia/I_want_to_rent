import React from 'react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
        if(!authState.status && !localStorage.getItem("accessTokenn")) {
            navigate("/login")
        }
    }, [authState.status])   //when click on logout button from the Home page, we go authomatically to the login page only if authState.status chanches

    return (
        <div className="Items">
            {listOfItems.map((value, key) => {
            return (
                <div className="item" key={key}> 
                    <div className="id"> id:{value.id} </div>
                    <div className="photo" onClick={() => {navigate(`/items/${value.id}`)}}> {value.photo.type} </div>
                    <div className="title"> {value.title} </div>
                    <div className="price"> {value.price}$ </div>
                    <div className="description" > {value.description} </div>
                    {/* <div className="username" onClick={(e) => {e.stopPropagation()}}> <Link to={`/profile/${value.UserId}`}>{value.userName}</Link> </div> */}
                    <div className="footer">
                        <div className="username">
                            <Link to={`/profile/${value.UserId}`}>{value.userName}</Link>
                        </div>
                    </div>
                </div>              
                
            );
            })}
        </div>
    )
}

export default Home;

