import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getSession, getUsersInStorage } from "../Services/storage";

export default function ButtonAppBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeUserId = getSession();

  const dataBase = getUsersInStorage();
  const username = dataBase.find((obj) => obj.userId === activeUserId);
  const activeUser = username ? username.email.match(/^([A-Za-z]+)/)[1] : "";
  function userLoggedOut() {
    sessionStorage.removeItem("activeUserId");
    navigate("/");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <Link to="/home"></Link> */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Hello! <span className="user-name">{activeUser || "name"}</span>
          </Typography>
          <Button
            color="inherit"
            onClick={userLoggedOut}
            className="button-new"
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
