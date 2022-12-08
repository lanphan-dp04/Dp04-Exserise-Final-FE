import { React, useEffect, useState } from "react";
import { Table } from "antd";
import "./groups.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { Popover } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";

const Group = () => {
  const [listdata, setListdata] = useState([]);

  useEffect(() => {
    const api = "https://636dab7a91576e19e32cef5d.mockapi.io/member";
    axios
      .get(api)
      .then((res) => {
        setListdata(res.data);
        console.log("listday", res.data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, []);

  const columns = [
    {
      title: "Group Name",
      dataIndex: "group",
      width: "150px",
      display: "flex",
    },
    {
      title: "Members",
      dataIndex: "",
      width: "40%",

      render: () => (
        <div className="member-wraper">
          {listdata.map((item, index) => {
            return (
              <div className="group-boxmember">
                <Popover content={item.name} title="Name">
                  <img className="member-avatar" src={item.avatar} alt="st" />
                </Popover>
                {/* <p className="member-content">{item.name}</p> */}
              </div>
            );
          })}
        </div>
      ),
    },
    {
      title: "Master(s)",
      dataIndex: "master",
      width: "40%",

      render: () => (
        <div className="member-wraper">
          {listdata.map((item, index) => {
            return (
              <div className="group-boxmember">
                <img className="member-avatar" src={item.avatar} alt="st" />
                {/* <p className="member-content">{item.name}</p> */}
              </div>
            );
          })}
        </div>
      ),
    },
    {
      title: "Detail",
      dataIndex: "",
      width: "100px",

      render: () => (
        <Link to="/group/detail" className="viewdetal-button">
          View
        </Link>
      ),
    },
  ];

  return (
    <div className="container group-container">
      <div className="box-title">
        <h3>Groups </h3>
      </div>
      <div className="newgroup">
        <button>
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          Newgroup
        </button>
      </div>
      <div className="box-content">
        <Table columns={columns} dataSource={listdata} bordered />
      </div>
    </div>
  );
};
export default Group;
