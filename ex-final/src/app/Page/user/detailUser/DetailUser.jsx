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
  const LINK_API = process.env.REACT_APP_API;

  useEffect(() => {
    setLoading(true)
    getDetailUserByID();
  }, [])

  const getDetailUserByID = async () => {
    try {
      const response = await axios.get(`${LINK_API}/user/${id}/edit`);
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
            <div className="view-detail ">
              <div className="lable-infor">
                <div className="row row-detail">
                  <span className="col-2">USer Name:</span>
                  <span className="col-10">{userName}</span>
                </div>
                <div className="row row-detail">
                  <span className="col-2">Email:</span>
                  <span className="col-10">{email}</span>
                </div>
                <div className="row row-detail">
                  <span className="col-2">Phone Number:</span>
                  <span className="col-10">{phoneNumber}</span>
                </div>
                <div className="row row-detail">
                  <span className="col-2">Role:</span>
                  <span className="col-10">{role}</span>
                </div>
              </div>
            </div>
            <Link className="link-btn" to={`/list`}>
              <Button className="btn-back" variant="primary">Back</Button>{' '}
            </Link>
          </div>
        </div>}
    </div>
  )
}
