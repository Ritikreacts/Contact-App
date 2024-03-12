import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Snackbar from "../Components/Snackbar";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://ritiksinghrajput.netlify.app/">
        Ritik Singh
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
let encodedString;

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function encrypt(data) {
    console.log("data to encrypt-", data.password);
    const baseString = data.password;
    encodedString = window.btoa(baseString);
    console.log("after encryption -", encodedString);
    return encodedString;
  }
  const onSubmit = (data) => {
    const formData = Object.keys(data)
      .filter((objKey) => objKey !== "passwordConfirm")
      .reduce((newObj, key) => {
        newObj[key] = data[key];
        return newObj;
      }, {});

    console.log(formData.password);
    formData.password = encrypt(data);
    const encryptedData = { ...formData };
    if (JSON.parse(localStorage.getItem("users")) !== null) {
      const users = JSON.parse(localStorage.getItem("users"));
      users.push(encryptedData);
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/", { state: { isDiverted: true } });
    } else {
      const users = [encryptedData];
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/", { state: { isDiverted: true } });
    }
  };
  return (
    <>
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
                >
                  Sign Up
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
