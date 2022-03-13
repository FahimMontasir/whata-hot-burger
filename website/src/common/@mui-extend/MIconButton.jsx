import { forwardRef } from "react";
// material
import { IconButton } from "@mui/material";
//
import { ButtonAnimate } from "../animate";

const MIconButton = forwardRef(({ children, ...other }, ref) => (
  <ButtonAnimate>
    <IconButton ref={ref} {...other}>
      {children}
    </IconButton>
  </ButtonAnimate>
));

export default MIconButton;
