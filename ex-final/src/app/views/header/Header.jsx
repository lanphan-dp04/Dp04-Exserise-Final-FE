import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const name = useSelector((state) => state.auth.login.currentUser.userName);
  const avatar = useSelector((state) => state.auth.login.currentUser.avatar);
  const role = useSelector((state) => state.auth.login.currentUser.role);
  const addUser = (
    <div className="box-logoff">
      <div className="box-addnewmember">
        <Link to="list/form" type="button">
          <span>
            {" "}
            <FontAwesomeIcon icon={faUserPlus} />
          </span>
          New Member
        </Link>
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

      <div className="box-user">
        <img src={avatar} alt="avatar" className="avatar-img" />
        <p>{name}</p>
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
