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
import { Button, Tag } from "antd";
import Moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import Loanding from "../../../components/loading/Loanding";
import { getData, listKey } from "../../../helpers/common";

function DayOff() {
  const [listDayOff, setListDayOff] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  // const userId = useSelector((state) => state.auth.login.currentUser._id);
  // const role = useSelector((state) => state.auth.login.currentUser.role);
  const userId = getData(listKey.user)._id;
  const role = getData(listKey.user).role;
  
  const LINK_API = process.env.REACT_APP_API;
  const requestStaff = `${LINK_API}/requests/${userId}`;
  const requestAdmin = `${LINK_API}/requests`;
  const pathRequests = (role === 'staff') ? requestStaff : requestAdmin;

  useEffect(() => {
    const api = `${pathRequests}`;
    axios
      .get(api)
      .then((res) => {
        const data = res.data.filter(
          (item) =>
            item.status === `Approved` ||
            item.status === "Rejected" ||
            item.status === "Cancled" ||
            item.status === "Reverted"
        );
        const resData = [...data].reverse();
        setListDayOff(resData);
      })
      .catch((error) => {
        return error;
      });
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  const colorStatus = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      case "Requested":
        return "warning";
      case "Cancled":
        return "default";
      default:
        return null;
    }
  };

  const filteredListDayOff = useMemo(() => {
    if (status === "") return listDayOff;

    const data = listDayOff.filter((item) => item.status === status);
    return data;
  }, [listDayOff, status]);

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
    <div>
      {loading ? (
        <Loanding />
      ) : (
        <div className="container">
          <div className="header-staff">
            <div className="header-staff-nav">
              <h2>Day Off</h2>
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
              {filteredListDayOff.length > 0 ? (filteredListDayOff.map((item, index) => {
                const formatDate = "YYYY-MM-DD";
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      {Moment(item.fromDay).format(formatDate)} -{" "}
                      {Moment(item.toDay).format(formatDate)}
                    </td>
                    <td>{item.quantity}</td>
                    <td className="text-primary">{item.userName || item.userId.userName}</td>
                    <td>
                      <Tag color={colorStatus(item.status)}>{item.status}</Tag>
                    </td>
                    <td>{Moment(item.createdAt).format(formatDate)}</td>
                    <td>
                      <Link to={`/dayoff/${item._id}`} type="button">
                        <Button icon={<EyeOutlined />} type="primary"></Button>
                      </Link>
                    </td>
                  </tr>
                );
              })) : <tr>
                <td colSpan={12}>No Data</td>
              </tr>}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default DayOff;
