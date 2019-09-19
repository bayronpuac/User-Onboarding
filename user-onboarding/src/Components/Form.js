import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  }, [status]);

  return (
    <div className="user-form">
      <Form>
        <Field type="text" name="name" placeholder="Place name here" />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}

        <Field type="text" name="email" placeholder="Place email here" />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}

        <Field type="text" name="password" placeholder="password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label>
          Terms of Srvice
          <Field
            type="checkbox"
            name="Terms"
            checked={values.Terms}
          />
          {touched.Terms  && errors.Terms && (
          <p className="error">{errors.Terms}</p>
        )}
        </label>

        <button>Submit!</button>
      </Form>
      {user.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
        </ul>
      ))}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    Terms: Yup.string().required()
  }),
  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log(res);
        setStatus(res.data);
      })
      .catch(err => console.log(err.res));
  }
})(UserForm);
console.log("This is the HOC", FormikUserForm);
export default FormikUserForm;
