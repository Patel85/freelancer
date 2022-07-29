import React from "react";
import { FacebookIcon } from "@components/ui/Icon";
import cn from "classnames";
import s from "./SidebarLayout.module.css";

const SidebarLayout = ({ children, className, handleClose, handleBack }) => {
  return (
    <div className={cn(s.root, className)}>
      <header className={s.header}>
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none"
          >
            <FacebookIcon className="h-6 w-6 hover:text-accent-3" />
            <span className="ml-2 text-accent-7 text-sm ">Close</span>
          </button>
        )}
        {handleBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none"
          >
            <FacebookIcon className="h-6 w-6 hover:text-accent-3" />
            <span className="ml-2 text-accent-7 text-xs">Back</span>
          </button>
        )}
        <span className={s.nav}></span>
      </header>
      <div className={s.container}>{children}</div>
    </div>
  );
};

export default SidebarLayout;
