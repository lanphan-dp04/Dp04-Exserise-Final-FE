import "./ListUser.scss";
import {Button, Modal, Table} from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListUser() {

  const [id, setId] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const apiListData = "http://localhost:5000/user/list";

  async function getUserData() {
    try {
      let response = await axios.get(apiListData);
      let temp = await response.data;
      setDataUser(temp);
    } catch (err) {
      return err;
    }
  }
  useEffect(() => {
    getUserData(apiListData);
  }, [])
  
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
  
  const handleClickDeleteUser = id => {
    setId(id);
    setShow(true);
  }

  const deleteUser = async id => {

    await axios.delete(`http://localhost:5000/user/${id}/delete`)
    .then((res) => setShow(false));
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
        <div className="container item-top">
          <h2>User Table</h2>
        </div>
        <div className="container"> 
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-size col-1">STT</th>
                <th className="text-size col-1">Role</th>
                <th className="text-size col-2">Full Name</th>
                <th className="text-size col-3">Email</th>
                <th className="text-size col-2">Phone Number</th>
                <th className="text-size col-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataUser.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td className="text-size-m item-data-m"><span className="">{index + 1}</span></td>
                    <td className="text-size-m item-data-m">{item?.role}</td>
                    <td className="text-size-m item-data-m">{item?.userName}</td>
                    <td className="text-size-m item-data-m">{item?.email}</td>
                    <td className="text-size-m item-data-m">{item?.phoneNumber}</td>
                    <td className="text-size-m item-data-m">
                      <Link className="link-btn" to={`detail/${item._id}`}>
                        <Button variant="primary">View</Button>{' '}
                      </Link>
                      <Link className="link-btn" to={`edit/${item._id}`}>
                        <Button variant="warning" onClick={() => setData(dataUser)}>Edit</Button>{' '}
                      </Link>
                      <Button variant="danger" onClick={() => handleClickDeleteUser(item._id)}>Delete</Button>{' '}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to delete this member?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={() => deleteUser(id)}>
                Deleted
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
  );
}
