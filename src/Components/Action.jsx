import React, { useState } from "react";
import { useCSVReader, useCSVDownloader } from "react-papaparse"; // Import useCSVReader from react-papaparse
import { NavLink, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getContactInStorage, getCookie } from "../Services/storage";

const Export = () => {
  const { CSVDownloader, Type } = useCSVDownloader();
  const activeUserId = getCookie();
  const data = getContactInStorage([activeUserId]) || [];
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

  return (
    <div className="new-container">
      <NavLink
        to={{ pathname: "/home/add", state: importedData }}
        className={activeAdd ? "active border-1" : "border-1"}
      >
        Add Contact
      </NavLink>
      <NavLink
        to="/home/contacts"
        className={activeView ? "active border-1" : "border-1"}
      >
        Contacts
      </NavLink>
      <NavLink
        to="/home/import"
        className={activeView ? "border-1" : "import-export"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={21}
          height={22}
          id="download"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <path d="M1 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3M6 11l4 4 4-4M10 1v14" />
          </g>
        </svg>
        Import
      </NavLink>
      <Link className="import-export">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={22}
          id="upload"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <path d="M1 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3M14 5l-4-4-4 4M10 1v14" />
          </g>
        </svg>

        {<Export />}
      </Link>
    </div>
  );
};

export default Action;
