import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Action = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  return (
    <>
      <div className="container">
        <NavLink
          to="home/add"
          className={splitLocation[1] === "/home/add" ? "active" : ""}
        >
          Add Contact
        </NavLink>
        <NavLink
          to="/view"
          className={splitLocation[1] === "/home/view" ? "active" : ""}
        >
          View Contact
        </NavLink>
        <NavLink
          to="/import"
          className={splitLocation[1] === "/home/import" ? "active" : ""}
        >
          Import Contact
        </NavLink>
        <NavLink
          to="/export"
          className={splitLocation[1] === "/home/export" ? "active" : ""}
        >
          Export Contact
        </NavLink>
      </div>
    </>
  );
};

export default Action;
