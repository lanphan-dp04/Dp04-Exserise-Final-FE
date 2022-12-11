import React from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Moment from 'moment';

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
import { useDispatch, useSelector } from "react-redux";
import { requests } from "../../redux/action/requestsAction";
const  converter = require('number-to-words');

export default function Request() {
  

  const [listDayOff, setListDayOff] = useState([]);
  const userId = useSelector((state) => state.auth.login.currentUser._id);
  useEffect(() => {
    const api = `http://localhost:5000/requests/${userId}`;
    axios
      .get(api)
      .then((res) => {
        setListDayOff(res.data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  },[]);
  return (
    <div className="container">
      <div className="header-staff">
        <div className="header-staff-nav">
          <h2>Day Off Request</h2>
          <Link to={"/request"}>Requests</Link>
          <Link to={"/create-request"}>Create Request</Link>
          <Link to={"/dayoff"}>Day Off</Link>
        </div>

        <div className="search">
          <Search />
        </div>
      </div>

      <Table className="table-myrequest">
        <thead>
          <tr className="table-title">
            <th className="col-index">No </th>
            <th className="col-3">Request for date</th>
            <th className="col-1">Quantify</th>
            <th className="col-2">Requester </th>
            <th className="col-2">Status</th>
            <th className="col-2">Request date</th>
            <th className="col-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {listDayOff.map((item, index) => {
            const formatDate = 'YYYY-MM-DD';
            const fromDay = new Date(item.fromDay);
            const toDay = new Date(item.toDay);
            const createdAt = new Date(item.createdAt);
            let nowDate = new Date();
            const formatFromDay = Moment(fromDay).format(formatDate)
            const formatToDay = Moment(toDay).format(formatDate)

            const renderDate = (formatFromDay === formatToDay) ? formatFromDay : `${formatFromDay} to ${formatToDay}`;

            const currentDate =  () => {
              let hours = nowDate.getHours()- createdAt.getHours() ;
              let minutes = nowDate.getMinutes()- createdAt.getMinutes();
              if(createdAt.getHours() !== nowDate.getHours()) {
                if(+hours === +1) {
                  return `${converter.toWords(+hours)} hours ago`
                }
                else {
                  return ''
                }
              }
              else {
                return `${minutes} minutes ago`
              }
              
            } 
            const nextDate = () => {
              let date = nowDate.getDate() - createdAt.getDate() ;
              if(+date <= +1) {
                return 'Yesterday'
              }
              else {
                return `${converter.toWords(+date)} days ago`
              }
            }
            const renderrequestDate = (createdAt.getDate() === nowDate.getDate()) ? `${currentDate()}` : `${nextDate()}`;
            console.log(renderrequestDate);

            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>
                  {" "}
                  {`${renderDate}`} 
                </td>
                <td>{item.quantity}</td>
                <td>{item.userName}</td>
                <td>{item.status}</td>
                <td>{renderrequestDate.charAt(0).toUpperCase() + renderrequestDate.slice(1)}</td>
                <td>
                  <a>
                    <FontAwesomeIcon
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
