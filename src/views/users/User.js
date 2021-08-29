import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import usersData from "./UsersData";

const User = ({ match }) => {
  const user = usersData.find((user) => user.id.toString() === match.params.id);
  const userDetails = user
    ? Object.entries(user)
    : [
        [
          "id",
          <span>
            <CIcon className="text-muted" name="cui-icon-ban" /> Not found
          </span>,
        ],
      ];

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            User id: {match.params.id}{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CButton
                size="sm"
                className="btn-facebook btn-brand mr-1 mb-1"
                to={`/users/${match.params.id}/edit`}
              >
                <CIcon size="sm" name="cil-pencil" />
                <span className="mfs-2">Edit User</span>
              </CButton>
              <CButton
                size="sm"
                className="btn-pinterest btn-brand mr-1 mb-1"
                to="/"
              >
                <CIcon size="sm" name="cil-trash" />
                <span className="mfs-2">Remove User</span>
              </CButton>
            </div>
          </CCardHeader>

          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {userDetails.map(([key, value], index) => {
                  return (
                    <tr key={index.toString()}>
                      <td>{`${key}:`}</td>
                      <td>
                        <strong>{value}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;
