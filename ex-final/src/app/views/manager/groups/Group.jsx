import { React, useEffect, useState } from "react";
import { Table } from "antd";
import "./groups.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

const columns = [
  {
    title: "Group Name",
    dataIndex: "group",
    width: "150px",
  },
  {
    title: "Members",
    dataIndex: "member",
    width: "50%",
  },
  {
    title: "Master(s)",
    dataIndex: "master",
  },
  {
    title: "Detail",
    dataIndex: "",
    width: "150px",

    render: () => (
      <Link to="/group/id" className="viewdetal-button">
        View
      </Link>
    ),
  },
];

const Group = () => {
  const [listdata, setListdata] = useState([]);

  useEffect(() => {
    const api = "https://636dab7a91576e19e32cef5d.mockapi.io/joinUs";
    axios
      .get(api)
      .then((res) => {
        setListdata(res.data);
        console.log("listdayoff", res.data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  });

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
