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
import { useNavigate } from "react-router-dom";
import { getUsersInStorage, setSession } from "../Services/Storage";

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
let encodedPassword;
const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  function encrypt(data) {
    const baseString = data.password;
    encodedPassword = window.btoa(baseString);
    return encodedPassword;
  }
  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const formData = { ...data };
      formData.password = encrypt(data);
      const encryptedData = { ...formData };
      console.log("encryptedData", encryptedData);
      const users = getUsersInStorage();
      console.log(users);

      users.forEach((element) => {
        if (
          element.email === encryptedData.email &&
          element.password === encryptedData.password
        ) {
          setSession(element.userId);
          navigate("home");
        }
      });
      throw new Error();
    } catch (error) {
      setError("root", {
        message: "No user found with this email or password",
      });
    }
  };

  return (
    <>
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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
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
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {errors.email && (
                <div className="error">{errors.email.message}</div>
              )}
              <TextField
                {...register("password", {
                  required: "Password is required",
                })}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errors.password && (
                <div className="error">{errors.password.message}</div>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Sign In"}
              </Button>
              {errors.root && (
                <div className="error">{errors.root.message}</div>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2"></Link>
                </Grid>
                <Grid item>
                  <Link to="register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
