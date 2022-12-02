import React from "react";
import Form from "react-bootstrap/Form";
import "./createRequest.css";
import Button from "react-bootstrap/Button";

export default function CreateRequest() {
  return (
    <div className="container">
      <div className="header-staff">
        <div className="header-staff-nav">
          <h2>Create Request</h2>
          <a href="/">Home</a>
          <a href="/createrequest">Create Request</a>
          <a href="/myrequest">My Request</a>
        </div>
      </div>

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
        <div className="right-form">
          <label htmlFor="">Expected approve</label>
          <input type="date" />

          <label htmlFor="">Approver</label>
          <input type="date" />

          <label htmlFor="">Time pull request</label>
          <input type="time" />

          <label htmlFor="">Note</label>
          <textarea type="text" />

          <div className="request-button">
            <Button variant="primary">Send Request</Button>{" "}
            <Button variant="secondary">Close</Button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
