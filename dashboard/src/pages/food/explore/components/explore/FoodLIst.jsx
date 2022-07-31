import {
  Button,
  ButtonGroup,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
//utils
import { fDateTimeSuffix } from "../../../../../utils/formatTime";
//component
import Scrollbar from "../../../../../common/Scrollbar";
import { NotFound, UserListHead } from "../../../../../common/list";
import Label from "../../../../../common/Label";
import ListSkeleton from "../../../../../common/skeleton/List";
import DialogModal from "../../../../../common/DialogModal";
import AddFood from "../addFood";
//config
import { CATEGORY_OPTION } from "../addFood/addFood.config";
import { FOOD_TABLE_HEAD } from "./foodList.config";
//api
import {
  useDeleteFoodMutation,
  useGetFoodByCategoryQuery,
} from "../../../../../store/redux/api/food";

//styled component
const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: "cover",
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm,
}));

const FoodList = () => {
  const [category, setCategory] = useState("burgers");

  const { isSuccess, isFetching, data, isError, error } =
    useGetFoodByCategoryQuery(category);
  const [deleteFood] = useDeleteFoodMutation();

  const handleDeleteFood = (_id) => {
    deleteFood({ _id: _id })
      .unwrap()
      .then((data) => toast.success(data.text))
      .catch(() => toast.error("Delete failed"));
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" align="center">
        Food List
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
          <ListSkeleton size={{ sm: 310, md: 950, arr: 10, skh: 55 }} />
        </Stack>
      )}
      <Scrollbar>
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            {isSuccess && !isFetching && (
              <>
                <UserListHead headLabel={FOOD_TABLE_HEAD} />

                <TableBody>
                  {data.array.map((row) => {
                    const {
                      _id,
                      name,
                      photoUrl,
                      category,
                      price,
                      discountRate,
                      size,
                      numberInStock,
                      updatedAt,
                    } = row;

                    return (
                      <TableRow hover key={_id}>
                        <TableCell align="center">
                          <ButtonGroup
                            variant="outlined"
                            aria-label="outlined button group"
                          >
                            <Button onClick={() => handleDeleteFood(_id)}>
                              Delete
                            </Button>
                            <DialogModal title="Update" update fullScreen>
                              <AddFood isEdit currentProduct={row} />
                            </DialogModal>
                          </ButtonGroup>
                        </TableCell>
                        <TableCell
                          style={{ minWidth: 150 }}
                          component="th"
                          scope="row"
                          padding="none"
                        >
                          <ThumbImgStyle alt={name} src={photoUrl} />
                        </TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">
                          {category.map((v, i) => (
                            <Label key={i}>{v}</Label>
                          ))}
                        </TableCell>
                        <TableCell align="right">${price}</TableCell>
                        <TableCell align="right">{discountRate}%</TableCell>
                        <TableCell align="left">{size}</TableCell>
                        <TableCell align="right">{numberInStock}</TableCell>
                        <TableCell align="left">
                          {fDateTimeSuffix(updatedAt)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </>
            )}
          </Table>
          {isError && <NotFound message={error.data.message} />}
        </TableContainer>
      </Scrollbar>
    </Card>
  );
};
export default FoodList;
