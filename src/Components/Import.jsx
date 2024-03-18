import React, { useState, useRef } from "react";

const CSVFileReader = () => {
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const csvData = reader.result;
      try {
        const parsedData = parseCSV(csvData);
        setJsonData(parsedData);
        storeDataInLocalStorage(parsedData);
        setError(null);
      } catch (error) {
        setError(
          "Error parsing CSV file. Please make sure the file is in the correct format."
        );
        console.error(error); // Log the error for debugging
      }
    };
    reader.readAsText(file);
  };

  const parseCSV = (csvData) => {
    const lines = csvData.split("\n");
    const headers = lines.shift().split(",");
    const data = lines.map((line) => {
      const values = line.split(",");
      const obj = {};
      headers.forEach((header, index) => {
        if (header === "contactId") {
          const contactId = values.slice(index).join(",");
          obj[header] = contactId;
        } else {
          obj[header] = values[index];
        }
      });
      return obj;
    });
    return data;
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <h2>CSV File Reader</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button onClick={handleButtonClick}>Upload CSV File</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {jsonData && (
        <div>
          <h3>CSV Data</h3>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CSVFileReader;
