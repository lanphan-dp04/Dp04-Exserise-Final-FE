import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Register.scss";
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const ERROR_EMAIL = {
  required: "Email address is required",
  pattern: "Please include an '@' in the email address ",
};
const ERROR_FULLNAME = {
  required: "Fullname is required",
  pattern: "Fullname cannot have special characters",
};

const ERROR_PASSWORD = {
  required: "Password is required",
};
const ERROR_PHONENUMBER = {
  required: "Phone number is required",
  pattern: "Please enter the correct phone number format"
};

export default function Register() {
  const LINK_API = process.env.REACT_APP_API;

  let { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    axios
      .post(`${LINK_API}/user/create`, data)
      .then(() => {
        e.target.reset();
        toast.success("Create new Staff successfully!!!", { autoClose: 1000 })
      })
      .catch((error) => {
        toast.error("Email or phone number already exists. please re-enter!!!", { autoClose: 2000 })
        return error;
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
                pattern: /^[^!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+$/,
                message: "Fullname is required",
                minLength: {
                  value: 4,
                  message: "Min length is 4",
                },
              })}
            />
            <p className="color-err">{errors.userName?.message}</p>
            <p className="color-err">
              {errors.userName?.type === "pattern" ? ERROR_FULLNAME?.pattern : ""}
            </p>
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
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter number phone..."
              {...register("phoneNumber", {
                required: ERROR_PHONENUMBER?.required,
                pattern: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
                message: "Number is required",
                minLength: {
                  value: 10,
                  message: "Min length is 10",
                },
                maxLength: {
                  value: 11,
                  message: "Max length is 11",
                },
              })}
            />
            <p className="color-err">{errors.phoneNumber?.message}</p>
          </div>
          <div className="form-name">
            <label className="form-lable" htmlFor="inputPassword4">Role <span className="text-color-red">*</span></label>
            <Form.Select aria-label="Default select example" type="text" name="role" id="role" className="input-name" disabled
              {...register("role")}>
              <option value="staff">Staff</option>
            </Form.Select>
          </div>
          <div className="content-btn">
            <button className="btn btn-success" type="submit">
              Add
            </button>
            <ToastContainer />
            <Link className="link-btn" to={`/list`}>
              <Button variant="primary">Back</Button>{' '}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
