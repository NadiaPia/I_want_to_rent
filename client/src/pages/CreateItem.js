import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; //a library that is for validation data inserting into the Form
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";



function CreateItem() {
  let navigate = useNavigate();

  const { authState, setAuthState } = useContext(AuthContext);

  const initialValues = {
    title: "",
    description: "",
    price: 0,
    photo: ""
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.number().required(),
    photo: Yup.string().required(),
  })

  //data is collected in Formik
  const onSubmit = (data) => {

    axios.post("http://localhost:3002/items", data, {headers: {accessToken: localStorage.getItem("accessTokenn")}}).then((response) => {
      navigate("/")
    })
  }

  useEffect(() => {
    if(!authState.status) {
        navigate("/login")
    }
}, [authState.status])   //when click on logout button from the Home page, we go authomatically to the login page only if authState.status chanches


  return (
    <div className="createItemPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title</label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCteateItem"
            name="title"
            placeholder="title..."
          />

          <label>description</label>
          <ErrorMessage name="description" component="span" />
          <Field
            autoComplete="off"
            id="inputCteateItem"
            name="description"
            placeholder="description..."
          />         

          <label>price</label>
          <ErrorMessage name="price" component="span" />
          <Field
            autoComplete="off"
            id="inputCteateItem"
            name="price"
            placeholder="price..."
          />

          <label>photo</label>
          <ErrorMessage name="photo" component="span" />
          <Field
            autoComplete="off"
            id="inputCteateItem"
            name="photo"
            placeholder="photo..."
          />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateItem
