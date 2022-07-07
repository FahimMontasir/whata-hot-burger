import PropsTypes from 'prop-types';
import { Box, Skeleton } from '@mui/material';

const MatrixSkeleton = ({ size }) => (
  <Box sx={{ width: [size.sm, size.md] }}>
    <Skeleton sx={{ borderRadius: 3 }} height={size.skh} variant="rectangular" />
  </Box>
);
export default MatrixSkeleton;

MatrixSkeleton.propTypes = {
  size: PropsTypes.object.isRequired
};
