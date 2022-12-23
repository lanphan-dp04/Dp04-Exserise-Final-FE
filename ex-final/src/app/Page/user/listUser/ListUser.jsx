import "./ListUser.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, Table } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loanding from "../../../components/loading/Loanding";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function ListUser() {

  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const LINK_API = process.env.REACT_APP_API;
  const apiListData = `${LINK_API}/user/list`;
  const isId = useSelector((state) => state.auth.login.currentUser._id);

  async function getUserData() {

    try {
      let response = await axios.get(apiListData);
      let temp = await response.data;
      const resData = temp.filter(item => (item._id !== isId))
      setDataUser(resData);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      return err;
    }
  }
  useEffect(() => {
    setLoading(true);
    getUserData(apiListData);
  }, [])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleClickDeleteUser = id => {
    setId(id);
    setShow(true);
  }

  const deleteUser = async id => {
    await axios.delete(`${LINK_API}/user/${id}/delete`)
      .then((res) => setShow(false));
    getUserData();
    toast.success("Delete member successfully!!!", { autoClose: 1500 });
  }

  const setData = (data) => {
    let { _id, userName, email, password, role, phoneNumber } = data;
    localStorage.setItem("_id", _id);
    localStorage.setItem("userName", userName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("role", role);
    localStorage.setItem("phoneNumber", phoneNumber);
  }

  return (
    <div>
      {loading ? <Loanding /> :
        <div className="container mt-4">
          <div className="container item-top">
            <h2>User Table</h2>
          </div>
          <div className="container">
            <Table striped bordered hover>
              <thead className="thead-light">
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
                {dataUser.length > 0 ? (dataUser.map((item, index) => {
                  return (
                    <tr key={item?._id}>
                      <td className="text-size-m item-data-m"><span className="">{index + 1}</span></td>
                      <td className="text-size-m item-data-m">{item?.role}</td>
                      <td className="text-size-m item-data-m">{item?.userName}</td>
                      <td className="text-size-m item-data-m">{item?.email}</td>
                      <td className="text-size-m item-data-m">{item?.phoneNumber}</td>
                      <td className="text-size-m item-data-m">
                        <Link className="link-btn" to={`detail/${item._id}`}>
                          <Button variant="primary"><EyeOutlined /></Button>{' '}
                        </Link>
                        <Link className="link-btn" to={`edit/${item._id}`}>
                          <Button variant="warning" onClick={() => setData(dataUser)}><EditOutlined /></Button>{' '}
                        </Link>
                        <Button variant="danger" onClick={() => handleClickDeleteUser(item._id)}><DeleteOutlined /></Button>{' '}
                        <ToastContainer />
                      </td>
                    </tr>
                  )
                })) :
                  <tr>
                    <td>NO Data</td>
                  </tr>
                }

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
                <Button variant="danger" onClick={() => { deleteUser(id) }}>
                  Deleted
                </Button>
                <ToastContainer />
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      }
    </div>
  );
}
