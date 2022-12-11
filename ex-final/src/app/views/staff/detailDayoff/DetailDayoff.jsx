import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./detaildayoff.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

import { Modal } from "antd";

export default function DetailDayoff() {
  const [dayOffWithId, setDayOffWithId] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const paramId = useParams();

  console.log("paramId", paramId.id);
  useEffect(() => {
    const api = `https://636dab7a91576e19e32cef5d.mockapi.io/dayoff/${paramId.id}`;
    axios
      .get(api)
      .then((res) => {
        setDayOffWithId(res.data);
        console.log("dayOffWithId", dayOffWithId);
      })

      .catch((error) => {
        console.log("err", error);
      });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="container">
      <div className="layout-detaildayoff">
        <div className="detail-dayoff">
          <h4>Basic Information</h4>
          <table>
            <tr>
              <th className="">From:</th>
              <td>{dayOffWithId.fromDay}</td>
            </tr>
            <tr>
              <th>To:</th>
              <td>{dayOffWithId.toDay}</td>
            </tr>
            <tr>
              <th>Time:</th>
              <td>{dayOffWithId.partialDay}</td>
            </tr>
            <tr>
              <th>Quantify:</th>
              <td>{dayOffWithId.quantity}</td>
            </tr>
            <tr>
              <th>Reason:</th>
              <td>{dayOffWithId.reason}</td>
            </tr>
            <tr>
              <th>Status:</th>
              <td>{dayOffWithId.status}</td>
            </tr>
          </table>

          <div className="box-action">
            <h4>Action: </h4>
            <button className="action-revert" onClick={showModal}>
              <span>
                {" "}
                <FontAwesomeIcon icon={faClockRotateLeft} />
              </span>{" "}
            </button>

            <Modal
              title="Reason for revert"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <textarea
                name=""
                id=""
                rows="3"
                style={{ padding: "10px", width: "100%", borderRadius: "5px" }}
              ></textarea>
            </Modal>
          </div>
        </div>
        <div className="histories">
          <h4>History</h4>
          <div className="box-histories">
            <h6>Request</h6>
            <p>Khoa Nguyen requested</p>
            <div className="history-request">
              <p>From: 2022-10-22</p>
              <p>To: 2022-10-22</p>
              <p>Time: 2022-10-22</p>
              <p>Quantity: 2022-10-22</p>
              <p>Reason: 2022-10-22</p>
            </div>

            <h6>Approved</h6>
            <p>Khoa Nguyen requested</p>

            <h6>Request Change</h6>
            <p>Khoa Nguyen requested</p>

            <h6>Day Off</h6>
            <p>Khoa Nguyen requested</p>
          </div>
        </div>
      </div>
    </div>
  );
}
