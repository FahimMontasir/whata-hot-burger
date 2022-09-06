import PropsTypes from "prop-types";
import { Box, Skeleton } from "@mui/material";

const ListSkeleton = ({ size }) => (
  <Box sx={{ width: [size.sm, size.md] }}>
    {Array(size.arr)
      .fill(0)
      .map((_, index) => (
        <Skeleton height={size.skh} key={index} />
      ))}
  </Box>
);
export default ListSkeleton;

ListSkeleton.propTypes = {
  size: PropsTypes.object.isRequired,
};
