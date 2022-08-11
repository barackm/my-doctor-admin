import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import storage from "src/utils/storage";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = ({ history }) => {
  const [isFetching, setIsFetching] = React.useState(true);
  window.appHistory = history;

  useEffect(() => {
    const token = storage.getAuthToken();
    if (token) {
      const decoded = jwtDecode(token);
      if (!decoded.isAdmin) {
        history.replace("/login");
      }
      setIsFetching(false);
    } else {
      setIsFetching(false);
      history.replace("/login");
    }
  }, [history]);
  return (
    <div className="c-app c-default-layout">
      {!isFetching && (
        <>
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </>
      )}
    </div>
  );
};

export default TheLayout;
