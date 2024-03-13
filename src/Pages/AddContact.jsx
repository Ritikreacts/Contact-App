import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useState, useRef, useId } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Snackbar from "../Components/Snackbar";

const defaultTheme = createTheme();

export default function AddContact(props) {
  const idGenerated = useId();
  const imageInput = useRef(null);
  const location = useLocation();
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  function handleImageChange(e) {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  }

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        const imageData = reader.result;
        data.avatar = imageData;
        data.contactId = idGenerated;
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.push(data);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        navigate('/home');
      };
      reader.onerror = (error) => {
        console.error("Error converting image to Base64:", error);
      };
    } else {
      data.avatar = "";
      data.contactId = idGenerated;
      const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
      contacts.push(data);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      navigate('/home');
    }
  };
  

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
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
                  navigate(-1);
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
