import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Register.scss";
import Form from 'react-bootstrap/Form';

const ERROR_EMAIL = {
  required: "Email Address is required",
  pattern: "Please include an '@' in the email address ",
};

export default function Register() {
  let { id } = useParams();
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
      <div className="main-register">
        <form className="form-group container" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center text-create-user">Create an User</h2>
          <div className="form-name ">
            {/* <label className="form-lable" htmlFor="inputFullname">
              Full Name
            </label> */}
            <input
              required
              className="form-control"
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Fullname..."
              {...register("fullname", {
                required: true,
                minLength: {
                  value: 4,
                  message: "Min length is 8",
                },
              })}
            />
            <p className="color-err">{errors.fullname?.message}</p>
          </div>
          <div className="form-name">
            {/* <label className="form-lable" htmlFor="inputEmail">
              Email
            </label> */}
            <input
              required
              className="form-control"
              placeholder="username@gmail.com"
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
                {/* <label className="form-lable" htmlFor="inputPassword4">
                  Password
                </label> */}
                <input
                  type="password"
                  name="password"
                  className={`form-control`}
                  id="inputPassword"
                  placeholder="Enter Password..."
                  {...register("password", {
                    required: true,
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
          {/* <div className="form-name">
            <select
              className=" form-control custom-select" id="inputGroupSelect04"
              {...register("gender")}
            >
              <option value="0">User</option>
              <option value="1">master</option>
            </select>
          </div> */}
          <Form.Select aria-label="Default select example"
            {...register("gender")}>
            <option value="user">User</option>
            <option value="master">master</option>
          </Form.Select>
          <div className="content-btn">
            <button className="btn btn-primary" type="submit">
              Add
            </button>
            <button className="btn btn-primary">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
