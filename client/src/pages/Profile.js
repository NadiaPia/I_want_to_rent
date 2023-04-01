import React from 'react';
import { useParams } from 'react-router-dom'; //useParams - is for grabing a parametr from the url in the browser ...profile/:id in React

function Profile() {

    let { id } = useParams() //now, in the Browser, we know the exact number that goes after "profile/" in the url (localhost:3000/profile/4)
    
  return (
    <div>
      
    </div>
  )
}

export default Profile
