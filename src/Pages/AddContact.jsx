import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import {
  getSession,
  getContactInStorage,
  setContactInStorage,
} from "../Services/storage";

const defaultTheme = createTheme();

export default function AddContact() {
  const [openSnackBar, setSnackBarOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const imageInput = useRef(null);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  function handleImageChange(e) {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  }
  function handleNavigate() {
    navigate("/home/view");
  }
  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const activeUserId = getSession();

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        const imageData = reader.result;
        data.avatar = imageData;
        data.contactId = uuidv4();
        const contacts = getContactInStorage([activeUserId]) || [];
        contacts.push(data);
        setContactInStorage([activeUserId], contacts);
        // navigate("/home/view");
        setTimeout(handleNavigate, 1500);
        setSnackBarOpen(true);
      };
      reader.onerror = (error) => {
        console.error("Error converting image to Base64:", error);
      };
    } else {
      setSnackBarOpen(true);
      data.avatar = "";
      data.contactId = uuidv4();
      const contacts = getContactInStorage([activeUserId]) || [];
      contacts.push(data);
      setContactInStorage([activeUserId], contacts);
      setTimeout(handleNavigate, 1500);
      // navigate("/home/view");
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }
  return (
    <>
      <Snackbar
        openSnackBar={openSnackBar}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Contact added Successfully!
        </Alert>
      </Snackbar>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" className="full-box">
          <CssBaseline />
          <Box
            className="contact-form"
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{ mixBlendMode: "multiply" }}
              alt="R"
              src={
                image
                  ? URL.createObjectURL(image)
                  : require("../Assets/836.jpg")
              }
              sx={{ mt: 1, width: 100, height: 100 }}
              onClick={() => {
                imageInput.current.click();
              }}
            />

            <Typography component="h6" variant="h6">
              Upload Image
            </Typography>
            <input
              ref={imageInput}
              style={{ display: "none" }}
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => handleImageChange(e)}
            ></input>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                {...register("name", {
                  required: "Name is required",
                })}
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
                autoComplete="name"
              />
              {errors.name && (
                <div className="error">{errors.name.message}</div>
              )}
              <TextField
                {...register("email", {
                  required: "email is required",
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
                required
                id="email"
                label="Email  "
                name="email"
              />
              {errors.email && (
                <div className="error">{errors.email.message}</div>
              )}
              <TextField
                {...register("number", {
                  required: "Number is required",
                  validate: (value) => {
                    if (
                      !value.match(
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
                      )
                    ) {
                      return "Number is invalid";
                    } else if (value.length > 10) {
                      return "Number should not be more than 10 digits";
                    } else {
                      return true;
                    }
                  },
                })}
                margin="normal"
                fullWidth
                required
                id="number"
                label="Number  "
                name="number"
              />
              {errors.number && (
                <div className="error">{errors.number.message}</div>
              )}
              <Button
                className="add-contact"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Contact"}
              </Button>
              {errors.root && (
                <div className="error">{errors.root.message}</div>
              )}
              <Button
                className="add-contact-cancel"
                type="reset"
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => {
                  navigate("/home");
                }}
                disabled={isSubmitting}
              >
                Back
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
