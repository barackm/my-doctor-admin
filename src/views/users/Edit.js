import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSwitch,
  CButton,
  CCardFooter,
  CForm,
  CFormGroup,
  CFormText,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CLabel,
  CSelect,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import usersData from "./UsersData";

const Edit = ({ match }) => {
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
            <CCardHeader>
              Edit patient Information
              <small> {userDetails.name}</small>
            </CCardHeader>
            <CCardBody>
              <CForm
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Static</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <p className="form-control-static">Username</p>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Text"
                    />
                    <CFormText>Patient/Doctor name</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Lastname</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Text"
                    />
                    <CFormText>Patient/Doctor Lastname</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="email"
                      id="email-input"
                      name="email-input"
                      placeholder="Enter Email"
                      autoComplete="email"
                    />
                    <CFormText className="help-block">
                      Patient/Doctor Email
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
                      id="email-input"
                      name="email-input"
                      placeholder="Enter Phone number"
                      autoComplete="email"
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
                      name="date-input"
                      placeholder="date"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">About</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      name="textarea-input"
                      id="textarea-input"
                      rows="9"
                      placeholder="Content..."
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Status</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="select" id="select">
                      <option value="0">Please select</option>
                      <option value="1">Pending</option>
                      <option value="2">Active</option>
                      <option value="3">Inactive</option>
                      <option value="4">Banned</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Profile Image</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInputFile
                      id="file-multiple-input"
                      name="file-multiple-input"
                      accept="image/png,jpg,jpeg,gif"
                      custom
                    />
                    <CLabel htmlFor="file-multiple-input" variant="custom-file">
                      Choose Files...
                    </CLabel>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary">
                <CIcon name="cil-scrubber" /> Submit
              </CButton>
              <CButton
                type="reset"
                size="sm"
                color="danger"
                style={{ marginLeft: "0.5rem" }}
              >
                <CIcon name="cil-ban" /> Reset
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Edit;
