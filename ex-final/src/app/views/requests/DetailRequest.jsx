import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../staff/detailDayoff/detaildayoff.css";
import axios from "axios";
import { Button, Modal } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  UndoOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { AuthEdit, AuthWith } from "../../helpers/common";
import Moment from "moment";
import { requestsDetail } from "../../redux/action/requestsDetailAction";
import { approved } from "../../redux/action/approveAction";
import { rejected } from "../../redux/action/rejectAction";
import { changed } from "../../redux/action/changeAction";
import History from "../history/History";
import Loanding from "../../components/loading/Loanding";
const { confirm } = Modal;

export default function DetailRequest() {
  const [dayOffWithId, setDayOffWithId] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dayoffId, setDayOffId] = useState("");
  const [masterId, setMasterId] = useState([]);
  const [form] = Form.useForm();
  const paramId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paramIdDayOff = paramId.id;
  console.log('paramIdDayOff',paramIdDayOff);
  const [loading, setLoading] = useState(true);

  const fetchingApprove = useSelector(
    (state) => state.approved.approved.isFetching
  );
  const fetchingReject = useSelector(
    (state) => state.rejected.rejected.isFetching
  );
  const fetchingChange = useSelector(
    (state) => state.changed.changed.isFetching
  );

  const userId = useSelector((state) => state.auth.login.currentUser._id);

  const formatDate = "YYYY-MM-DD";
  const formatFromDay = Moment(dayOffWithId.fromDay).format(formatDate);
  const formatToDay = Moment(dayOffWithId.toDay).format(formatDate);
  const LINK_API = process.env.REACT_APP_API;
  useEffect(() => {
    const api = `${LINK_API}/requests/detail/${paramIdDayOff}`;
    axios.get(api).then((res) => {
      console.log(res);
      setDayOffWithId(res.data);
      console.log('res.data.approved',res.data.approved);
      setMasterId(res.data.approved);
      requestsDetail(res.data, dispatch, navigate);
    });
  }, [paramIdDayOff, fetchingApprove, fetchingReject, fetchingChange]);
  console.log('userId',userId);
  console.log('masterId',masterId);
  const approveId = masterId.includes(userId);
  console.log('includes',approveId);
  setTimeout(() => {
    setLoading(false);
  }, 500);

  const showModal = (id) => {
    setDayOffId(id);
    setIsModalOpen(!isModalOpen);
    if (isModalOpen === false) {
      form.resetFields();
    }
  };

  const showConfirm = (dayoffId, userId) => {
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleFilled />,
      okText: "Approve",
      onOk() {
        const actionApprove = {
          masterId: userId,
          dayoffId: dayoffId,
        };
        approved(actionApprove, dispatch, navigate);
      },
      onCancel() { },
    });
  };
  const showReject = (dayoffId, userId) => {
    confirm({
      title: "Are you sure?",
      icon: <CloseCircleOutlined />,
      okText: "Reject",
      okType: "danger",

      onOk() {
        const actionReject = {
          masterId: userId,
          dayoffId: dayoffId,
        };
        rejected(actionReject, dispatch, navigate);
      },
      onCancel() { },
    });
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

  const displayH4Action =
    AuthWith(dayOffWithId, approveId, userId) === "display-none" &&
      AuthEdit(dayOffWithId, userId) === "display-none"
      ? "display-none"
      : "display-block";

  const renderButtonMaster = (
    <div className={AuthWith(dayOffWithId, approveId, userId)}>
      <a
        onClick={() => showConfirm(dayOffWithId._id, userId)}
        className="item-action-detail"
      >
        <Button icon={<CheckOutlined />} type="primary" className="bg-success"></Button>
      </a>
      <a
        onClick={() => showReject(dayOffWithId._id, userId)}
        className="item-action-detail"
      >
        <Button icon={<CloseOutlined />} type="primary" danger></Button>
      </a>
      <a className="item-action-detail">
        <Button
          icon={<UndoOutlined />}
          onClick={() => showModal(dayOffWithId._id)}
          type="primary"
        ></Button>
      </a>
    </div>
  );
  const renderButtonSatff = (
    <div className={AuthEdit(dayOffWithId, userId)}>
      <Link to={`/requests/edit/${dayOffWithId._id}`}>
        <Button icon={<EditOutlined />} type="primary" ></Button>
      </Link>
    </div>
  );
  const displayButtonMaster =
    AuthWith(dayOffWithId, approveId, userId) === "display-block"
      ? renderButtonMaster
      : "";

  const displayButtonStaff =
    AuthEdit(dayOffWithId, userId) === "display-block" ? renderButtonSatff : "";

  return (
    <div>
      {loading ? <Loanding /> :
        <div className="container">
          <div className="layout-detaildayoff">
            <div className="detail-dayoff">
              <h4>Basic Information</h4>
              <table>
                <tr>
                  <th className="">From:</th>
                  <td>{formatFromDay}</td>
                </tr>
                <tr>
                  <th>To:</th>
                  <td>{formatToDay}</td>
                </tr>
                <tr>
                  <th>Time:</th>
                  <td>{dayOffWithId.partialDay}</td>
                </tr>
                <tr>
                  <th>Quantify:</th>
                  <td>{dayOffWithId.quantity}</td>
                </tr>
                <tr>
                  <th>Reason:</th>
                  <td>{dayOffWithId.reason}</td>
                </tr>
                <tr>
                  <th>Status:</th>
                  <td>{dayOffWithId.status}</td>
                </tr>
              </table>
              <div>
                <h4 className={`${displayH4Action}`}>Action: </h4>
                <div className="box-action-detail">
                  {displayButtonMaster}
                  {displayButtonStaff}
                </div>
              </div>
            </div>
            <History value={paramIdDayOff} />
          </div>
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
