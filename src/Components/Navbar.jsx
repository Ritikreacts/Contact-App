import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import { clearCookie, getCookie, getUsersInStorage } from "../Services/storage";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const activeUserId = getCookie();
  console.log("data in cookie", activeUserId);

  const dataBase = getUsersInStorage();
  const username = dataBase.find((obj) => obj.userId === activeUserId);
  const activeUser = username ? username.email.match(/^([A-Za-z]+)/)[1] : "";
  function userLoggedOut() {
    clearCookie();
    navigate("/");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/home" className="home-link">
              Hello! <span className="user-name">{activeUser || "name"}</span>
            </Link>
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
