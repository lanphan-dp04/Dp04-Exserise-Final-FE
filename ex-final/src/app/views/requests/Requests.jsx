import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Moment from "moment";
import { Form } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Search from "../../components/search/Search";
import "../staff/dayoff/dayoff.css";
import "../staff/formDayOff/formDayOff.css";
import { useDispatch, useSelector } from "react-redux";
import { requests } from "../../redux/action/requestsAction";
import {
  ExclamationCircleFilled,
  CloseCircleOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  UndoOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { approved } from "../../redux/action/approveAction";
import { rejected } from "../../redux/action/rejectAction";
import TextArea from "antd/es/input/TextArea";
import { changed } from "../../redux/action/changeAction";
import { AuthEdit, AuthWith } from "../../helpers/common";
import Loanding from "../../components/loading/Loanding";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const converter = require("number-to-words");
const { confirm } = Modal;

export default function Request() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dayoffId, setDayOffId] = useState("");
  const [listDayOff, setListDayOff] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.login.currentUser._id);
  const fetchingApprove = useSelector(
    (state) => state.approved.approved.isFetching
  );
  const fetchingReject = useSelector(
    (state) => state.rejected.rejected.isFetching
  );
  const fetchingChange = useSelector(
    (state) => state.changed.changed.isFetching
  );
  const API_GET_REQUEST = process.env.REACT_APP_API_GET_REQUEST;
  useEffect(() => {
    const api = `${API_GET_REQUEST}/${userId}`;
    axios.get(api).then((res) => {
      const data = res.data.filter(
        (item) =>
          item.status !== "Cancled"
      );
      setListDayOff(data);
      requests(res.data, dispatch, navigate);
    });
  }, [fetchingApprove, fetchingReject, fetchingChange]);

  const showConfirm = (dayoffId, userId) => {
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleFilled />,
      okText: "Approve",
      onOk() {
        toast.success("successful approval!!!", { autoClose: 1000 });
        const actionApprove = {
          masterId: userId,
          dayoffId: dayoffId,
        };
        approved(actionApprove, dispatch, navigate);
      },
      onCancel() {
       },
    });
  };
  const showReject = (dayoffId, userId) => {
    confirm({
      title: "Are you sure?",
      icon: <CloseCircleOutlined />,
      okText: "Reject",
      okType: "danger",

      onOk() {
        toast.success("Successfully!!!", { autoClose: 1000 });
        const actionReject = {
          masterId: userId,
          dayoffId: dayoffId,
        };
        rejected(actionReject, dispatch, navigate);
      },
      onCancel() { },
    });
  };
  const showModal = (id) => {
    setDayOffId(id);
    setIsModalOpen(!isModalOpen);
    if (isModalOpen === false) {
      form.resetFields();
    }
  };

  const handleRequestChange = (values) => {
    if (values.note !== "") {
      showModal();
    }
    const newNotifies = {
      note: values.note,
      dayoffId: dayoffId,
      masterId: userId,
    };
    changed(newNotifies, dispatch, navigate);
  };

  return (
    <div>
      {Object.keys(listDayOff).length === 0 ? <Loanding /> :
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
                <th className="col-2">Request for date</th>
                <th className="col-1">Quantify</th>
                <th className="col-2">Requester </th>
                <th className="col-2">Status</th>
                <th className="col-2">Request date</th>
                <th className="col-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {listDayOff.map((item, index) => {
                const formatDate = "YYYY-MM-DD";
                const fromDay = new Date(item.fromDay);
                const toDay = new Date(item.toDay);
                const createdAt = new Date(item.createdAt);
                let nowDate = new Date();
                const formatFromDay = Moment(fromDay).format(formatDate);
                const formatToDay = Moment(toDay).format(formatDate);

                const renderDate =
                  formatFromDay === formatToDay
                    ? formatFromDay
                    : `${formatFromDay} - ${formatToDay}`;

                const currentDate = () => {
                  let hours = nowDate.getHours() - createdAt.getHours();
                  let minutes = nowDate.getMinutes() - createdAt.getMinutes();
                  if (createdAt.getHours() !== nowDate.getHours()) {
                    if (+hours === +1) {
                      return `An hour ago`;
                    } else {
                      return `${+hours} hours ago`;
                    }
                  } else {
                    return `${minutes} minutes ago`;
                  }
                };
                const nextDate = () => {
                  let date = nowDate.getDate() - createdAt.getDate();
                  if (+date <= +1) {
                    return "Yesterday";
                  } else {
                    return `${converter.toWords(+date)} days ago`;
                  }
                };
                const renderrequestDate =
                  createdAt.getDate() === nowDate.getDate()
                    ? `${currentDate()}`
                    : `${nextDate()}`;

                const approveId = item.approved.includes(userId);

                const renderButtonMaster = (
                  <div className={AuthWith(item, approveId, userId)}>
                    <a onClick={(e) => showConfirm(item._id, userId)}>
                      <Button icon={<CheckOutlined />} type="primary"></Button>
                      <ToastContainer />
                    </a>
                    <a onClick={(e) => showReject(item._id, userId)}>
                      <Button icon={<CloseOutlined />} type="primary"></Button>
                      <ToastContainer />
                    </a>
                    <a>
                      <Button
                        icon={<UndoOutlined />}
                        onClick={() => showModal(item._id)}
                        type="primary"
                      ></Button>
                    </a>
                  </div>
                );
                const renderButtonSatff = (
                  <div className={AuthEdit(item, userId)}>
                    <Link to={`/requests/edit/${item._id}`}>
                      <Button icon={<EditOutlined />} type="primary"></Button>
                    </Link>
                  </div>
                );
                const displayButtonMaster =
                  AuthWith(item, approveId, userId) === "display-block"
                    ? renderButtonMaster
                    : "";

                const displayButtonStaff =
                  AuthEdit(item, userId) === "display-block"
                    ? renderButtonSatff
                    : "";

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td> {`${renderDate}`}</td>
                    <td>{item.quantity}</td>
                    <td>{item.userName}</td>
                    <td>{item.status}</td>
                    <td>
                      {renderrequestDate.charAt(0).toUpperCase() +
                        renderrequestDate.slice(1)}
                    </td>
                    <td className="table-action">
                      {displayButtonMaster}
                      {displayButtonStaff}
                      <div>
                        <Link to={`/requests/detail/${item._id}`}>
                          <Button icon={<EyeOutlined />} type="primary"></Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div>{/* <Pagin /> */}</div>
          <Modal
            footer={""}
            open={isModalOpen}
            title="Reson for change"
            onCancel={showModal}
          >
            <Form
              form={form}
              style={{ heigth: "200px" }}
              layout="vertical"
              name="form_in_modal"
              onFinish={handleRequestChange}
            >
              <Form.Item
                name="note"
                rules={[{ required: true, message: "Need more detail!" }]}
              >
                <TextArea
                  defaultValue={""}
                  style={{ width: "100%" }}
                  placeholder="Need more detail"
                  rows={4}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={showModal}
                >
                  Cancel
                </Button>
                <Button htmlType="submit" type="primary">
                  SEND
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      }
    </div>
  );
}
