import React from "react";
import "./groupdetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { Select } from 'antd';
import { Form, Input } from 'antd';

export default function GroupDetail() {

  const { id } = useParams();
  const [form] = Form.useForm();

  const [idNameGroup, setIdNameGroup] = useState({});
  const apiGroupData = `http://localhost:5000/group/list/${id}`;

  useEffect(() => {
    getGroupByID()
  }, [])

  const getGroupByID = async () => {
    try {
      const response = await axios.get(apiGroupData);
      let temp = await response.data;
      form.setFieldsValue({
        nameGroup: temp.nameGroup,
        memberID: temp.memberID.map((i) => i._id),
        masterID: temp.masterID.map((i) => i._id),
      })
      setIdNameGroup(temp);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }
  
  const apiListData = "http://localhost:5000/user/list";
  const [dataUser, setDataUser] = useState([]);
  
  async function getUserData() {
    try {
      let response = await axios.get(apiListData);
      let temp = await response.data;
      setDataUser(temp);
    } catch (err) {
      return err;
    }
  }
  useEffect(() => {
    getUserData();
  }, [])

  // filter Member
  const memberName = dataUser.filter(function (e) {
    return e.role === "staff"
  });
  // filter Master
  const masterName = dataUser.filter(function (e) {
    return e.role === "staff"  
  });

  const onFinish = async(values) => {
    await axios.put(`http://localhost:5000/group/update/${id}`, values)
    .then((res) => {
      alert("Saved successfully.");
    })
    .catch((error) => {
      return error.response.data;
    });
  };

  const onFinishFailed = (errorInfo) => {
    return errorInfo;
  };

  return (
    <div className="container group-container">
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item>
          <div className="box-title">
            <h3>Group Detail </h3>
          </div>
        </Form.Item>
        <Form.Item
          label="Groupname"
          name='nameGroup'
        >
          <Input style={{ width: '85%' }}/>
        </Form.Item>
        <Form.Item
          label="Members"
          name={"memberID"}
        >
          <Select
            mode='multiple'
            maxTagTextLength='responsive'
            placeholder='Choose members...'
            style={{
              width: '85%',
            }}
          >
            {memberName?.map((option) => (
              <Select.Option key={option._id} value={option._id}>
                {option.userName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Masters"
          name={["masterID"]}
        >
          <Select
            mode='multiple'
            maxTagTextLength='responsive'
            placeholder='Choose members...'
            style={{
              width: '85%',
            }}
          >
            {masterName?.map((option) => (
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
              Send
            </Button>
            <Link className="link-btn" to={`/group`}>
              <Button variant="primary">Back</Button>{' '}
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
