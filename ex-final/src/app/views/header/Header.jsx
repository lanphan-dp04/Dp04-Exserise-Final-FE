import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Menu } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { sendNoti } from "../../redux/action/sendNotiAction";
import { notification } from "../../redux/action/notiAction";
import { getData, listKey } from "../../helpers/common";

export default function Header() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNoti, setShowNoti] = useState(true)
  // const avatar = useSelector((state) => state.auth.login.currentUser.avatar);
  // const name = useSelector((state) => state.auth.login.currentUser.userName);
  // const id = useSelector((state) => state.auth.login.currentUser._id);
  // const role = useSelector((state) => state.auth.login.currentUser.role);
  const avatar = getData(listKey.user).avatar
  const name = getData(listKey.user).userName
  const id = getData(listKey.user)._id
  const role = getData(listKey.user).role
  const LINK_API = process.env.REACT_APP_API;
  const fetchingNoti = useSelector(
    (state) => state.sendNoti.sendNoti.isFetching
  );

  let timer = setTimeout(() => setShowNoti(true), 2000)
  useEffect(() => {
    const api = `${LINK_API}/notifies/${id}`;
    axios.get(api).then((res) => {
      setData(res.data);
      notification(res.data, dispatch, navigate)
    });
  }, [id,fetchingNoti,timer]);

  const handleSend = (id) => {
    const data = {
      id: id,
    }
    sendNoti(data, dispatch, navigate)
  }
  const sortData = [...data].reverse();
  const items =
    0 < sortData.length
      ? sortData.map((item, index) => ({
        key: index,
        label: <Link to={`requests/detail/${item.dayoffID}`} onClick={() => handleSend(item._id)}>{item.desc}</Link>,
      }))
      : [
        {
          key: "0",
          label: "You don't have any notification yet",
        },
      ];

  const addUser = (
    <div className="box-logoff">
      <div className="box-addnewmember">
        <p>
          <Link to="list/form" type="button">
            <span>
              {" "}
              <FontAwesomeIcon icon={faUserPlus} />
            </span>
            New Member
          </Link>
        </p>
      </div>
    </div>
  );

  const renderAddNewNumber =
    role === "admin" || role === "manager" ? addUser : "";
  return (
    <div className="header">
      {renderAddNewNumber}
      <div className="box-logoff">
        <p>
          <Link to="create-request" type="button">
            <span>
              {" "}
              <FontAwesomeIcon icon={faPlus} />
            </span>
            Log Off
          </Link>
        </p>
      </div>
      <div className="noti">
        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
            }}
          >
            <BellOutlined style={{ paddingTop: "5px", scale: "1.3" }} />
          </Button>
        </Dropdown>
        <div className="box-noti">
          <p className="count-noti">{data.length}</p>
        </div>
      </div>
      <div className="box-user">
        <Dropdown overlay={
          <Menu>
            <Menu.Item key="mode">
              <div className="box-logout">
                <div className="logout">
                  <p>
                    <Link to="/login">
                        <FontAwesomeIcon  style={{ paddingRight: '10px'}} icon={faRightFromBracket} />
                          Log Out
                    </Link>
                  </p>
                </div>
              </div>
            </Menu.Item>
          </Menu>}>
          <div className="box-user">
            <img src={avatar} alt="avatar" className="avatar-img" />
            <p>{name}</p>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
