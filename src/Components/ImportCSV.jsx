import React from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { getContactInStorage, setContactInStorage } from "../Services/Storage";

export default function ImportCSV() {
  const navigate = useNavigate();
  const activeUserId =
    sessionStorage.getItem("activeUserId") !== null
      ? sessionStorage.getItem("activeUserId")
      : null;
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
        navigate("/home/view");
      },
    });
  };
  return (
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
  );
}
