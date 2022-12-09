import React from "react";
// import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
// import moment from "moment";
import { useState } from "react";
import { requestDayOff } from "../../../redux/action/dayoffAction";
import { useDispatch, useSelector } from "react-redux";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CreateRequest = () => {
  const [typeDayOff, setTypeDayOff] = useState("Day Off");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isId = useSelector((state) => state.auth.login.currentUser._id);
  console.log(isId);

  const dateFormat = "DD/MM/YYYY";
  const handleOnFinish = (values) => {
    const newRequestDayOff = {
      userID: isId,
      reason: values.reason,
      fromDay: values.fromDay.format(dateFormat),
      toDay: values.toDay.format(dateFormat),
      partialDay: values.partialDay,
      quantity: values.quantity,
    };
    console.log(newRequestDayOff);

    requestDayOff(newRequestDayOff, dispatch, navigate);
  };
  return (
    <div className="container request">
      <div className="header-staff">
        <div className="header-staff-nav">
          <h2>Day Off</h2>
          <Link to={"/request"}>Requests</Link>
          <Link to={"/create-request"}>Create Request</Link>
          <Link to={"/dayoff"}>Day Off</Link>
        </div>
      </div>{" "}
      <Form
        onFinish={handleOnFinish}
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        className=""
      >
        <Form.Item
          name={"typeDayoff"}
          rules={[{ required: true, message: "Please enter Type Requests!" }]}
          label="Type Requests"
        >
          <Radio.Group value={typeDayOff}>
            <Radio value="Day Off"> Day Off </Radio>
            <Radio value="WFH"> WFH </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          format={dateFormat}
          name={"fromDay"}
          rules={[{ required: true, message: "Please enter From Day!" }]}
          label="From"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name={"toDay"}
          rules={[{ required: true, message: "Please enter To Day!" }]}
          label="To"
        >
          <DatePicker />
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
          <Button className="button-cancel">CANCEL</Button>
          <Button htmlType="submit" className="button-sendrequest">
            SUBMIT
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default () => <CreateRequest />;
