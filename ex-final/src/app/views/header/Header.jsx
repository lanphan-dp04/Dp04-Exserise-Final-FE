import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { sendNoti } from "../../redux/action/sendNotiAction";
import { notification } from "../../redux/action/notiAction";

export default function Header() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatar = useSelector((state) => state.auth.login.currentUser.avatar);
  const name = useSelector((state) => state.auth.login.currentUser.userName);
  const id = useSelector((state) => state.auth.login.currentUser._id);
  const role = useSelector((state) => state.auth.login.currentUser.role);
  const LINK_API = process.env.REACT_APP_API;
  const fetchingNoti = useSelector(
    (state) => state.sendNoti.sendNoti.isFetching
  );

  useEffect(() => {
    const api = `${LINK_API}/notifies/${id}`;
    axios.get(api).then((res) => {
      setData(res.data);
      notification(res.data, dispatch, navigate)
    });
  }, [id,fetchingNoti]);

  const handleSend = (id) => {
    const data = {
      id: id,
    }
    sendNoti(data,dispatch, navigate)
  }

  const items =
    0 < data.length
      ? data.map((item, index) => ({
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
        <img src={avatar} alt="avatar" className="avatar-img" />
        <p>{name}</p>
        <div className="box-logout">
          <div className="logout">
            <p>
              <Link to="/login">
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </span>
                Log Out
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
