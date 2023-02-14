import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Home() {

    const [listOfItems, setListOfItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3002/items").then((response) => {
            setListOfItems(response.data.reverse())                  //reverse makes new Items go first in a list
            console.log(response.data)

        })
    }, []);

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

