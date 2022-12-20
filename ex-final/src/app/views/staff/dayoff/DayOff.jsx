import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dayoff.css";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Button } from "antd";
import Moment from "moment";
import { EyeOutlined } from "@ant-design/icons";

function DayOff() {
  const [listDayOff, setListDayOff] = useState([]);
  const [status, setStatus] = useState("");

  const userId = useSelector((state) => state.auth.login.currentUser._id);
  const API_GET_REQUEST = process.env.REACT_APP_API_GET_REQUEST;

  useEffect(() => {
    const api = `${API_GET_REQUEST}/${userId}`;
    axios
      .get(api)
      .then((res) => {
        const data = res.data.filter(
          (item) =>
            item.status === "Approved" ||
            item.status === "Rejected" ||
            item.status === "Requested" ||
            item.status === "Cancled" ||
            item.status === "Reverted"
        );
        setListDayOff(data);
      })

      .catch((error) => {
        console.log("err", error);
      });
  }, []);

  const filteredListDayOff = useMemo(() => {
    if (status === "") return listDayOff;

    const data = listDayOff.filter((item) => item.status === status);
    return data;
  }, [listDayOff, status]);

  //filter

  const seeAll = () => {
    setStatus("");
  };
  const filterApproved = () => {
    setStatus("Approved");
  };

  const filterRejected = () => {
    setStatus("Rejected");
  };

  const filterReverted = () => {
    setStatus("Cancled");
  };

  return (
    <div className="container">
      <div className="header-staff">
        <div className="header-staff-nav">
          <h2>Day Off</h2>
          <Link to={"/request"}>Requests</Link>
          <Link to={"/create-request"}>Create Request</Link>
          <Link to={"/dayoff"}>Day Off</Link>
        </div>
      </div>

      <div className="box-filter">
        <button className="filter-approved" onClick={seeAll}>
          {" "}
          <span>
            {" "}
            <FontAwesomeIcon icon={faCheck} />
          </span>{" "}
          See All
        </button>
        <button className="filter-approved" onClick={filterApproved}>
          {" "}
          <span>
            {" "}
            <FontAwesomeIcon icon={faCheck} />
          </span>{" "}
          Approved day off
        </button>
        <button className="filter-rejected" onClick={filterRejected}>
          <span>
            {" "}
            <FontAwesomeIcon icon={faXmark} />
          </span>{" "}
          Rejected day off
        </button>
        <button className="filter-reverted" onClick={filterReverted}>
          <span>
            {" "}
            <FontAwesomeIcon icon={faClockRotateLeft} />
          </span>{" "}
          Reverted day off
        </button>
      </div>

      <Table className="table-myrequest">
        <thead>
          <tr className="table-title">
            <th className="col-index">No </th>
            <th className="col-4">Request for date</th>
            <th className="col-1">Quantify</th>
            <th className="col-2">Requester </th>
            <th className="col-2">Status</th>
            <th className="col-2">Request date</th>
            <th className="col-1">Detail</th>
          </tr>
        </thead>
        <tbody>
          {filteredListDayOff.map((item, index) => {
            const formatDate = "YYYY-MM-DD";
            return (
              <tr>
                <td>{index + 1}</td>
                <td>
                  {Moment(item.fromDay).format(formatDate)} -{" "}
                  {Moment(item.toDay).format(formatDate)}
                </td>
                <td>{item.quantity}</td>
                <td>{item.userName}</td>
                <td>{item.status}</td>
                <td>{Moment(item.createdAt).format(formatDate)}</td>
                <td>
                  <Link to={`/dayoff/${item._id}`} type="button">
                    <Button icon={<EyeOutlined />} type="primary"></Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default DayOff;
