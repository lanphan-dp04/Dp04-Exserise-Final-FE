import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import "./EditUser.scss"
import Button from "react-bootstrap/esm/Button";

export default function EditUser() {
    const { id } = useParams();
    let history = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        getUserByID();
    },[]);

    const getUserByID = async() => {
        const response = await axios.get(`http://localhost:5000/user/${id}/edit`);
        setUserName(response.data.userName);
        setPassword(response.data.password);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setRole(response.data.role);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/user/${id}`, {
            userName,
            password,
            email,
            phoneNumber,
            role
        },
        alert("Update success!!!")
        );
        } catch (error) {
            console.log(error);
        }
        history("/list");
    }

    return (
        <div className="container-register">
            <div className="main-register">
                <form className="form-group container" onSubmit={handleSubmit}>
                    <h2 className="text-center text-create-user">Edit an User</h2>
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
                            defaultValue={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="form-name">
                        <label className="form-lable" htmlFor="inputPassword4">
                            Password <span className="text-color-red">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control input-name"
                            id="inputPassword"
                            placeholder="Enter password..."
                            defaultValue={password}
                            onChange={e => setPassword(e.target.value)}
                        ></input>
                    </div>

                    <div className="form-name">
                        <label className="form-lable" htmlFor="inputEmail">
                            Email <span className="text-color-red">*</span>
                        </label>
                        <input
                            className="form-control input-name"
                            placeholder="Enter email..."
                            id="email"
                            defaultValue={email}
                            onChange={e => setEmail(e.target.value)}
                        />
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
                            defaultValue={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-name">
                        <label className="form-lable" htmlFor="inputPassword4">Role</label>
                        <Form.Select aria-label="Default select example" type="Number" name="role" id="role" className="input-name"
                            defaultValue={role}
                            onChange={e => setRole(e.target.value)}
                        >
                            <option value="0">User</option>
                            <option value="1">Master</option>
                        </Form.Select>
                    </div>
                    <div className="content-btn">
                        <button className="btn btn-success" type="submit">
                            Update User
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
