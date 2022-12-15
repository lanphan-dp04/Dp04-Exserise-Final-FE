import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
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

      <div className="box-user">
        <img
          src="https://toanthaydinh.com/wp-content/uploads/2020/04/avatar-dep-nhat-111_112148.jpg "
          alt="avatar"
          className="avatar-img"
        />
        <p>Name</p>
        <div className="box-logout">
          <div className="logout">
            <Link to="/login">
              <span>
                {" "}
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
