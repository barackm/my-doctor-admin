import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CPagination,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { connect, useSelector } from "react-redux";
import { loadDoctors } from "src/store/reducers/doctors";
import Toaster from "src/reusable/Toaster";

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

const Doctors = ({ loadDoctors, doctors, error }) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const loading = useSelector((state) => state.doctors.loading);

  const pageChange = (newPage) => {};

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    loadDoctors();
  }, [currentPage, page, loadDoctors]);

  console.log(doctors);
  return (
    <>
      {error && (
        <Toaster title="Doctor action Failed" message={error} show error />
      )}
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                Doctors
                <small className="text-muted"> List</small>
              </div>
              <CButton
                size="sm"
                className="btn-facebook btn-brand mr-1 mb-1"
                to={`/doctors/new/edit`}
              >
                <CIcon size="sm" name="cil-pencil" />
                <span className="mfs-2">New Doctor</span>
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={Array.isArray(doctors) ? doctors : []}
                loading={loading}
                fields={[
                  { key: "name", _classes: "font-weight-bold" },
                  { key: "lastName", _classes: "font-weight-bold" },
                  "email",
                  "phoneNumber",
                  "status",
                ]}
                hover
                striped
                itemsPerPage={5}
                activePage={page}
                clickableRows
                onRowClick={(item) => history.push(`/doctors/${item._id}`)}
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                }}
              />
              <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={Math.ceil(doctors.length / 5)}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    doctors: state.doctors.list,
    error: state.doctors.error,
  };
};

const mapDispatchToProps = {
  loadDoctors: () => loadDoctors(),
};
export default connect(mapStateToProps, mapDispatchToProps)(Doctors);
