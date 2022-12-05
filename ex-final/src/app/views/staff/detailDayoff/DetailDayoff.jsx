import React from "react";
import "./detaildayoff.css";

export default function DetailDayoff() {
  return (
    <div className="container">
      <div className="layout-detaildayoff">
        <div className="detail-dayoff">
          <h4>Basic Information</h4>
          <table>
            <tr>
              <th className="">From:</th>
              <td>test</td>
            </tr>
            <tr>
              <th>To:</th>
              <td>test</td>
            </tr>
            <tr>
              <th>Time:</th>
              <td>test</td>
            </tr>
            <tr>
              <th>Quantify:</th>
              <td>test</td>
            </tr>
            <tr>
              <th>Reason:</th>
              <td>test</td>
            </tr>
            <tr>
              <th>Status:</th>
              <td>test</td>
            </tr>
          </table>

          <h4>Action</h4>
        </div>
        <div className="histories">
          <h4>History</h4>
        </div>
      </div>
    </div>
  );
}
