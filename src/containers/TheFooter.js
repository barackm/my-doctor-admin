import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">
          copyright &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://barackm.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            Barack Mukelenga
          </a>
          ,{" "}
          <a
            href="https://moiser.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Moise Rushanika
          </a>
          .
        </span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href="https://www.ulk.ac.rw/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ULK Students
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
