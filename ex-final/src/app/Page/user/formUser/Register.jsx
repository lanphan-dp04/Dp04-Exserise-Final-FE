import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import Button from "react-bootstrap/esm/Button";

const ERROR_EMAIL = {
  required: "Email address is required",
  pattern: "Please include an '@' in the email address ",
};
const ERROR_FULLNAME = {
  required: "Fullname is required",
};
const ERROR_PASSWORD = {
  required: "Password is required",
};
const ERROR_PHONENUMBER = {
  required: "Password is required",
};

export default function Register() {
  let { id } = useParams();
  let history = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/create", data)
      .then((response) => {
        console.log(response.data);
        e.target.reset();
        alert("Saved successfully.");
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
            <label className="form-lable" htmlFor="inputFullname">
              Full Name <span className="text-color-red">*</span>
            </label>
            <input
              className="form-control input-name"
              type="text"
              name="userName"
              id="userName"
              placeholder="Enter user name..."
              {...register("userName", {
                required: ERROR_FULLNAME?.required,
                message: "Fullname is required",
                minLength: {
                  value: 8,
                  message: "Min length is 8",
                },
              })}
            />
            <p className="color-err">{errors.userName?.message}</p>
          </div>
          <div className="form-name">
            {!id && (
              <>
                <label className="form-lable" htmlFor="inputPassword4">
                  Password <span className="text-color-red">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control input-name"
                  id="inputPassword"
                  placeholder="Enter password..."
                  {...register("password", {
                    required: ERROR_PASSWORD?.required,
                    minLength: {
                      value: 6,
                      message: "Min length is 6",
                    },
                  })}
                ></input>
                <p className="color-err">{errors.password?.message}</p>
              </>
            )}
          </div>
          
          <div className="form-name">
            <label className="form-lable" htmlFor="inputEmail">
              Email <span className="text-color-red">*</span>
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
          <div className="form-name ">
            <label className="form-lable" htmlFor="inputFullname">
              Number Phone <span className="text-color-red">*</span>
            </label>
            <input
              className="form-control input-name"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter number phone..."
              {...register("phoneNumber", {
                required: ERROR_PHONENUMBER?.required,
                message: "Number is required",
                minLength: {
                  value: 10,
                  message: "Min length is 10",
                },
                maxLength: {
                  value: 10,
                  message: "Max length is 10",
                },
              })}
            />
            <p className="color-err">{errors.phoneNumber?.message}</p>
          </div>
          <div className="form-name">
            <label className="form-lable" htmlFor="inputPassword4">Role</label>
            <Form.Select aria-label="Default select example" type="Number" name="role" id="role" className="input-name"
              {...register("role")}>
              <option value="0">User</option>
              <option value="1">Master</option>
            </Form.Select>
          </div>
          <div className="content-btn">
            <button className="btn btn-success" type="submit">
              Add
            </button>
            <Link className="link-btn" to={`/list`}>
              <Button variant="primary">Back</Button>{' '}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
