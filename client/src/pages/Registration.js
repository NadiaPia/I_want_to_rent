import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; //a library that is for validation data inserting into the Form


function Registration() {

    const initialValues = {
        userName: "",
        password: "",

     };

     const validationSchema = Yup.object().shape({    
        userName: Yup.string().min(3).max(15).required("name is a required field"),
        password:Yup.string().min(4).max(20).required("password is a required field"),
    })

    const onSubmit =(data) => {
        axios.post("http://localhost:3002/auth", data).then(() => {
            console.log(data)
        })
    }

  return (
    <div className="registration">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
           
            <label>username</label>
            <ErrorMessage name="userName" component="span"/>
            <Field
                autoComplete="off"
                id="inputCteateItem"
                name="userName"
                placeholder="username..."                             
            />

            <label>password</label>
            <ErrorMessage name="password" component="span"/>
            <Field
                autoComplete="off"
                type="password"
                id="inputCteateItem"
                name="password"
                placeholder="password..."                                  
            />

            <button type="submit">Register</button>

        </Form>
      </Formik>
    </div>
  )
}

export default Registration;
