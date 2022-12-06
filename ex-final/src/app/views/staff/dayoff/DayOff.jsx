import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dayoff.css";
import { useState, useEffect } from "react";
import axios from "axios";

function DayOff() {
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
          <h2>Day Off</h2>
          <a href="/request">Requests</a>
          <a href="/create-request">Create Request</a>
          <a href="/dayoff">Day Off</a>
        </div>
      </div>

      <Table className="table-myrequest">
        <thead>
          <tr className="table-title">
            <th className="col-index">No </th>
            <th className="col-2">Requester </th>
            <th className="col-2">Time day off</th>
            <th className="col-1">Quantify</th>
            <th className="col-3">Reason</th>
            <th className="col-2">Status</th>
            <th className="col-2">Detail</th>
          </tr>
        </thead>
        <tbody>
          {listDayOff.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.timeDayOff}</td>
                <td>{item.quantify}</td>
                <td>{item.requestTime}</td>
                <td>{item.status}</td>
                <td>
                  <a
                    href="/detail-dayoff"
                    className="button-viewdetail"
                    type="button"
                  >
                    View
                  </a>
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
