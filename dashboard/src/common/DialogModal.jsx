import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import useChangeDialog from "../hooks/useChangeDialogModal";

DialogModal.propTypes = {
  children: PropTypes.node,
};

export default function DialogModal({ children }) {
  const { open, handleClickOpen, handleClose } = useChangeDialog();

  return (
    <>
      <Button sx={{ ml: 1 }} onClick={handleClickOpen()} variant="contained">
        U
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullScreen
      >
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            X
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
