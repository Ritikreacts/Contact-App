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
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { NavLink, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import {
  getCookie,
  getContactInStorage,
  setContactInStorage,
} from "../Services/storage";

const defaultTheme = createTheme();
const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

function TypographyTheme() {
  return (
    <Div style={{ textAlign: "center", fontWeight: "700" }}>
      {" Edit Contact "}
      <NavLink
        style={{ marginLeft: "10%" }}
        to={{ pathname: "/home/contacts" }}
        className="back-btn"
      >
        Back to contacts
      </NavLink>
    </Div>
  );
}

export default function EditContact() {
  const param = useParams();
  const IdInParam = param.id;
  const contactId = IdInParam;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const activeUserId = getCookie();
  const imageInput = useRef(null);
  const [image, setImage] = useState("");
  const contacts = getContactInStorage([activeUserId]);
  const contactToEdit = contacts.find((obj) => obj.contactId === contactId);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
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
  function handleNavigate() {
    navigate(-1);
  }
  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setOpenSnackbar((prev) => true);
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
        if (JSON.stringify(existingData) !== JSON.stringify(data)) {
          existingData.name = data.name;
          existingData.number = data.number;
          existingData.email = data.email;
          existingData.avatar = data.avatar;
          existingData.contactId = contactToEdit.contactId;
          const contacts = getContactInStorage([activeUserId]);
          const indexToUpdate = contacts.findIndex(
            (obj) => obj.contactId === contactToEdit.contactId
          );
          contacts[indexToUpdate] = existingData;
          setContactInStorage([activeUserId], contacts);
        }
        setTimeout(handleNavigate, 1500);
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
        const contacts = getContactInStorage([activeUserId]);
        const indexToUpdate = contacts.findIndex(
          (obj) => obj.contactId === contactToEdit.contactId
        );
        contacts[indexToUpdate] = existingData;
        setContactInStorage([activeUserId], contacts);
      }
      setTimeout(handleNavigate, 1500);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "click-away") {
      return;
    }
    setOpenSnackbar(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }
  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Changes saved Successfully!
        </Alert>
      </Snackbar>
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
              className="image-input"
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
                label="Email"
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
                label="Number"
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
                  navigate("/home/contacts");
                }}
                disabled={isSubmitting}
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
