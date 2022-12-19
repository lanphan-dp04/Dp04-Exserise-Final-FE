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
    axios.post("http://localhost:5000/group/new", values)
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
      <Form
        form={form}
        initialValues={""}
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
            mode='multiple'
            maxTagTextLength='responsive'
            placeholder='Choose members...'
            style={{
              width: '85%',
            }}
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
            mode='multiple'
            maxTagTextLength='responsive'
            placeholder='Choose members...'
            style={{
              width: '85%',
            }}
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
        >
          <div className="btn-bottom">
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