import React from "react";
import l from "./Loader.module.css";

function Loader() {
  return (
    <div className={l.loader}>
      <div className={l.content}></div>
    </div>
  );
}

export default Loader;
