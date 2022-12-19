import axios from "axios";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./EditUser.scss"

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
    required: "Phone number is required",
    pattern: "Please enter the correct phone number format"
};

export default function EditUser() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { id } = useParams();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        getUserByID();
    }, []);

    const getUserByID = async () => {
        const response = await axios.get(`http://localhost:5000/user/${id}/edit`);
        setUserName(response.data.userName);
        setPassword(response.data.password);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setRole(response.data.role);
    }

    const onSubmit = async (e) => {
        await axios.put(`http://localhost:5000/user/${id}`, {
            userName,
            password,
            email,
            phoneNumber,
            role
        })
            .then((res) => {
                toast.success("Update User successfully!!!", { autoClose: 1000 })
            })
            .catch((errors) => {
                toast.error("Phone number already exists. please re-enter new number phone  !!!", { autoClose: 2000 })
            });
    }

    return (
        <div className="container-register">
            <div className="main-register">
                <form className="form-group container" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-center text-create-user">Edit an User</h2>
                    <div className="form-name-e ">
                        <label className="form-lable" htmlFor="inputFullname">
                            Full Name <span className="text-color-red">*</span>
                        </label>
                        <input
                            className="form-control input-name"
                            type="text"
                            name="userName"
                            id="userName"
                            placeholder="Enter user name..."
                            defaultValue={userName}
                            onChange={e => setUserName(e.target.value)}
                            ref={register({required:"This is required."})}
                            />
                    </div>
                    <div className="form-name-e">
                        <label className="form-lable" htmlFor="inputPassword4">
                            Password <span className="text-color-red">*</span>
                        </label>
                        <input
                            required
                            type="password"
                            name="password"
                            className="form-control input-name"
                            id="inputPassword"
                            placeholder="Enter password..."
                            defaultValue={password}
                            onChange={e => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div className="form-name-e ">
                        <label className="form-lable" htmlFor="inputFullname">
                            Number Phone <span className="text-color-red">*</span>
                        </label>
                        <input
                            required
                            className="form-control input-name"
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Enter number phone..."
                            defaultValue={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-name-e">
                        <label className="form-lable" htmlFor="inputEmail">
                            Email <span className="text-color-red">*</span>
                        </label>
                        <input
                            required
                            className="form-control input-name"
                            placeholder="Enter email..."
                            id="email"
                            defaultValue={email}
                            disabled
                        />
                    </div>
                    <div className="content-btn">
                        <button className="btn btn-success" type="submit">
                            Update
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
