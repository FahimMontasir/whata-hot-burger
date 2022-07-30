import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import useChangeDialog from "../hooks/useChangeDialogModal";

DialogModal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  update: PropTypes.bool,
  fullScreen: PropTypes.bool,
};

export default function DialogModal({ children, title, update, fullScreen }) {
  const { open, handleClickOpen, handleClose } = useChangeDialog();

  return (
    <>
      <Button
        startIcon={update ? null : <Icon icon={plusFill} />}
        sx={{ ml: 1 }}
        onClick={handleClickOpen()}
        variant="contained"
      >
        {title}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
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
