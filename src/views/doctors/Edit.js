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
  CTextarea,
  CInput,
  CLabel,
  CSelect,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import { connect } from "react-redux";
import {
  createDoctor,
  loadDoctors,
  updateDoctorInfo,
} from "src/store/reducers/doctors";

const Edit = ({
  match,
  history,
  loadDoctors,
  doctors,
  createDoctor,
  updateDoctorInfo,
}) => {
  const [errors, setErrors] = React.useState({});
  const [doctor, setDoctor] = React.useState({
    _id: "",
    name: "",
    email: "",
    lastName: "",
    phoneNumber: "",
    age: "",
    status: "Pending",
    gender: "",
    country: "",
    about: "",
    city: "",
    profileImage: "",
    password: "",
  });

  useEffect(() => {
    loadDoctors();
    if (match.params.id === "new") {
      return;
    }

    const doctor = doctors.find(
      (doctor) => doctor._id.toString() === match.params.id
    );
    if (!doctor) {
      history.replace("/doctors");
    }

    setDoctor({ ...doctor, password: "" });
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateUserData(doctor);
    if (errors["name"] || errors["email" || errors["lastName"]]) return;
    if (doctor._id) {
      updateDoctorInfo(doctor._id, doctor);
      history.push("/doctors");
    } else {
      createDoctor(doctor);
      history.push("/doctors");
    }
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
      <CRow
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CCol xs="12" md="8">
          <CCard>
            {doctor.name ? (
              <CCardHeader>
                Edit patient Information
                <strong> {doctor.name}</strong>
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
                {doctor.name && (
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Email</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <p className="form-control-static">{doctor.email}</p>
                    </CCol>
                  </CFormGroup>
                )}
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="name"
                      value={doctor.name}
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
                      id="text-input"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={handleChange}
                      value={doctor.lastName}
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
                      value={doctor.email}
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
                      value={doctor.phoneNumber}
                    />
                    <CFormText className="help-block">
                      Patient/Doctor Phone number
                    </CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">About</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      name="about"
                      id="about"
                      value={doctor.about}
                      rows="9"
                      onChange={handleChange}
                      placeholder="About..."
                      maxLength="225"
                    />
                    <CFormText className="help-block">
                      Max 255 characters
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
                      value={doctor.age}
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
                      value={doctor.country}
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
                      value={doctor.city}
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
                      value={doctor.profileImage}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="Password"
                      value={doctor.password}
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
                      defaultValue={doctor.status}
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
                      onChange={handleChange}
                      defaultValue={doctor.gender}
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
              {doctor._id && (
                <CButton
                  type="reset"
                  size="sm"
                  color="danger"
                  style={{ marginLeft: "0.5rem" }}
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
    loading: state.users.loading,
    doctors: state.doctors.list,
  };
};

const mapDispatchToProps = {
  createDoctor: (doctor) => createDoctor(doctor),
  loadDoctors: () => loadDoctors(),
  updateDoctorInfo: (id, doctor) => updateDoctorInfo(id, doctor),
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
