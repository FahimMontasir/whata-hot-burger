import PropTypes from "prop-types";
// material
import { Card, Stack, Typography, Divider } from "@mui/material";
//util
import { fNumber } from "../../../../../../utils/formatNumber";
import { useGetCartQuery } from "../../../../../../store/redux/api/cart";

Cart.propTypes = {
  id: PropTypes.string,
};

export default function Cart({ id }) {
  const { follower = 1900, react = 10203 } = {};

  const { data } = useGetCartQuery(id);
  console.log(data);
  console.log(id);
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
