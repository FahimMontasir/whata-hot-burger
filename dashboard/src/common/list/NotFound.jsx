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
        404: Not found
      </Typography>
      <Typography variant="body2" align="center">
        <strong>&quot;{message}&quot;</strong>. Please try again sometimes
        later.
      </Typography>
    </Paper>
  );
}
