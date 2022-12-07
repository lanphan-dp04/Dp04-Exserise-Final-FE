import React from "react";
import { Link, redirect } from "react-router-dom";
import hasJWT from "../../utils/hasJWT";
import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faRectangleXmark,
  faSquarePen,
  faSquareCaretLeft,
} from "@fortawesome/free-solid-svg-icons";

import Table from "react-bootstrap/Table";
import Search from "../../components/search/Search";

import "../staff/dayoff/dayoff.css";
import "../staff/createRequest/createRequest.css";

export default function Request() {
  if (hasJWT() === false) {
    redirect("/login");
  }

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
          <h2>Day Off Request</h2>
          <Link to={'/request'} >Requests</Link>
          <Link to={'/create-request'} >Create Request</Link>
          <Link to={'/dayoff'} >Day Off</Link>
        </div>

        <div className="search">
          <Search />
        </div>
      </div>

      <Table className="table-myrequest">
        <thead>
          <tr className="table-title">
            <th className="col-index">No </th>
            <th className="col-2">Requester</th>
            <th className="col-2">Time day off</th>
            <th className="col-1">Quantify</th>
            <th className="col-2">Status</th>
            <th className="col-3">Reason</th>
            <th className="col-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {listDayOff.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.timeDayOff}</td>
                <td>{item.Quantify}</td>
                <td>{item.status}</td>
                <td>{item.approver}</td>
                <td>
                  <a>
                    <FontAwesomeIcon
                      // className="icon-approve"
                      icon={faSquareCheck}
                    />
                  </a>
                  <a>
                    <FontAwesomeIcon icon={faRectangleXmark} />
                  </a>
                  <a>
                    <FontAwesomeIcon icon={faSquarePen} />
                  </a>
                  <a>
                    <FontAwesomeIcon icon={faSquareCaretLeft} />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div>{/* <Pagin /> */}</div>
    </div>
  );
}
