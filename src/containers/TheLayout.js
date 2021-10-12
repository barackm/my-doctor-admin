import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import storage from "src/utils/storage";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = ({ history }) => {
  useEffect(() => {
    const token = storage.getAuthToken();
    if (!token || !jwtDecode(token).isAdmin) return history.replace("/login");
  }, [history]);
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
