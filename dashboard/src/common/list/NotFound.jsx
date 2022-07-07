import PropTypes from "prop-types";
// material
import { Paper, Typography } from "@mui/material";

NotFound.propTypes = {
  message: PropTypes.string,
};

export default function NotFound({ message = "", ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        <strong>&quot;{message}&quot;</strong>. Try checking to go previous
        page.
      </Typography>
    </Paper>
  );
}
