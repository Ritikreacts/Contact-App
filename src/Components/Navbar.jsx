import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";

export default function ButtonAppBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeUserId =
    sessionStorage.getItem("activeUserId") !== null
      ? sessionStorage.getItem("activeUserId")
      : null;

  const dataBase = JSON.parse(localStorage.getItem("users"));
  const username = dataBase.find((obj) => obj.userId === activeUserId);
  const activeUser = username.email.match(/^([A-Za-z]+)/)[1];
  function userLoggedOut() {
    sessionStorage.removeItem("activeUserId");
    navigate("/");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
