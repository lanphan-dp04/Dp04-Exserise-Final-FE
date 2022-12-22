import "../../../Page/user/listUser/ListUser.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Loanding from "../../../components/loading/Loanding";
import { useSelector } from "react-redux";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

export default function ListUser() {
  const userId = useSelector((state) => state.auth.login.currentUser._id);
  const [id, setId] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const LINK_API = process.env.REACT_APP_API;

  const apiListData = `${LINK_API}/group/lists/${userId}`;

  async function getUserData() {
    try {
      let response = await axios.get(apiListData);
      let temp = await response.data;
      setDataUser(temp);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      return err;
    }
  }
  useEffect(() => {
    setLoading(true);
    getUserData();
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleClickDeleteUser = (id) => {
    setId(id);
    setShow(true);
  };

  const deleteUser = async (id) => {
    await axios.delete(`${LINK_API}/group/delete/${id}`).then((res) => {
      setShow(false);
      toast.success("Update Group successfully!!!", { autoClose: 2000 });
      getUserData();
    });
  };
  const role = useSelector((state) => state.auth.login.currentUser.role);
  const buttonCreateGroup = (
    <div className="box-addnewmember">
      <p>
        <Link to="/group/create" type="button">
          <span>
            {" "}
            <FontAwesomeIcon icon={faPlus} />
          </span>
          New Group
        </Link>
      </p>
    </div>
  );
  const thAction = <th className="text-size col-2">Action</th>;
  const renderCreateGroup =
    role === "manager" || role === "admin" ? buttonCreateGroup : "";
  const renderthAction = role === "manager" || role === "admin" ? thAction : "";
  const isAction = role === "manager" || role === "admin" ? true : false;

  return (
    <div>
      {loading ? (
        <Loanding />
      ) : (
        <div className="container mt-4">
          <div className="container item-top header-group">
            <h2>Group Table</h2>
            {renderCreateGroup}
          </div>
          <div className="container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-size col-1">STT</th>
                  <th className="text-size col-2">Group Name</th>
                  <th className="text-size col-4">Members</th>
                  <th className="text-size col-3">Master(s)</th>
                  {renderthAction}
                </tr>
              </thead>
              <tbody>
                {dataUser.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td className="text-size-m item-data-m">
                        <span className="">{index + 1}</span>
                      </td>
                      <td className="text-size-m item-data-m">
                        {item.nameGroup}
                      </td>
                      <td className="text-size-m item-data-m">
                        {item.memberID.map((member) => {
                          return (
                            <Tooltip title={member.userName} placement="top">
                              <img
                                key={member._id}
                                className="user-group"
                                src={member?.avatar}
                                alt="member"
                              ></img>
                            </Tooltip>
                          );
                        })}
                      </td>
                      <td className="text-size-m item-data-m">
                        {item.masterID.map((master) => {
                          return (
                            <Tooltip title={master.userName} placement="top">
                              <img
                                key={master._id}
                                className="user-group"
                                src={master?.avatar}
                                alt="member"
                              ></img>
                            </Tooltip>
                          );
                        })}
                      </td>
                      {isAction && (
                        <td className="text-size-m item-data-m">
                          <Link
                            className="link-btn"
                            to={`/group/detail/${item._id}`}
                          >
                            <Button variant="primary mb-1">
                              <EyeOutlined />
                            </Button>{" "}
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => handleClickDeleteUser(item._id)}
                          >
                            <DeleteOutlined />
                          </Button>{" "}
                        </td>
                      )}
                    </tr>
                  );
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
                <ToastContainer />
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
