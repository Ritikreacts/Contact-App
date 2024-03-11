import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Storage from "../Service.js/Storage";

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
const defaultTheme = createTheme();

export default function SignUp() {
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    if (JSON.parse(localStorage.getItem("users")) !== null) {
      const users = JSON.parse(localStorage.getItem("users"));
      users.push(data);
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      const users = [data];
      localStorage.setItem("users", JSON.stringify(users));
    }
  };
  return (
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
                  <Link to="./SignIn.js" variant="body2">
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
  );
}
