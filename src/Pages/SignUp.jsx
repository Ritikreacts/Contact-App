import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { setUsersInStorage, getUsersInStorage } from "../Services/Storage";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://ritiksinghrajput.netlify.app/">
        Ritik Singh
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
let encodedPassword;

const defaultTheme = createTheme();

export default function SignUp() {
  const [open, setOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  function handleNavigate() {
    navigate("/");
  }

  function encrypt(data) {
    const baseString = data.password;
    encodedPassword = window.btoa(baseString);
    return encodedPassword;
  }
  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const formData = Object.keys(data)
      .filter((objKey) => objKey !== "passwordConfirm")
      .reduce((newObj, key) => {
        newObj[key] = data[key];
        return newObj;
      }, {});

    formData.password = encrypt(data);
    const encryptedData = { ...formData };
    encryptedData.userId = uuidv4();
    const dataInStorage = getUsersInStorage();
    if (dataInStorage !== null) {
      setOpen(true);
      const users = getUsersInStorage();
      users.push(encryptedData);
      setUsersInStorage(users);
      setTimeout(handleNavigate, 1500);
    } else {
      setOpen(true);
      const users = [encryptedData];
      setUsersInStorage(users);
      setTimeout(handleNavigate, 1500);
    }
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
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Registration Successful!
        </Alert>
      </Snackbar>
      <div className="container">
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      {...register("email", {
                        required: "Email is required",
                        validate: (value) => {
                          if (!value.match(/^\S+@\S+\.\S+$/)) {
                            return "Email is invalid";
                          } else {
                            return true;
                          }
                        },
                      })}
                      autoComplete="given-email"
                      name="email"
                      fullWidth
                      id="email"
                      label="Email"
                      autoFocus
                    />
                    {errors.email && (
                      <div className="error">{errors.email.message}</div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...register("password", {
                        required: "Password is required",
                        validate: (value) => {
                          if (value.length < 6) {
                            return "Minimum length should be 6";
                          } else {
                            return true;
                          }
                        },
                      })}
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      autoComplete="password"
                      onChange={(e) => {
                        setPassword((prev) => e.target.value);
                      }}
                    />
                    {errors.password && (
                      <div className="error">{errors.password.message}</div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...register("passwordConfirm", {
                        required: "Please confirm your Password",
                        validate: (value) => {
                          if (value !== password) {
                            return "Password does not match";
                          } else {
                            return true;
                          }
                        },
                      })}
                      fullWidth
                      name="passwordConfirm"
                      label="Confirm Password"
                      type="passwordConfirm"
                      id="passwordConfirm"
                      autoComplete="given-password"
                    />
                  </Grid>
                </Grid>
                {errors.passwordConfirm && (
                  <div className="error">{errors.passwordConfirm.message}</div>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Sign Up"}
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}
