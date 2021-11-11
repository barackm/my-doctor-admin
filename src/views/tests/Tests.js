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
  CPagination,
} from "@coreui/react";

import { connect, useSelector } from "react-redux";
import { loadTests } from "src/store/reducers/tests";
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

const Tests = (props) => {
  const { loadTests, match } = props;
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const tests = useSelector((state) => state.tests.list);
  const loading = useSelector((state) => state.tests.loading);

  const pageChange = (newPage) => {};

  useEffect(() => {
    const patientId = match.params.id;
    console.log(patientId);
    if (patientId) {
      loadTests(patientId);
    } else {
      loadTests(null);
    }
    currentPage !== page && setPage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            {match.params.id && tests[0]
              ? `${tests[0].patient.name}'s `
              : "Patient's "}
            Tests
            <small className="text-muted"> List</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              loading={loading}
              items={tests.map((test) => {
                return {
                  _id: test._id,
                  name: test.patient.name,
                  patientId: test.patient._id,
                  createdAt: moment(test.createdAt).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  ),
                  temperature: test.temperature,
                  heartRate: test.heartRate,
                  bloodPressure: test.bloodPressure,
                  status: test.patient.status,
                  email: test.patient.email,
                  phoneNumber: test.patient.phoneNumber,
                  lastName: test.patient.lastName,
                };
              })}
              fields={[
                { key: "name", _classes: "font-weight-bold" },
                { key: "heartRate", _classes: "font-weight-bold" },
                "bloodPressure",
                "temperature",
                "createdAt",
                "status",
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.patientId}/`)}
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={Math.ceil(tests.length / 5)}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = (state) => {
  return {
    tests: state.tests.list,
    loading: state.tests.loading,
  };
};

const mapDispatchToProps = {
  loadTests: (patientId) => loadTests(patientId),
};

export default connect(mapStateToProps, mapDispatchToProps)(Tests);
