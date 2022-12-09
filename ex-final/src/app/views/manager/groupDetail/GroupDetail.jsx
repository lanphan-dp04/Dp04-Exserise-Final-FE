import React from "react";
import "./groupdetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

export default function GroupDetail() {
  return (
    <div className="container group-container">
      <div className="box-title">
        <h3>Group Detail </h3>
      </div>
      <div className="box-groupdetail">
        <div className="box-groupdetail-name">
          <h5>Name</h5>
          <div>
            <p>
              {" "}
              <span>
                <FontAwesomeIcon icon={faLayerGroup} />
              </span>
              HR
            </p>
          </div>
        </div>
        <div className="box-groupdetail-member">
          <h5>Masters</h5>
          <div>
            <p>
              {" "}
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              HR
            </p>
          </div>
        </div>
        <div className="box-groupdetail-member">
          <h5>Members</h5>
          <div>
            <p>
              {" "}
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              HR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
