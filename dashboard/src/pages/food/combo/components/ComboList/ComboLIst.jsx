import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";

import ListSkeleton from "../../../../../common/skeleton/List";
//config
import { CATEGORY_OPTION } from "../addCombo/addCombo.config";
//api
import {
  useDeleteComboMutation,
  useGetComboByCategoryQuery,
} from "../../../../../store/redux/api/combo";
import ComboCard from "./ComboCard";
import { NotFound } from "../../../../../common/list";

const ComboList = () => {
  const [category, setCategory] = useState("Hot");

  const { isSuccess, isFetching, data, isError, error } =
    useGetComboByCategoryQuery(category);
  const [deleteCombo] = useDeleteComboMutation();

  const handleDeleteCombo = (_id) => {
    deleteCombo({ _id: _id })
      .unwrap()
      .then((data) => toast.success(data.text))
      .catch(() => toast.error("Delete failed"));
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" align="center">
        Combo List
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
      {isFetching && (
        <Stack alignItems="center">
          <ListSkeleton size={{ sm: 310, md: 950, arr: 5, skh: 55 }} />
        </Stack>
      )}
      {isSuccess && (
        <Grid container spacing={3}>
          {data.array.map((combo) => (
            <Grid key={combo._id} item xs={12} sm={6} md={3}>
              <ComboCard combo={combo} handleDeleteCombo={handleDeleteCombo} />
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
