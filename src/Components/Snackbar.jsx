const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }
  setOpen(false);
};

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
<Snackbar
  open={open}
  autoHideDuration={3000}
  onClose={handleClose}
  TransitionComponent={TransitionLeft}
  anchorOrigin={{ vertical, horizontal }}
></Snackbar>;
