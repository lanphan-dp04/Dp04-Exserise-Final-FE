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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { requestDayOff } from "../../../redux/action/dayoffAction";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useEffect } from "react";
import format from "pretty-format";
import { getData, listKey } from "../../../helpers/common";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CreateRequest = () => {
  const [typeDayOff, setTypeDayOff] = useState("Day Off");
  const [from, setFrom] = useState(new Date() - 86400000)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isId = useSelector((state) => state.auth.login.currentUser._id);
  const isId = getData(listKey.user)._id;
  const dateFormat = "YYYY/MM/DD";
  const handleOnFinish = (values) => {
    const newRequestDayOff = {
      typeDayOff: values.typeDayOff,
      userID: isId,
      reason: values.reason,
      fromDay: values.fromDay,
      toDay: values.toDay,
      partialDay: values.partialDay,
      quantity: values.quantity,
    };
    requestDayOff(newRequestDayOff, dispatch, navigate);
  };


  return (
    <div className="container request">
      <div className="header-staff">
        <div className="header-staff-nav">
          <h2>Day Off</h2>
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
          format={dateFormat}
          name={"fromDay"}
          rules={[{ required: true, message: "Please enter From Day!" }]}
          label="From"
        >
          <DatePicker disabledDate={(current) => current.isBefore(moment().subtract(1,'day'))} 
          onChange={(e) => setFrom(e.format('YYYY-MM-DD'))}/>
        </Form.Item>
        <Form.Item
           format={dateFormat}
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
