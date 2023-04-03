import React from 'react';
import axios from 'axios';
import { useEffect, useState, useContext } from "react";
import { useParams,  useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Item() {

    let { id } = useParams(); //let id = useParams().id ////now, in the Browser, we know the exact number that goes after "profile/" in the url (localhost:3000/items/4)
    const [itemObject, setItemObject] = useState({});
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]); //should be an array as later we will use it to .map that is used only for arrays
    const {authState} = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:3002/items/${id}`).then((response) => {
            console.log("response.data", response.data)
            setItemObject(response.data)
        })
        .catch(err => console.log(err))

        axios.get(`http://localhost:3002/comments/${id}`).then((response) => {
          setComments(response.data)
        })
    }, [])
      
    const addComment = () => {
      axios.post("http://localhost:3002/comments", {commentBody: newComment, ItemId: id}, {headers: {accessToken: localStorage.getItem("accessTokenn")}})
        .then((response) => {
          if (response.data.error) {
            alert (response.data.error)
          } else {
            //const commentToAdd = { 
              //commentBody: newComment, 
              //userName: response.data.userName
            //} // We use commentBody key here to make the same data structure that we await in the rendering of comments section
            console.log("response.dataresponse.dataresponse.data", response.data)
            //setComments([...comments, commentToAdd]) //here we don't wait for the server's response and add comment right away from the input -> newComment state
            setComments([...comments, response.data]) //here we use the comment that returned from the server
            setNewComment("") //to make an input field empty after add new comment            
          };
        })
    }

    const deleteComment = (id) => {
      axios.delete(`http://localhost:3002/comments/${id}`, 
      {headers: {accessToken: localStorage.getItem("accessTokenn")}})
      . then(() => {
        setComments(comments.filter((val) => {
          return val.id !== id
        }))
      })
    }

    const deleteItem = (id) => {
      axios.delete(`http://localhost:3002/items/${id}`,
      {headers: {accessToken: localStorage.getItem("accessTokenn")}})
      . then(() => {
        navigate("/")
      })
    }

    const editItem = (options) => {
      if (options === "title") {
        let newTitle = prompt("enter New Title") //when click on the title, the alert window pop up
        axios.put(`http://localhost:3002/items/title`, {
          newTitle: newTitle,
          id: id
        },
        {
          headers: {accessToken: localStorage.getItem("accessTokenn")}
        }
        );
        setItemObject({...itemObject, title: newTitle})
      } else {
        let newDescription = prompt("Enter New Description");
        axios.put(`http://localhost:3002/items/description`, {
          newDescription: newDescription,
          id: id
        },
        {
          headers: {accessToken: localStorage.getItem("accessTokenn")}
        }
        );
        setItemObject({...itemObject, description: newDescription})
      }

    }
    
  return (
    <div className="itemPage">
      <div className="leftSide">
        <div className="item" id="idividual">
          <div className="title" onClick={() => {if(authState.userName === itemObject.userName) {editItem("title")}}}>{itemObject.title}</div>
          <div className="description" onClick={() => {if(authState.userName === itemObject.userName) {editItem("description")}}}>{itemObject.description}</div>
          <div className="price">{itemObject.price}</div>
          <div className="photo">{itemObject.photo?.type}</div>  {/*? is because of the second level of the key.*/}
          <div className="username">
            {itemObject.userName}
            {authState.userName === itemObject.userName && (<button onClick={() => deleteItem(itemObject.id)}>delete</button>)}  {/*only the owner of the post are able to see a delete button */}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input 
            type="text" 
            placeholder='Comment...' 
            autoComplete="off"
            value={newComment}
            onChange={(event) => {setNewComment(event.target.value)}}

          />
          <button onClick={addComment}>Add Comment</button>

        </div>
        <div className="ListOfComments">
          {comments.map((comment, key) => {
            return <div key={key} className="comment">
              {comment.commentBody}
              <label>Username{comment.userName}</label>
              {authState.userName === comment.userName && <button onClick={() => {deleteComment(comment.id)}}>delete</button>} {/*we know the "comment.id" from the comment(map) and we pass it as an argument to this function */}
            </div> /*comment - array of objects => render the text of the comment we can only via the comment.commentBody*/

          })}
        </div>
      </div>
      
    </div>
  )
};

export default Item;
