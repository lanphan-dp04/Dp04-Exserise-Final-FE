import "./ListUser.scss"
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ListUser() {
  let history = useNavigate();

  // id update and delete
  const [id, setId] = useState("");
  
  const [dataUser, setDataUser] = useState([]);
  const apiListData = "http://localhost:5000/user/list";

  async function getUserData() {
    try {
      let response = await axios.get(apiListData);
      let temp = await response.data;
      setDataUser(temp);
      console.log(temp);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  }
  useEffect(() => {
    getUserData(apiListData);
  }, [])
  
  const deleteUser = async id => {
    await axios.delete(`http://localhost:5000/user/${id}/delete`)
    .then((res) => alert("deleted success"));
    getUserData();
  }

  const setData = (data) => {
    let {_id,userName, email, password, role, phoneNumber} = data;   
        localStorage.setItem("_id", _id);
        localStorage.setItem("userName", userName);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("role", role);
        localStorage.setItem("phoneNumber", phoneNumber);
 }

  return (
    <div className="container mt-4">
      <div className="mt-4 mb-4">
        <h2>User Table</h2>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td className="item-data">{index + 1}</td>
                  <td className="item-data">{item?.userName}</td>
                  <td className="item-data">{item?.email}</td>
                  <td className="item-data">{item?.phoneNumber}</td>
                  <td className="item-data">
                    <Link className="link-btn" to={`form`}>
                      <Button variant="primary">Add</Button>{' '}
                    </Link>
                    <Link className="link-btn" to={`edit/${item._id}`}>
                      <Button variant="warning" onClick={() => setData(dataUser)}>Edit</Button>{' '}
                    </Link>
                    <Button variant="danger" onClick={() => deleteUser(item._id)}>Delete</Button>{' '}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
