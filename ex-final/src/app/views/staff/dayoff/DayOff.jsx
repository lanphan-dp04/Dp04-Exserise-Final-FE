import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dayoff.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faRectangleXmark,
  faSquarePen,
  faSquareCaretLeft,
  faXmark,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

function DayOff() {
  const [listDayOff, setListDayOff] = useState([]);

  useEffect(() => {
    const api = "https://636dab7a91576e19e32cef5d.mockapi.io/joinUs";
    axios
      .get(api)
      .then((res) => {
        setListDayOff(res.data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  });

  const filterApproved = () => {
    console.log("test");
    // listDayOff.filter(() => {

    // })
  };

  const filterRejected = () => {
    console.log("test1");
  };

  const filterReverted = () => {
    console.log("test2");
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
          {listDayOff.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>
                  {item.fromDay} to {item.toDay}
                </td>
                <td>{item.quantify}</td>
                <td>{item.name}</td>
                <td>{item.status}</td>
                <td>{item.requestTime}</td>
                <td>
                  <Link
                    to={"/detail-dayoff"}
                    className="button-viewdetail"
                    type="button"
                  >
                    View
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
