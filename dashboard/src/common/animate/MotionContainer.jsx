import { motion } from "framer-motion";
// material
import { Box } from "@mui/material";
//
import { varWrapEnter } from "./variants";

export default function MotionContainer({ open, children, ...other }) {
  return (
    <Box
      component={motion.div}
      initial={false}
      animate={open ? "animate" : "exit"}
      variants={varWrapEnter}
      {...other}
    >
      {children}
    </Box>
  );
}
