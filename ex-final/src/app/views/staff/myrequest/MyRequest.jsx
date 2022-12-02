import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./myrequest.css";
import { useState, useEffect } from "react";
import axios from "axios";

function MyRequest() {
  const [listDayOff, setListDayOff] = useState([]);

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
          <a href="/createrequest">Create Request</a>
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
    </div>
  );
}

export default MyRequest;
