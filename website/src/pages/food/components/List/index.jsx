import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MotionInView, varFadeInUp } from "../../../../common/animate";
import NotFound from "../../../../common/NotFound";
import { useGetComboByCategoryQuery } from "../../../../store/redux/api/combo";
import ComboCard from "../ComboCard";
import { CATEGORY_OPTION } from "./list.config";

export const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={300}
        sx={{ borderRadius: 3 }}
      />
    </Grid>
    <Grid item xs={12} md={4}>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={300}
        sx={{ borderRadius: 3 }}
      />
    </Grid>
    <Grid item xs={12} md={4}>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={300}
        sx={{ borderRadius: 3 }}
      />
    </Grid>
  </Grid>
);

const ComboList = () => {
  const [category, setCategory] = useState("Hot");

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const { isSuccess, isFetching, data, isError, error } =
    useGetComboByCategoryQuery(category);

  return (
    <Card sx={{ p: 2, my: 5 }}>
      <Typography variant="h6" textAlign="center">
        All Combos by Category
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <FormControl sx={{ m: 1, mb: 4, minWidth: 120 }} size="small">
          <InputLabel id="size-select-am">Category</InputLabel>
          <Select
            labelId="size-select-am"
            id="size-select-am"
            value={category}
            label="Number of List"
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORY_OPTION.map((c) => (
              <MenuItem value={c} key={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {isFetching && SkeletonLoad}
      {isSuccess && (
        <Grid container spacing={isDesktop ? 10 : 5}>
          {data.array.map((combo) => (
            <Grid key={combo._id} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <ComboCard
                  combo={combo}
                  onClick={() => navigate(`/food/${combo._id}`)}
                />
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      )}
      {isError && (
        <NotFound
          message={
            error.data ? error.data.message : "Check your network connection"
          }
        />
      )}
    </Card>
  );
};
export default ComboList;
