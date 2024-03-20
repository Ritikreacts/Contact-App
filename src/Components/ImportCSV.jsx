import React, { useState } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import {
  getContactInStorage,
  getCookie,
  setContactInStorage,
} from "../Services/storage";

export default function ImportCSV() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();
  const activeUserId = getCookie();
  function handleNavigate() {
    navigate("/home/contacts");
  }
  const handleFile = (event) => {
    setOpenSnackbar((prev) => true);
    Papa.parse(event.target.files[0], {
      complete: function (result) {
        const data = [];
        result.data.map((d) => {
          return data.push({
            name: d[0],
            email: d[1],
            number: d[2],
            avatar: d[3],
            contactId: d[4],
          });
        });
        data.shift();
        const contacts = getContactInStorage([activeUserId]);
        data.map((d) => {
          return contacts.push(d);
        });
        setContactInStorage([activeUserId], contacts);
        setTimeout(handleNavigate, 1500);
      },
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "click-away") {
      return;
    }
    setOpenSnackbar(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }
  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Contacts imported Successfully!
        </Alert>
      </Snackbar>
      <div className="import-csv-page">
        <h3>
          Please upload the <span className="csv">.CSV</span> file to import
        </h3>
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={handleFile}
        ></input>
      </div>
    </>
  );
}
