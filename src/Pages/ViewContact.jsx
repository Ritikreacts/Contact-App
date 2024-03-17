import React, { useState, useEffect,useRef } from "react";
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
import { useNavigate, Outlet } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import {
  getSession,
  getContactInStorage,
  setContactInStorage,
} from "../Services/Storage";

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
  const [open, setOpen] = useState(false);
  const [isTableEmpty, setEmpty] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();
  const activeUserId = getSession();
  const [rows, setRows] = useState([]);
  const tableHeader = useRef(null)

  useEffect(() => {
    const storedData = getContactInStorage([activeUserId]);
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
    updateHeader();
  }, []);

  useEffect(() => {
    window.addEventListener("storage", updateTable);
    return () => window.removeEventListener("storage", updateTable);
  }, []);
  

  function updateHeader(){
    const contacts = getContactInStorage([activeUserId]);
    if(contacts === null || contacts.length===0){
      tableHeader.current.style.display="none"
      setEmpty(true);
      
    }
  }
  const updateTable = () => {
    const storedData = getContactInStorage([activeUserId]);
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
    setContactInStorage([activeUserId], updatedRows);
    setOpen(true);
    updateHeader();
  };
  const handleEdit = (contactId) => {
    navigate("/home/edit", {
      state: contactId,
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "click-away") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }
  if(isTableEmpty){
    return <h1 style={{textAlign:"center"}}>No contacts saved </h1>
  }
  else{
    return(
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Contact Deleted Successful!
        </Alert>
      </Snackbar>
      <Outlet></Outlet>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead ref={tableHeader} >
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
                <StyledTableCell className="avatar" component="th" scope="row">
                  {row.avatar}
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.number}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    className="btn-action"
                    aria-label="edit"
                    onClick={() => handleEdit(row.contactId)}
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
    </>
  );

  }
}
