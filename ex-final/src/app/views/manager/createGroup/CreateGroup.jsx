import React, { useState, useEffect } from 'react';
import "./CreateGroup.scss"
import axios from "axios";
import { Link } from 'react-router-dom';
import { Select, Space } from 'antd';
import { Form, Input } from 'antd';
// import Button from "react-bootstrap/esm/Button";
import { Option } from 'antd/es/mentions';
import Button from 'react-bootstrap/esm/Button';

const CreateGroup = () => {
  //call api user
  const apiListData = "http://localhost:5000/user/list";
  const [dataUser, setDataUser] = useState([]);

  async function getUserData() {
    try {
      let response = await axios.get(apiListData);
      let temp = await response.data;
      setDataUser(temp);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  }
  useEffect(() => {
    getUserData();
  }, [])
  // filter Member
  const memberName = dataUser.filter(function (e) {
    return e.role === "staff";
  });
  // filter Master
  const masterName = memberName.filter(function (e) {
    return e.role === "staff"
  });
  //form
  const [form] = Form.useForm();
  const onFinish = (values) => {
    axios.post("http://localhost:5000/group/new", values)
    .then((res) => {
      alert("Saved successfully.");
      form.resetFields();
    })
    .catch((error) => {
      if(error.status(422))
        alert("error email or phone number!!!");
      else
      console.log("Error:",error.response.data);
    }); 
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='container container-create-group'>
      
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item>
          <h3 className='d-flex justify-content-center'>Create New Group</h3>
        </Form.Item>
        <Form.Item
          label="Groupname"
          name={["nameGroup"]}
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input style={{ width: '85%' }} placeholder='Group name...' />
        </Form.Item>
        <Form.Item
          label="Member(s)"
          name={"memberID"}
          rules={[
            {
              required: true,
              message: 'Please input your member!',
            },
          ]}
        >
          <Select
            mode='multiple'
            maxTagCount='responsive'
            placeholder='Choose members...'
            style={{
              width: '85%',
            }}
          >
            {memberName.map((option) => (
              <Select.Option key={option._id} value={option._id}>
                {option.userName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Master(s)"
          name={["masterID"]}
          rules={[
            {
              required: true,
              message: 'Please input your master!',
            },
          ]}
        >
          <Select
            mode='multiple'
            maxTagCount='responsive'
            placeholder='Choose members...'
            style={{
              width: '85%',
            }}
          >
            {masterName.map((option) => (
              <Select.Option key={option._id} value={option._id}>
                {option.userName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
        >
          <div className="btn-bottom">
            <Button className="btn btn-success" type="submit">
              Add
            </Button>
            <Link className="link-btn" to={`/group`}>
              <Button variant="primary">Back</Button>{' '}
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreateGroup;