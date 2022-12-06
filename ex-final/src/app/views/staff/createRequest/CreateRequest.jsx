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
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const CreateRequest = () => {
  return (
    <div className="container request">
      <div className="header-staff">
        <div className="header-staff-nav">
          <h2>Day Off</h2>
          <a href="/request">Requests</a>
          <a href="/create-request">Create Request</a>
          <a href="/dayoff">Day Off</a>
        </div>
      </div>{" "}
      <Form
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        className=""
      >
        <Form.Item label="Type Requests">
          <Radio.Group>
            <Radio value="dayoff"> Day Off </Radio>
            <Radio value="wfh"> WFH </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="From">
          <DatePicker />
        </Form.Item>
        <Form.Item label="To">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Partial Day">
          <Select
            defaultValue="Morning"
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

        <Form.Item label="Quantity">
          <InputNumber min="0" step="0.5" defaultValue="0.5" />
        </Form.Item>
        <Form.Item label="Reason">
          <TextArea rows={6} />
        </Form.Item>

        <div className="button-box">
          <Button className="button-cancel">CANCEL</Button>
          <Button className="button-sendrequest">SUBMIT</Button>
        </div>
      </Form>
    </div>
  );
};
export default () => <CreateRequest />;
