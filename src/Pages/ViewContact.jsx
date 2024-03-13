import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(avatar, name, email, number, contactId) {
  return { avatar, name, email, number, contactId };
}

export default function CustomizedTables() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("contacts")) || [];
    setRows(
      storedData.map((row) =>
        createData(
          row.avatar ? (
            <Avatar alt={row.name} src={row.avatar} />
          ) : (
            <Avatar>{row.name[0]}</Avatar>
          ),
          row.name,
          row.email,
          row.number,
          row.contactId
        )
      )
    );
  }, []);

  useEffect(() => {
    window.addEventListener("storage", updateTable);
    return () => window.removeEventListener("storage", updateTable);
  }, []);

  const updateTable = () => {
    const storedData = JSON.parse(localStorage.getItem("contacts")) || [];
    setRows(
      storedData.map((row) =>
        createData(
          row.avatar ? (
            <Avatar alt={row.name} src={row.avatar} />
          ) : (
            <Avatar>{row.name[0]}</Avatar>
          ),
          row.name,
          row.email,
          row.number,
          row.contactId
        )
      )
    );
  };

  const handleDelete = (contactId) => {
    const updatedRows = rows.filter((row) => row.contactId !== contactId);
    setRows(updatedRows);
    localStorage.setItem("contacts", JSON.stringify(updatedRows));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Avatar</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Number</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.contactId}>
              <StyledTableCell component="th" scope="row">
                {row.avatar}
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.number}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  className="btn-action"
                  aria-label="edit"
                  // onClick={() => handleEdit(row.contactId)}
                >
                  <EditIcon style={{ color: "green" }} />
                </IconButton>
                <IconButton
                  className="btn-action"
                  aria-label="delete"
                  onClick={() => handleDelete(row.contactId)}
                >
                  <DeleteIcon style={{ color: "red" }} />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
