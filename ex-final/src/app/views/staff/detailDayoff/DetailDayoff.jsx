import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./detaildayoff.css";
import axios from "axios";
import Moment from "moment";
import { Button, Modal } from "antd";
import { HistoryOutlined } from "@ant-design/icons";
import History from "../../history/History";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { AuthRevert, AuthWithRevert } from "../../../helpers/common";
import { useDispatch, useSelector } from "react-redux";
import { reverted } from "../../../redux/action/revertAction";
import { requestsDetail } from "../../../redux/action/requestsDetailAction";
import Loanding from "../../../components/loading/Loanding";

export default function DetailDayoff() {
  const [dayOffWithId, setDayOffWithId] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [masterId, setMasterId] = useState([]);
  const [dayoffId, setDayOffId] = useState("");
  const paramId = useParams();
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.login.currentUser._id);
  const fetchingRevert = useSelector(
    (state) => state.revert.reverted.isFetching
  );

  const [loading, setLoading] = useState(false);
  const formatDate = "YYYY-MM-DD";
  const API_DETAIL_REQUEST = process.env.REACT_APP_API_DETAIL_REQUEST;
  useEffect(() => {
    const api = `${API_DETAIL_REQUEST}/${paramId.id}`;
    setLoading(true)
    axios
      .get(api)
      .then((res) => {
        setDayOffWithId(res.data);
        setMasterId(res.data.canceled);
        requestsDetail(res.data, dispatch, navigate);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        return error;
      });
  }, [paramId.id, fetchingRevert]);

  const canceledId = masterId.includes(userId);
  const handleRequestRevert = (values) => {
    if (values.note !== "") {
      showModal();
    }
    const revert = {
      note: values.note,
      dayoffId: dayoffId,
      userId: userId,
    };

    reverted(revert, dispatch, navigate);
  };

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
        // approved(actionApprove, dispatch, navigate);
      },
      onCancel() {},
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
        // rejected(actionReject, dispatch, navigate);
      },
      onCancel() {},
    });
  };
  const displayH4Action =
    AuthRevert(dayOffWithId, userId) === "display-none"
      ? "display-none"
      : "display-block";

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
              <td>{Moment(dayOffWithId.fromDay).format(formatDate)}</td>
            </tr>
            <tr>
              <th>To:</th>
              <td>{Moment(dayOffWithId.toDay).format(formatDate)}</td>
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
              <div className={AuthRevert(dayOffWithId, userId)}>
                <Link>
                  <Button
                    icon={<HistoryOutlined />}
                    onClick={() => showModal(dayOffWithId._id)}
                    type="primary"
                  ></Button>
                </Link>
              </div>
              {/* {displayButtonStaff}
              {displayButtonMaster} */}
            </div>
          </div>
        </div>
        <History value={paramId.id} />
      </div>
      <Modal
        footer={""}
        open={isModalOpen}
        title="Reson for revert"
        onCancel={showModal}
      >
        <Form
          form={form}
          style={{ heigth: "200px" }}
          layout="vertical"
          name="form_in_modal"
          onFinish={handleRequestRevert}
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
