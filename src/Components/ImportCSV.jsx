import React, { useState } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import {
  getContactInStorage,
  getSession,
  setContactInStorage,
} from "../Services/storage";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

export default function ImportCSV() {
  const [openSnackBar, setSnackBarOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();
  const activeUserId = getSession();
  function handleNavigate() {
    navigate("/home/view");
  }
  const handleFile = (event) => {
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
        setSnackBarOpen(true);
        setTimeout(handleNavigate, 1500);
        // navigate("/home/view");
      },
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "click-away") {
      return;
    }
    setSnackBarOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <Snackbar
        openSnackBar={openSnackBar}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          File imported Successfully!
        </Alert>
      </Snackbar>
      <div className="App">
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
