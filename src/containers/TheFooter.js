import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">
          copyright &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://alfredbis29.github.io/My-portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alfred Bisimwa
          </a>
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
