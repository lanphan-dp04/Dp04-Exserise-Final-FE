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
  }, [props.value, fetchingApprove, fetchingReject, fetchingChange,fetchingRevert]);

  // const countApproved = useSelector(
  //   async (state) =>
  //     await state.requestsDetail.requests.currentRequestsDetail.approved.length
  // );
  // const countListMaster = useSelector(
  //   async (state) =>
  //   await  state.requestsDetail.requests.currentRequestsDetail.listMaster.length
  // );

  const renderRequestedHistroy = (item) => {
    return (
      <div key={1} className="box-histories">
        <h6>{item.status}</h6>
        <p>{item.content}</p>
        <div className="history-request">
          <p>From: {moment(item.fromDay).format("YYYY/MM/DD")} </p>
          <p>To: {moment(item.toDay).format("YYYY/MM/DD")}</p>
          <p>Time: {item.time}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Reason: {item.reason}</p>
        </div>
      </div>
    );
  };
  const renderDataUpdate = (newArrRequest, newArrUpdate, index) => {
    return (
      <div key={index} className="box-histories">
        <h6>Requested</h6>
        <p>{newArrUpdate[0].content}</p>
        <div className="history-request">
          <div className="box-request">
            <div>
              <p>
                From: {moment(newArrRequest[0].fromDay).format("YYYY/MM/DD")}{" "}
              </p>
              <p>To: {moment(newArrRequest[0].toDay).format("YYYY/MM/DD")}</p>
              <p>Time: {newArrRequest[0].time}</p>
              <p>Quantity: {newArrRequest[0].quantity}</p>
              <p>Reason: {newArrRequest[0].reason}</p>
            </div>
            <div>
              <span>
                <ArrowRightOutlined />
              </span>
            </div>
            <div>
              <p>
                From: {moment(newArrUpdate[0].fromDay).format("YYYY/MM/DD")}{" "}
              </p>
              <p>To: {moment(newArrUpdate[0].toDay).format("YYYY/MM/DD")}</p>
              <p>Time: {newArrUpdate[0].time}</p>
              <p>Quantity: {newArrUpdate[0].quantity}</p>
              <p>Reason: {newArrUpdate[0].reason}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderUpdateHistroy = (history) => {
    const arrRequest = [];
    const arrUpdate = [];
    history.map((item, index) => {
      if (item.status === "Requested") {
        arrRequest.push(item);
      }
      return arrRequest;
    });
    history.map((item, index) => {
      if (item.status === "Updated") {
        arrUpdate.push(item);
      }
      return arrUpdate;
    });
    if (+arrUpdate.length === +1) {
      return renderDataUpdate(arrRequest, arrUpdate, 1);
    }
    if (+arrUpdate.length > +1) {
      const arrNearLastItem = [];
      const arrLastItem = [];
      const nearLastItem = arrUpdate[arrUpdate.length - 2];
      arrNearLastItem.push(nearLastItem);
      const lastItem = arrUpdate[arrUpdate.length - 1];
      arrLastItem.push(lastItem);

      return renderDataUpdate(arrNearLastItem, arrLastItem, 1);
    }
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
  const renderDayOff = (
    <div className="box-histories">
      <h6>Day Off</h6>
      <p>Day off has been created</p>
    </div>
  );
  // const dayoff = (+countApproved === +countListMaster) ? renderDayOff : null;
  return (
    <div className="histories">
      <h4>History</h4>
      {history.map((item, index) => {
        const request =
          item.status === "Requested"
            ? renderRequestedHistroy(item, index)
            : "";

        const update =
          item.status === "Updated" ? renderUpdateHistroy(history) : null;
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
