import React, { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CCardFooter,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CSelect,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import { loadUsers, updateUserInfo } from "src/store/reducers/users";
import { connect } from "react-redux";
import Toaster from "src/reusable/Toaster";

const Edit = ({ match, users, loadUsers, history, updateUserInfo, error }) => {
  const [errors, setErrors] = React.useState({});
  const [user, setUser] = React.useState({
    _id: "",
    name: "",
    email: "",
    lastName: "",
    phoneNumber: "",
    age: "",
    status: "Pending",
    gender: "",
    country: "",
    city: "",
    profileImage: "",
    streetNumber: "",
    kitIdentifier: "",
  });

  useEffect(() => {
    loadUsers();
    const foundUser = users.find(
      (user) => user._id.toString() === match.params.id
    );

    if (!foundUser) {
      history.replace("/users");
    }
    setUser({ ...user, ...foundUser });
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateUserData(user);
    if (errors["name"] || errors["email" || errors["lastName"]]) return;
    updateUserInfo(user._id, user);
  };

  const validateUserData = (userData) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const newErrors = {};
    if (!emailRegex.test(userData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (userData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }
    if (userData.lastName.length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      {error && (
        <Toaster title="User action Failed" message={error} show error />
      )}
      <CRow
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CCol xs="12" md="8">
          <CCard>
            {user.name ? (
              <CCardHeader>
                Edit patient Information
                <strong> {user.name}</strong>
              </CCardHeader>
            ) : (
              <CCardHeader>New Doctor Registration</CCardHeader>
            )}
            <CCardBody>
              <CForm
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="form-horizontal"
              >
                {user.name && (
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Email</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <p className="form-control-static">{user.email}</p>
                    </CCol>
                  </CFormGroup>
                )}
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="name"
                      value={user.name}
                      placeholder="Text"
                      onChange={handleChange}
                    />
                    {errors["name"] && (
                      <CFormText color="danger">{errors["name"]}</CFormText>
                    )}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="lastName"
                      placeholder="Last Name"
                      onChange={handleChange}
                      value={user.lastName}
                    />
                    {errors["lastName"] && (
                      <CFormText color="danger">{errors["lastName"]}</CFormText>
                    )}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="Enter Email"
                      autoComplete="email"
                      value={user.email}
                    />
                    <CFormText className="help-block">
                      {errors["email"] && (
                        <CFormText color="danger">{errors["email"]}</CFormText>
                      )}
                    </CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Phone number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      name="phoneNumber"
                      placeholder="Enter Phone number"
                      autoComplete="email"
                      onChange={handleChange}
                      value={user.phoneNumber}
                    />
                    <CFormText className="help-block">
                      Patient/Doctor Phone number
                    </CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Birth Date</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="date"
                      id="date-input"
                      name="age"
                      onChange={handleChange}
                      placeholder="date"
                      value={user.age}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Country</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      name="country"
                      onChange={handleChange}
                      placeholder="Country"
                      value={user.country}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">City</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      name="city"
                      onChange={handleChange}
                      placeholder="City"
                      value={user.city}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Street Number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      name="streetNumber"
                      onChange={handleChange}
                      placeholder="Street Number"
                      value={user.streetNumber}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Profile Picture URL</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      name="profileImage"
                      onChange={handleChange}
                      placeholder="Profile Picture URL"
                      value={user.profileImage}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Kit Identifier</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      name="kitIdentifier"
                      onChange={handleChange}
                      placeholder="Kit Identifier (RFID)"
                      value={user.kitIdentifier}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Status</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="status"
                      id="select"
                      onChange={handleChange}
                      defaultValue={user.status}
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Gender</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="gender"
                      id="select"
                      defaultValue={user.gender}
                      onChange={handleChange}
                    >
                      <option>Choose...</option>
                      <option value="M">M</option>
                      <option value="F">F</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton size="sm" color="primary" onClick={handleSubmit}>
                <CIcon name="cil-scrubber" /> Submit
              </CButton>
              {user._id && (
                <CButton
                  type="reset"
                  size="sm"
                  color="danger"
                  style={{ marginLeft: "0.5rem" }}
                  onClick={() => setUser({ ...user })}
                >
                  <CIcon name="cil-ban" /> Reset
                </CButton>
              )}
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
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
  updateUserInfo: (id, user) => updateUserInfo(id, user),
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
