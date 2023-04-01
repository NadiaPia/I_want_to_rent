import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; //useParams - is for grabing a parametr from the url in the browser ...profile/:id in React
import axios from 'axios';

function Profile() {

    let { id } = useParams() //now, in the Browser, we know the exact number that goes after "profile/" in the url (localhost:3000/profile/4)
    const [userName, setUserName] = useState("");
    const [listOfItems, setListOfItems] = useState([]);
    let navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:3002/auth/basicinfo/${id}`). then((response) => {
            setUserName(response.data.userName)
        });

        axios.get(`http://localhost:3002/items/byuserId/${id}`). then((response) => {
            setListOfItems(response.data);
        })
    }, []);

  return (
    <div className="profilePageContainer">
        <div className="basicInfo">
            <h1>Username: {userName}</h1>

        </div>
        <div className="listOfItems">
            {listOfItems.map((value, key) => {
                return (
                    <div className="item" key={key}>
                        <div className="title">{value.title}</div>
                        <div className="id">{value.id}</div>
                        <div className="body" onClick={() => {navigate(`/items/${value.id}`)}}>{value.description}</div>
                        <div className="footer">
                            <div className="userName">{value.userName}</div>
                        </div>
                    </div>
                )

            })}
        </div>
      
    </div>
  )
}

export default Profile
