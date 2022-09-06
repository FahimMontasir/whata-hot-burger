import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { useState } from "react";
//config
import { CATEGORY_OPTION } from "./foodList.config";
import { useGetFoodByCategoryQuery } from "../../../../store/redux/api/food";
import ListSkeleton from "./ListSkeleton";
import Scrollbar from "../../../../common/Scrollbar";
import NotFound from "../../../../common/NotFound";
import { useSelector } from "react-redux";
import { getUser } from "../../../../store/redux/slices/localStorageAuth";
import FoodCard from "./FoodCard";

const FoodList = () => {
  const { _id: userId } = useSelector(getUser);
  const [category, setCategory] = useState("burgers");

  const { isSuccess, isFetching, data, isError, error } =
    useGetFoodByCategoryQuery(category);

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" align="center">
        All Foods by Category
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
      <Scrollbar>
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            {isSuccess && !isFetching && (
              <TableBody>
                {data.array.map((row) => {
                  return <FoodCard food={row} key={row._id} userId={userId} />;
                })}
              </TableBody>
            )}
          </Table>
          {isError && (
            <NotFound
              message={
                error.data
                  ? error.data.message
                  : "Check your network connection"
              }
            />
          )}
        </TableContainer>
      </Scrollbar>
    </Card>
  );
};
export default FoodList;
