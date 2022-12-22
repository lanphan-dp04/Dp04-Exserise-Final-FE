import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./CreateGroup.scss"
import axios from "axios";
import { Link } from 'react-router-dom';
import { Select } from 'antd';
import { Form, Input } from 'antd';
import Button from 'react-bootstrap/esm/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import TextArea from 'antd/es/input/TextArea';

const CreateGroup = () => {
  //call api user
  const LINK_API = process.env.REACT_APP_API;

  const apiListData =`${LINK_API}/user/list`;
  const [dataUser, setDataUser] = useState([]);

  async function getUserData() {
    try {
      let response = await axios.get(apiListData);
      let temp = await response.data;
      setDataUser(temp);
    } catch (err) {
      return err.message;
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
    axios.post(`${LINK_API}/group/new`, values)
    .then((res) => {
      toast.success("Update Group successfully!!!",{autoClose:2000});
      form.resetFields();
    })
    .catch((error) => {
      if(error.status(422))
        alert("error email or phone number!!!");
      else
      return error.response.data;
    }); 
  };
  const onFinishFailed = (errorInfo) => {
    return errorInfo;
  };

  return (
    <div className='container container-create-group'>
      <h3 className='d-flex justify-content-start'>Create New Group</h3>
      <Form
        form={form}
        initialValues={""}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{span: 3}}
        wrapperCol={{span:10}}
        style={{
          marginTop:"40px"
        }}
      >
        <Form.Item
          className="form-item"
          label="Groupname"
          name={["nameGroup"]}
          hasFeedback
          rules={[
            {
              required: true, 
              message: 'Please input your username!',
            },
          ]}
          style={{
            marginTop:"20px"
          }}
        >
          <Input placeholder='Please enter group name...'/>
        </Form.Item>
        <Form.Item
          className="form-item"
          label="Members"
          name={"memberID"}
          rules={[
            {
              required: true,
              message: 'Please input your member!',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            mode='multiple'
            maxTagCount='responsive'
          >
            {memberName.map((option) => (
              <Select.Option key={option._id} value={option._id}>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>
                {option.userName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
        style={{height: '50px'}}
          className="form-item"
          label="Masters"
          name={["masterID"]}
          rules={[
            {
              required: true,
              message: 'Please input your master!',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            mode='multiple'
            maxTagCount='responsive'
          >
            {masterName.map((option) => (
              <Select.Option key={option._id} value={option._id}>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>
                {option.userName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
        wrapperCol={{span:'6'}}
        >
          <div className="btn-bottom btn-bottom-gr">
            <Button className="btn btn-success" type="submit">
              Add
            </Button>
            <ToastContainer/>
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