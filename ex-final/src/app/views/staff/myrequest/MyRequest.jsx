import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./myrequest.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function MyRequest() {
  const [listDayOff, setListDayOff] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const api = "https://636dab7a91576e19e32cef5d.mockapi.io/joinUs";
    axios
      .get(api)
      .then((res) => {
        setListDayOff(res.data);
        console.log("listdayoff", res.data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  });

  return (
    <div className="container">
      <div className="header-staff">
        <div className="header-staff-nav">
          <h2>My Request</h2>
          <a href="/">Home</a>
          <a href="#" type="button" onClick={handleShow}>
            Create Request
          </a>
          <a href="/myrequest">My Request</a>
        </div>
      </div>

      <Table className="table-myrequest">
        <thead>
          <tr className="table-title">
            <th className="col-index">No </th>
            <th className="col-2">Request Type </th>
            <th className="col-2">Time day off</th>
            <th className="col-1">Duration</th>
            <th className="col-3">Reason</th>
            <th className="col-2">Approver</th>
            <th className="col-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {listDayOff.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.requestTIme}</td>
                <td>{item.timeDayOff}</td>
                <td>{item.Duration}</td>
                <td>{item.approver}</td>
                <td>{item.requestTime}</td>
                <td>{item.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Day Off Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="createquest-form">
            <div className="left-form">
              <label htmlFor="">Type Request</label>
              <Form.Select className="col-5">
                <option>Work From Home</option>
                <option value="1">Day Off</option>
                <option value="2">Working OutSide</option>
              </Form.Select>

              <label htmlFor="">Start day</label>
              <input type="date" />

              <label htmlFor="">End day</label>
              <input type="date" />

              <label htmlFor="">Quantily</label>
              <input type="number" step="0.5" />

              <label htmlFor="">Reason</label>
              <textarea type="text" />
            </div>
          </div>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Send Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyRequest;
