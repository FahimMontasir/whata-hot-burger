import { motion, AnimatePresence } from "framer-motion";
// material
import { Dialog } from "@mui/material";
//
import { varFadeInUp } from "./variants";

export default function DialogAnimate({
  open = false,
  animate,
  onClose,
  children,
  ...other
}) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={open}
          onClose={onClose}
          PaperComponent={motion.div}
          PaperProps={{
            sx: {
              borderRadius: 2,
              bgcolor: "background.paper",
            },
            ...(animate || varFadeInUp),
          }}
          {...other}
        >
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  );
}
