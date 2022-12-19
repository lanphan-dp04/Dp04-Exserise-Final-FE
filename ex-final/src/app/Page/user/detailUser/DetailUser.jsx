import "./DetailUser.scss";
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loanding from "../../../components/loading/Loanding";


export default function DetailUser() {
  const { id } = useParams();
  const [dataUser, setDataUser] = useState([]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    getDetailUserByID();
  }, [])

  const getDetailUserByID = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}/edit`);
      setUserName(response.data.userName);
      setEmail(response.data.email);
      setPhoneNumber(response.data.phoneNumber);
      setRole(response.data.role);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      return err;
    }
  }
  return (
    <div>
      {loading ? <Loanding /> :
    <div className="container container-detail">
      <div className="content-detail">
        <div className="title-detail">
          <h2 className="title-text">Basic Information</h2>
        </div>
        <div className="view-detail row">
          <div className="col-2 lable-infor">
            <p>USer Name:</p>
            <p>Email:</p>
            <p>Phone Number:</p>
            <p>Role:</p>
          </div>
          <div className="col data-user">
            <p>{userName}</p>
            <p>{email}</p>
            <p>{phoneNumber}</p>
            <p>{role}</p>
          </div>
        </div>
        <Link className="link-btn" to={`/list`}>
          <Button variant="primary">Back</Button>{' '}
        </Link>
      </div>
    </div>}
    </div>
  )
}
