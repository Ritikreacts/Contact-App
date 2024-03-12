import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Action = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  
  const activeAdd = splitLocation[1] === "home" && splitLocation[2] === "add";
  const activeView = splitLocation[1] === "home" && splitLocation[2] === "view";
  const activeImport = splitLocation[1] === "home" && splitLocation[2] === "import";
  const activeExport = splitLocation[1] === "home" && splitLocation[2] === "export";

  return (
    <div className="container">
      <NavLink
        to="/home/add"
        className={activeAdd ? "active" : ""}
      >
        Add Contact
      </NavLink>
      <NavLink
        to="/home/view"
        className={activeView ? "active" : ""}
      >
        View Contact
      </NavLink>
      <NavLink
        to="/home/import"
        className={activeImport ? "active" : ""}
      >
        Import Contact
      </NavLink>
      <NavLink
        to="/home/export"
        className={activeExport ? "active" : ""}
      >
        Export Contact
      </NavLink>
    </div>
  );
};

export default Action;
