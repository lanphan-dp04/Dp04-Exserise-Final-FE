import React from "react";
import Form from "react-bootstrap/Form";
import "./createRequest.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";

function CreateRequest() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  return (
    <div>
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
              <input type="number" />

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

export default CreateRequest;
