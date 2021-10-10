import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import Model from "../../reusable/Model";
import { loadUsers } from "src/store/reducers/users";
import { connect } from "react-redux";
import { loadDoctors } from "src/store/reducers/doctors";

const User = ({ match, users, history, loadUsers, loadDoctors, doctors }) => {
  const [modelShown, setModelShown] = useState(false);
  useEffect(() => {
    loadUsers();
    loadDoctors();
  }, [loadUsers, loadDoctors]);
  const user =
    users.find((user) => user._id.toString() === match.params.id) ||
    doctors.find((user) => user._id.toString() === match.params.id);
  if (!user) {
    return history.push("/users");
  }
  const handleDeleteUser = () => {
    console.log("deleting user...");
  };

  return (
    <CRow>
      <CCol lg={12}>
        {modelShown && (
          <Model
            onHideModel={setModelShown}
            modelShown={modelShown}
            onAccept={handleDeleteUser}
          />
        )}
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
                to={`/${doctors ? "doctors" : "users"}/${match.params.id}/edit`}
              >
                <CIcon size="sm" name="cil-pencil" />
                <span className="mfs-2">Edit User</span>
              </CButton>
              <CButton
                size="sm"
                className="btn-pinterest btn-brand mr-1 mb-1"
                onClick={() => setModelShown(true)}
              >
                <CIcon size="sm" name="cil-trash" />
                <span className="mfs-2">Remove User</span>
              </CButton>
            </div>
          </CCardHeader>

          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <td>Status</td>
                  <td>
                    <strong>{user.status || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>
                    <strong>{user.name || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>
                    <strong>{user.lastName || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <strong>{user.email || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>
                    <strong>{user.phoneNumber || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>
                    <strong>{user.age || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Kit Identifier</td>
                  <td>
                    <strong>{user.kitIdentifier || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>
                    <strong>{user.gender || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>
                    <strong>{user.country || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>
                    <strong>{user.city || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Street Number</td>
                  <td>
                    <strong>{user.streetNumber || "-"}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.list,
    loading: state.users.loading,
    doctors: state.doctors.list,
  };
};

const mapDispatchToProps = {
  loadUsers: () => loadUsers(),
  loadDoctors: () => loadDoctors(),
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
