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
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

const defaultTheme = createTheme();
const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

function TypographyTheme() {
  return (
    <Div style={{ textAlign: "center", fontWeight: "700" }}>
      {"Edit Contact"}
      <NavLink
        style={{ marginLeft: "10%" }}
        to={{ pathname: "/home/view" }}
        className="back-btn"
      >
        Back to view contact
      </NavLink>
    </Div>
  );
}

export default function AddContact(props) {
  const activeUserId =
    sessionStorage.getItem("activeUserId") !== null
      ? sessionStorage.getItem("activeUserId")
      : null;
  const imageInput = useRef(null);
  const location = useLocation();
  const [image, setImage] = useState("");
  const contactId = location.state ? location.state : null;
  const contacts = JSON.parse(localStorage.getItem([activeUserId])) || [];
  const contactToEdit = contacts.find((obj) => obj.contactId === contactId);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: contactToEdit.name,
      email: contactToEdit.email,
      number: contactToEdit.number,
    },
  });

  function handleImageChange(e) {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  }

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const existingData = Object.keys(contactToEdit)
      .filter((objKey) => objKey !== "contactId")
      .reduce((newObj, key) => {
        newObj[key] = contactToEdit[key];
        return newObj;
      }, {});

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        const imageData = reader.result;
        data.avatar = imageData;
        console.log("existing data", existingData);
        console.log("new data", data);
        if (JSON.stringify(existingData) !== JSON.stringify(data)) {
          existingData.name = data.name;
          existingData.number = data.number;
          existingData.email = data.email;
          existingData.avatar = data.avatar;
          existingData.contactId = contactToEdit.contactId;
          const contacts =
            JSON.parse(localStorage.getItem([activeUserId])) || [];
          console.log(contactToEdit.name);
          const indexToUpdate = contacts.findIndex(
            (obj) => obj.contactId === contactToEdit.contactId
          );
          contacts[indexToUpdate] = existingData;
          localStorage.setItem([activeUserId], JSON.stringify(contacts));
          console.log("existingData", existingData);
          console.log("index", indexToUpdate);
        }
        navigate("/home/view");
      };
      reader.onerror = (error) => {
        console.error("Error converting image to Base64:", error);
      };
    } else {
      if (JSON.stringify(existingData) !== JSON.stringify(data)) {
        existingData.name = data.name;
        existingData.number = data.number;
        existingData.email = data.email;
        existingData.avatar = contactToEdit.avatar;
        existingData.contactId = contactToEdit.contactId;
        const contacts = JSON.parse(localStorage.getItem([activeUserId])) || [];
        console.log(contactToEdit.name);
        const indexToUpdate = contacts.findIndex(
          (obj) => obj.contactId === contactToEdit.contactId
        );
        contacts[indexToUpdate] = existingData;
        localStorage.setItem([activeUserId], JSON.stringify(contacts));
        console.log("existingData", existingData);
        console.log("index", indexToUpdate);
      }
      navigate("/home/view");
    }
  };

  return (
    <>
      <TypographyTheme />
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
              src={image ? URL.createObjectURL(image) : contactToEdit.avatar}
              sx={{ mt: 1, width: 100, height: 100 }}
              onClick={() => {
                imageInput.current.click();
              }}
            />

            <Typography component="h6" variant="h6">
              Update Image
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
                // disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save changes"}
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
                  navigate("/home/view");
                }}
                // disabled={isSubmitting}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
