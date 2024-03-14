import React, { useState } from "react";
import { useCSVReader, useCSVDownloader } from "react-papaparse"; // Import useCSVReader from react-papaparse
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Action = () => {
  const [importedData, setImportedData] = useState([]);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const activeAdd = splitLocation[1] === "home" && splitLocation[2] === "add";
  const activeView = splitLocation[1] === "home" && splitLocation[2] === "view";
  const activeImport =
    splitLocation[1] === "home" && splitLocation[2] === "import";
  const activeExport =
    splitLocation[1] === "home" && splitLocation[2] === "export";

  const handleImport = (data) => {
    setImportedData(data);
    // Update your local storage with imported data
    localStorage.setItem("importedData", JSON.stringify(data));
  };

  const Import = () => {
    const { openDialog } = useCSVReader({
      onFileLoaded: handleImport,
    });

    return (
      <div className="import">
        <button className="import-btn" onClick={openDialog}>
          Import
        </button>
      </div>
    );
  };

  const Export = () => {
    const { CSVDownloader, Type } = useCSVDownloader();
    const activeUserId =
      sessionStorage.getItem("activeUserId") !== null
        ? sessionStorage.getItem("activeUserId")
        : null;
    const data = JSON.parse(localStorage.getItem(activeUserId)) || [];
    return (
      <div className="export">
        <CSVDownloader
          className="export-btn"
          type={Type.Button}
          bom={true}
          filename={"JSON-TO-CSV"}
          delimiter={";"}
          data={data}
        >
          Export
        </CSVDownloader>
      </div>
    );
  };

  return (
    <div className="new-container">
      <NavLink
        to={{ pathname: "/home/add", state: importedData }}
        className={activeAdd ? "active" : ""}
      >
        Add Contact
      </NavLink>
      <NavLink to="/home/view" className={activeView ? "active" : ""}>
        View Contact
      </NavLink>
      <NavLink>{Import}</NavLink>
      <NavLink>{Export()}</NavLink>
    </div>
  );
};

export default Action;
