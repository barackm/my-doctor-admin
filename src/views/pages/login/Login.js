import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import checkAuthentication from "src/utils/checkAuthentication";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: null, password: null });
  useEffect(() => {
    if (checkAuthentication()) return history.replace("/");
  });

  const handleChange = ({ target }) => {
    if (target.name === "email") {
      setEmail(target.value);
    } else {
      setPassword(target.value);
    }
  };

  const handleSubmit = () => {
    if (email.trim().length === 0) {
      setErrors({ ...errors, email: "Email is required" });
    } else if (email.trim().length > 0) {
      setErrors({ ...errors, email: null });
    }
    if (password.trim().length === 0) {
      setErrors({ ...errors, password: "Password is required" });
    } else if (password.trim().length > 0) {
      setErrors({ password: null });
    }

    if (errors.email && errors.password) {
      console.log("submitting....");
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Username"
                        autoComplete="username"
                      />
                      {errors.email && <p>{errors.email}</p>}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        name="password"
                        value={password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    {errors.password && <p>{errors.password}</p>}
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleSubmit}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>My Doctor Admin</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
