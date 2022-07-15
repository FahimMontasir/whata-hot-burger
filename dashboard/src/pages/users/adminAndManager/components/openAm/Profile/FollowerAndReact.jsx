import PropTypes from "prop-types";
// material
import { Card, Stack, Typography, Divider } from "@mui/material";
//util
import { fNumber } from "../../../../../../utils/formatNumber";

FollowerReact.propTypes = {
  profile: PropTypes.object,
};

export default function FollowerReact({ profile = {} }) {
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
            Follower
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
