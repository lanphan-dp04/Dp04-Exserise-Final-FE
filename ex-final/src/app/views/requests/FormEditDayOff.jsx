import React from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
import { updateDayOff } from "../../redux/action/updateDayOffAction";
const { RangePicker } = DatePicker;

const { TextArea } = Input;

const CreateRequest = () => {
  const [form] = Form.useForm();
  const [typeDayOff, setTypeDayOff] = useState('');
  const paramId = useParams();
  const [from, setFrom] = useState(new Date() - 86400000)


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.login.currentUser._id);
  const formatDate = "YYYY/MM/DD";
  const LINK_API = process.env.REACT_APP_API
  const API_DATA = `${LINK_API}/dayoff/${paramId.id}`;

  useEffect(() => {
    getData();
  }, [paramId]);
  const getData = async () => {
    const response = await axios.get(API_DATA);
    const data = response.data;
    setTypeDayOff(data.typeDayOff)
    const fromDay = moment(data.fromDay).format(formatDate)
    const toDay = moment(data.toDay).format(formatDate)
    form.setFieldsValue({
      
      typeDayOff: data.typeDayOff,
      reason: data.reason,
      quantity: data.quantity,
      fromDay: dayjs(fromDay, formatDate),
      toDay: dayjs(toDay, formatDate),
      partialDay: data.partialDay,
    });
  };

  const handleOnFinish = (values) => {
    const EditRequestDayOff = {
      userId: userId,
      dayoffId: paramId.id,
      typeDayOff: values.typeDayOff,
      reason: values.reason,
      fromDay: values.fromDay,
      toDay: values.toDay,
      partialDay: values.partialDay,
      quantity: values.quantity,
    };
    updateDayOff(EditRequestDayOff, dispatch, navigate);
  };

  return (
    <div className="container request">
      <div className="header-staff">
        <div className="header-staff-nav">
          <h2>Edit Day Off</h2>
          <Link to={"/request"}>Requests</Link>
          <Link to={"/create-request"}>Create Request</Link>
          <Link to={"/dayoff"}>Day Off</Link>
        </div>
      </div>{" "}
      <Form
        form={form}
        onFinish={handleOnFinish}
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <Form.Item
          name={"typeDayOff"}
          rules={[{ required: true, message: "Please enter Type Requests!" }]}
          label="Type Requests"
        >
          <Radio.Group value={typeDayOff}>
            <Radio value="Day Off"> Day Off </Radio>
            <Radio value="WFH"> WFH </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          format={formatDate}
          name={"fromDay"}
          rules={[{ required: true, message: "Please enter From Day!" }]}
          label="From"
        >
          <DatePicker disabledDate={(current) => current.isBefore(moment().subtract(1,'day'))} 
          onChange={(e) => setFrom(e.format('YYYY-MM-DD'))} />
        </Form.Item>
        <Form.Item
          name={"toDay"}
          rules={[{ required: true, message: "Please enter To Day!" }]}
          label="To"
        >
          <DatePicker disabledDate={(current) => current.isBefore(moment(from))} format='YYYY-MM-DD'  />
        </Form.Item>
        <Form.Item
          name={"partialDay"}
          rules={[{ required: true, message: "Please enter Partial Day!" }]}
          label="Partial Day"
        >
          <Select
            placeholder="Morning"
            style={{ width: 150 }}
            options={[
              {
                value: "Morning",
                label: "Morning",
              },
              {
                value: "Afternoon",
                label: "Afternoon",
              },
              {
                value: "All day",
                label: "All day",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name={"quantity"}
          rules={[{ required: true, message: "Please enter Quantity!" }]}
          label="Quantity"
        >
          <InputNumber min="0" step="0.5" defaultValue="0.0" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please enter Reason!" }]}
          name={"reason"}
          label="Reason"
        >
          <TextArea rows={6} />
        </Form.Item>

        <div className="button-box">
          <Link className="link-btn" to={`/requests`}>
            <Button className="button-cancel">CANCEL</Button>
          </Link>
          <Button htmlType="submit" className="button-sendrequest">
            SUBMIT
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default () => <CreateRequest />;
