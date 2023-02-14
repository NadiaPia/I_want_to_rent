import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';


function Item() {

    let { id } = useParams();
    const [itemObject, setItemObject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3002/items/${id}`).then((response) => {
            console.log("response.data", response.data)
            setItemObject(response.data)
        })
        .catch(err => console.log(err))
    }, [])
  return (
    <div className="itemPage">
        <div className="item" id="idividual">
          <div className="title">{itemObject.title}</div>
          <div className="description">{itemObject.description}</div>
          <div className="username">{itemObject.userName}</div>
          <div className="price">{itemObject.price}</div>
          <div className="photo">{itemObject.photo?.type}</div>  {/*? is because of the second level of the key.*/}
        </div>
      
    </div>
  )
}

export default Item
