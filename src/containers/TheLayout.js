import React, { useEffect } from "react";
import checkAuthentication from "src/utils/checkAuthentication";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = ({ history }) => {
  useEffect(() => {
    if (!checkAuthentication()) return history.replace("/login");
  }, []);
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
