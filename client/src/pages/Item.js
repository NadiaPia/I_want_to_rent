import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';


function Item() {

    let { id } = useParams();
    const [itemObject, setItemObject] = useState({});
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]); //should be an array as later we will use it to .map that is used only for arrays

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
      axios.post("http://localhost:3002/comments", {commentBody: newComment, PostId: id})
        .then((response) => {
          //const commentToAdd = { commentBody: newComment} // We use commentBody key here to make the same data scructure that we await in thr rendering of comments section
          //setComments([...comments, commentToAdd]) //here we don't wait for the server's response and add comment right away from the input -> newComment state
          setComments([...comments, response.data]) //here we use the comment that returned from the server
          setNewComment("") //to make an input field empty after add new comment

        })
    }
  return (
    <div className="itemPage">
      <div className="leftSide">
        <div className="item" id="idividual">
          <div className="title">{itemObject.title}</div>
          <div className="description">{itemObject.description}</div>
          <div className="username">{itemObject.userName}</div>
          <div className="price">{itemObject.price}</div>
          <div className="photo">{itemObject.photo?.type}</div>  {/*? is because of the second level of the key.*/}
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
            return <div key={key} className="comment">{comment.commentBody}</div> /*comment - array of objects => render the text of the comment we can only via the comment.commentBody*/

          })}
        </div>
      </div>
      
    </div>
  )
};

export default Item;
