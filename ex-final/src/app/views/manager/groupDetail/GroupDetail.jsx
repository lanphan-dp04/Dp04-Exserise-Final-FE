import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Loanding from "../../../components/loading/Loanding";

export default function GroupDetail() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [idNameGroup, setIdNameGroup] = useState({});
  const LINK_API = process.env.REACT_APP_API;

  const apiGroupData = `${LINK_API}/group/list/${id}`;

  useEffect(() => {
    setLoading(true);
    getGroupByID();
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
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      return error.message;
    }
  }

  const apiListData = `${LINK_API}/user/list`;
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
  const memberName = dataUser.filter((e) => {
    return e.role === "staff"
  });

  const onFinish = async (values) => {
    await axios.put(`${LINK_API}/group/update/${id}`, values)
      .then(() => {
        return toast.success("Update Group successfully!!!", { autoClose: 2000 });
      })
      .catch(() => {
        return toast.success("Update Group fail!!!", { autoClose: 2000 });
      });
  };

  const onFinishFailed = (errorInfo) => {
    return errorInfo;
  };

  return (
    <div>
      {loading ? <Loanding /> :
        <div className="container group-container">
          <div className="box-title">
                <h3 className="d-flex justify-content-start">Group Detail</h3>
              </div>
          <Form
            form={form}
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
              name='nameGroup'
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
              <Input />
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
                {memberName?.map((option) => (
                  <Select.Option key={option._id} value={option._id}>
                    <span><FontAwesomeIcon icon={faUser} /></span>{option.userName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
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
                {memberName?.map((option) => (
                  <Select.Option key={option._id} value={option._id}>
                    <span><FontAwesomeIcon icon={faUser} /></span>{option.userName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{span:'6'}}
            >
              <div className="btn-bottom btn-bottom-gr">
                <Button className="btn btn-success" type="submit">
                  Send
                </Button>
                <ToastContainer />
                <Link className="link-btn" to={`/group`}>
                  <Button variant="primary">Back</Button>{' '}
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      }
    </div>
  );
}
