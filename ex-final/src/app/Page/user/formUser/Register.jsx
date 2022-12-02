import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./Register.scss";

const ERROR_EMAIL = {
  required: "Email Address is required",
  pattern: "Please include an '@' in the email address ",
};
const ERROR_FULLNAME = {
  required: "Fullname is required",
};
const ERROR_PASSWORD = {
  required: "Password is required",
};

export default function Register() {
  let { id } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    axios
      .post("https://62d16e83d4eb6c69e7dd4ff6.mockapi.io/User", data)
      .then((response) => {
        console.log(response.data);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <div className="container-register">
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <div className="main-register" show={show} onHide={handleClose}>
        <form className="form-group container" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center text-create-user">Create an User</h2>
          <div className="form-name ">
            <label className="form-lable" htmlFor="inputFullname">
              Full Name
            </label>
            <input
              className="form-control input-name"
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Enter full name..."
              {...register("fullname", {
                required: ERROR_FULLNAME?.required, 
                message: "Fullname is required",
                minLength: {
                  value: 4,
                  message: "Min length is 8",
                },
              })}
            />
            <p className="color-err">{errors.fullname?.message}</p>
          </div>
          <div className="form-name">
            <label className="form-lable" htmlFor="inputEmail">
              Email
            </label>
            <input
              className="form-control input-name"
              placeholder="Enter email..."
              id="email"
              ref={() => register({ name: "email" })}
              {...register("email", {
                required: ERROR_EMAIL?.required,
                pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
              })}
            />
            <p className="color-err">{errors.email?.message}</p>
            <p className="color-err">
              {errors.email?.type === "pattern" ? ERROR_EMAIL?.pattern : ""}
            </p>
          </div>
          <div className="form-name">
            {!id && (
              <>
                <label className="form-lable" htmlFor="inputPassword4">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control input-name"
                  id="inputPassword"
                  placeholder="Enter Password..."
                  {...register("password", {
                    required: ERROR_PASSWORD?.required,
                    minLength: {
                      value: 8,
                      message: "Min length is 8",
                    },
                  })}
                ></input>
                <p className="color-err">{errors.password?.message}</p>
              </>
            )}
          </div>
          <div className="form-name">
            <label className="form-lable" htmlFor="inputPassword4">Gender</label>
            <Form.Select aria-label="Default select example" id="role" className="input-name"
              {...register("role")}>
              <option value="user">User</option>
              <option value="master">Master</option>
            </Form.Select></div>
          <div className="form-name">
            <div></div>
            <div></div>
          </div>
          <div className="content-btn">
            <button className="btn btn-success" type="submit">
              Add
            </button>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
