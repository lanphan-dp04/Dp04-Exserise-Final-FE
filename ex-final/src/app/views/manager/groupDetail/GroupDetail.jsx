import React from "react";
import "./groupdetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";

export default function GroupDetail() {

  const { id } = useParams();
  const [idNameGroup, setIdNameGroup] = useState("");
  const [idMember, setIdMember] = useState("");
  const apiGroupData = `http://localhost:5000/group/list/${id}`;

  useEffect(() => {
    getGroupByID()
  }, [])
  const getGroupByID = async () => {
    try {
      const response = await axios.get(apiGroupData);
      let temp = await response.data;
      setIdNameGroup(temp.nameGroup);
      setIdMember(temp.memberID);
      console.log("data 1:", temp);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }

  return (
    <div className="container group-container">
      <div className="box-title">
        <h3>Group Detail </h3>
      </div>
      <div>
        <div className="box-groupdetail">
          <div className="box-groupdetail-name">
            <h5>Name</h5>
            <div>
              <p>
                <span>
                  <FontAwesomeIcon icon={faLayerGroup} />
                </span>
                {idNameGroup}
              </p>
            </div>
          </div>
          <div className="box-groupdetail-member">
            <h5>Masters</h5>
            <div>
              <p>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>Phong
              </p>
            </div>
          </div>
          <div className="box-groupdetail-member">
            <h5>Members</h5>
            <div>
              <p>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>Long
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-btn">
        <Link className="link-btn" to={`/group`}>
          <Button variant="primary">Back</Button>{' '}
        </Link>
      </div>
    </div>
  );
}
