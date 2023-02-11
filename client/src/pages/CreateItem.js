import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; //a library that is for validation data inserting into the Form
import { useNavigate } from 'react-router-dom';


function CreateItem() {
     let navigate = useNavigate();

     const initialValues = {
        title: "",
        description: "",
        userName: "",
        price: 0,
        photo: ""

     };

     const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string().required(),
        userName: Yup.string().min(3).max(15).required("name is a required field"),
        price: Yup.number().required(),
        photo: Yup.string().required(),
    })

    const onSubmit = (data) => {
       
        axios.post("http://localhost:3002/items", data).then((response) => {
            navigate("/")
        })
    }

  return (
    <div className="createItemPage">
      <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
            <label>Title</label>
            <ErrorMessage name="title" component="span"/>
            <Field
                autoComplete="off"
                id="inputCteateItem"
                name="title"
                placeholder="title..."                
            />

            <label>description</label>
            <ErrorMessage name="description" component="span"/>
            <Field
                autoComplete="off"
                id="inputCteateItem"
                name="description"
                placeholder="description..."                
            />

            <label>username</label>
            <ErrorMessage name="userName" component="span"/>
            <Field
                autoComplete="off"
                id="inputCteateItem"
                name="userName"
                placeholder="username..."
                             
            />

            <label>price</label>
            <ErrorMessage name="price" component="span"/>
            <Field
                autoComplete="off"
                id="inputCteateItem"
                name="price"
                placeholder="price..."             
            />

            <label>photo</label>
            <ErrorMessage name="photo" component="span"/>
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
