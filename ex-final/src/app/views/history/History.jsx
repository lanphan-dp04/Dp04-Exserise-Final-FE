import { ArrowRightOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function History(props) {
  const [history, setHistory] = useState([]);
  const fetchingApprove = useSelector(
    (state) => state.approved.approved.isFetching
  );
  const fetchingReject = useSelector(
    (state) => state.rejected.rejected.isFetching
  );
  const fetchingChange = useSelector(
    (state) => state.changed.changed.isFetching
  );
  const fetchingRevert = useSelector(
    (state) => state.revert.reverted.isFetching
  );

  const LINK_API = process.env.REACT_APP_API;

  useEffect(() => {
    const api = `${LINK_API}/history/${props.value}`;
    axios.get(api).then((res) => {
      setHistory(res.data);
    });
  }, [
    props.value,
    fetchingApprove,
    fetchingReject,
    fetchingChange,
    fetchingRevert,
  ]);

  const renderRequestedHistroy = (item) => {
    return (
      <div key={1} className="box-histories">
        <h6>{item.status}</h6>
        <p>{item.content}</p>
        <div className="history-request">
          <p>Type Request: {item.typeDayOff}</p>
          <p>From: {moment(item.fromDay).format("YYYY/MM/DD")} </p>
          <p>To: {moment(item.toDay).format("YYYY/MM/DD")}</p>
          <p>Time: {item.time}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Reason: {item.reason}</p>
        </div>
      </div>
    );
  };
  const renderDataUpdate = (dataFrist, dataLast, index) => {
    
    if (dataLast !== undefined) {
      return (
        <div key={index} className="box-histories">
          <h6>Requested</h6>
          <p>{dataLast.content}</p>
          <div className="history-request">
            <div className="box-request">
              <div>
              <p>Type Request: {dataFrist.typeDayOff}</p>
                <p>From: {moment(dataFrist.fromDay).format("YYYY/MM/DD")}</p>
                <p>To: {moment(dataFrist.toDay).format("YYYY/MM/DD")}</p>
                <p>Time: {dataFrist.time}</p>
                <p>Quantity: {dataFrist.quantity}</p>
                <p>Reason: {dataFrist.reason}</p>
              </div>
              <div>
                <span>
                  <ArrowRightOutlined />
                </span>
              </div>
              <div>
                <p>Type Request: {dataLast.typeDayOff}</p>
                <p>From: {moment(dataLast.fromDay).format("YYYY/MM/DD")}</p>
                <p>To: {moment(dataLast.toDay).format("YYYY/MM/DD")}</p>
                <p>Time: {dataLast.time}</p>
                <p>Quantity: {dataLast.quantity}</p>
                <p>Reason: {dataLast.reason}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // });
  };

  const renderAprrovedHistroy = (item, index) => {
    return (
      <div key={index} className="box-histories">
        <h6>{item.status}</h6>
        <p>{item.content}</p>
        <div className="history-request">
          <p>{item.note || ""}</p>
        </div>
      </div>
    );
  };
  const arrUpdate = [];
  return (
    <div className="histories">
      <h4>History</h4>
      {history.map((item, index) => {
        if (item.status === "Requested" || item.status === "Updated") {
          arrUpdate.push(item);
        }
        const request =
          item.status === "Requested"
            ? renderRequestedHistroy(item, index)
            : "";

        const update =
          item.status === "Updated" ? renderDataUpdate(arrUpdate[arrUpdate.length-2],arrUpdate[arrUpdate.length-1],index) : null;
        const approve =
          item.status === "Approved" ||
          item.status === "Rejected" ||
          item.status === "Request Change" ||
          item.status === "Cancled" ||
          item.status === "Day Off"
            ? renderAprrovedHistroy(item, index)
            : "";

        return (
          <div>
            <div>{request}</div>
            <div>{approve}</div>
            <div>{update}</div>
          </div>
        );
      })}
    </div>
  );
}

export default History;
