import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar(props) {
  const navigate = useNavigate();
  function userLoggedOut() {
    sessionStorage.removeItem("token");
    navigate("/");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Hello! {props.name || "name"}
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
