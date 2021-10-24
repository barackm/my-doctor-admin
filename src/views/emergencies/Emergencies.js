import React, { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CLink,
  CRow,
  CButton,
  CBadge,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";
import { loadEmergencies } from "src/store/reducers/emergencies";
import moment from "moment";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "danger";
    case "Pending":
      return "warning";
    default:
      return "primary";
  }
};

const Emergencies = ({ loadEmergencies, emergencies }) => {
  useEffect(() => {
    loadEmergencies();
  }, []);

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            {emergencies.length === 0 ? (
              <div>
                <h3>No Emergencies</h3>{" "}
              </div>
            ) : (
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">
                      <CIcon name="cil-people" />
                    </th>
                    <th>Petient</th>
                    <th>Phone number</th>
                    <th>Status</th>
                    <th>Activity</th>
                    <th>Locate Patient</th>
                  </tr>
                </thead>
                <tbody>
                  {emergencies.map((emergency) => (
                    <tr key={emergency._id}>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img
                            src={
                              emergency.patient.profileImage ||
                              "https://res.cloudinary.com/fidbagraphicscode/image/upload/v1633880714/doctor-app/avatar_face_man_boy_male_profile_smiley_happy_people_icon_181658_awodng.png"
                            }
                            className="c-avatar-img"
                            alt={emergency.patient.name}
                          />
                        </div>
                      </td>
                      <td>
                        <CLink
                          className="c-subheader-nav-link"
                          to={`/users/${emergency.patient._id}`}
                        >
                          <div>
                            {emergency.patient.name +
                              " " +
                              emergency.patient.lastName}
                          </div>
                        </CLink>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td>
                        <div className="small text-muted">Phone</div>
                        <strong>{emergency.patient.phoneNumber || "-"}</strong>
                      </td>
                      <td>
                        <div className="small text-muted">Patient's status</div>
                        <CBadge color={getBadge(emergency.patient.status)}>
                          {emergency.patient.status}
                        </CBadge>
                      </td>
                      <td>
                        <div className="small text-muted">
                          Emergency received
                        </div>
                        <strong>{moment(emergency.createdAt).fromNow()}</strong>
                      </td>
                      <td>
                        <CButton
                          size="sm"
                          className="btn-facebook btn-brand mr-1 mb-1"
                          to={`/localisation/${emergency._id}`}
                        >
                          <CIcon name="cil-user" size="sm" />
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = (state) => {
  return { emergencies: state.emergencies.list };
};

const mapDispatchToProps = {
  loadEmergencies: () => loadEmergencies(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Emergencies);
