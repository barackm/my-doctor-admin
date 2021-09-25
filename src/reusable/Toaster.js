import React, { useState } from "react";
import {
  CCard,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CContainer,
  CRow,
  CCol,
} from "@coreui/react";

const Toaster = ({ title, message, show, error }) => {
  const [toasts, setToasts] = useState([
    { position: "top-right", autohide: 8000 },
  ]);

  const toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || [];
      toasters[toast.position].push(toast);
      return toasters;
    }, {});
  })();

  return (
    <CCard>
      {Object.keys(toasters).map((toasterKey) => (
        <CToaster position={toasterKey} key={"toaster" + toasterKey}>
          {toasters[toasterKey].map((toast, key) => {
            return (
              <CToast
                key={"toast" + key}
                show={show}
                autohide={toast.autohide}
                fade={toast.fade}
                className={error ? "bg-danger text-white" : ""}
              >
                <CToastHeader closeButton={toast.closeButton}>
                  {title}
                </CToastHeader>
                <CToastBody>{message}</CToastBody>
              </CToast>
            );
          })}
        </CToaster>
      ))}
    </CCard>
  );
};

export default Toaster;
