import PropTypes from "prop-types";
// material
import { Card, Stack, Typography, Divider } from "@mui/material";
import { fNumber } from "../../../../../utils/formatNumber";
//util

CommentReact.propTypes = {
  profile: PropTypes.object,
};

export default function CommentReact({ profile = {} }) {
  const { follower = 1900, react = 10203 } = profile;

  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(follower)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Comment
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(react)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            React
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
