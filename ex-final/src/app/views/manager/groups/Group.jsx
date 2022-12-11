// import { React, useEffect, useState } from "react";
// import { Table } from "antd";
// import "./groups.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Popover } from "antd";
// import ColumnGroup from "antd/es/table/ColumnGroup";

// const Group = () => {
//   const [listdata, setListdata] = useState([]);

//   useEffect(() => {
//     const api = "https://636dab7a91576e19e32cef5d.mockapi.io/member";
//     axios
//       .get(api)
//       .then((res) => {
//         setListdata(res.data);
//         console.log("listday", res.data);
//       })
//       .catch((error) => {
//         console.log("err", error);
//       });
//   }, []);

//   const columns = [
//     {
//       title: "Group Name",
//       dataIndex: "group",
//       width: "150px",
//       display: "flex",
//     },
//     {
//       title: "Members",
//       dataIndex: "",
//       width: "40%",

//       render: () => (
//         <div className="member-wraper">
//           {listdata.map((item, index) => {
//             return (
//               <div className="group-boxmember">
//                 <Popover content={item.name} title="Name">
//                   <img className="member-avatar" src={item.avatar} alt="st" />
//                 </Popover>
//                 {/* <p className="member-content">{item.name}</p> */}
//               </div>
//             );
//           })}
//         </div>
//       ),
//     },
//     {
//       title: "Master(s)",
//       dataIndex: "master",
//       width: "40%",

//       render: () => (
//         <div className="member-wraper">
//           {listdata.map((item, index) => {
//             return (
//               <div className="group-boxmember">
//                 <img className="member-avatar" src={item.avatar} alt="st" />
//                 {/* <p className="member-content">{item.name}</p> */}
//               </div>
//             );
//           })}
//         </div>
//       ),
//     },
//     {
//       title: "Detail",
//       dataIndex: "",
//       width: "100px",

//       render: () => (
//         <Link to="/group/detail" className="viewdetal-button">
//           View
//         </Link>
//       ),
//     },
//   ];

//   return (
//     <div className="container group-container">
//       <div className="box-title">
//         <h3>Groups </h3>
//       </div>
//       <div className="newgroup">
//         <button>
//           <span>
//             <FontAwesomeIcon icon={faPlus} />
//           </span>
//           Newgroup
//         </button>
//       </div>
//       <div className="box-content">
//         <Table columns={columns} dataSource={listdata} bordered />
//       </div>
//     </div>
//   );
// };
// export default Group;
import "../../../Page/user/listUser/ListUser.scss";
import axios from "axios";
import { Button, Modal, Table } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
export default function ListUser() {
  let history = useNavigate();

  // id update and delete
  const [id, setId] = useState("");

  const [dataUser, setDataUser] = useState([]);
  const apiListData = "http://localhost:5000/group/list";

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

  // modal delete
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
    let { _id, userName, email, password, role, phoneNumber } = data;
    localStorage.setItem("_id", _id);
    localStorage.setItem("userName", userName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("role", role);
    localStorage.setItem("phoneNumber", phoneNumber);
  }

  return (
    <div className="container mt-4">
      <div className="container item-top header-group">
        <h2>Group Table</h2>
        <div className="box-addnewmember">
          <p>
            <Link to="" type="button">
              <span>
                {" "}
                <FontAwesomeIcon icon={faPlus} />
              </span>
              New Group
            </Link>
          </p>
        </div>
      </div>
      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-size col-1">STT</th>
              <th className="text-size col-2">Group Name</th>
              <th className="text-size col-3">Members</th>
              <th className="text-size col-2">Master(s)</th>
              <th className="text-size col-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td className="text-size-m item-data-m"><span className="">{index + 1}</span></td>
                  <td className="text-size-m item-data-m">{item.nameGroup}</td>
                  <td className="text-size-m item-data-m">
                    {item.memberID.map((member) => {
                      return (
                        <img key={member._id} className="user-group" src={member?.avatar} alt="member"></img>
                      )
                    })}
                  </td>
                  <td className="text-size-m item-data-m">
                    {item.masterID.map((master) => {
                      return (
                        <img key={master._id} className="user-group" src={master?.avatar} alt="member"></img>
                      )
                    })}
                  </td>
                  <td className="text-size-m item-data-m">
                    <Link className="link-btn" to={`/group/detail/${item._id}`}>
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
