import {
  Button,
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
import { useState } from "react";
//config
import { CATEGORY_OPTION } from "./foodList.config";
import { useGetFoodByCategoryQuery } from "../../../../store/redux/api/food";
import ListSkeleton from "./ListSkeleton";
import Scrollbar from "../../../../common/Scrollbar";
import Label from "../../../../common/Label";
import NotFound from "../../../../common/NotFound";

//styled component
const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: "cover",
  margin: theme.spacing(0, 4),
  borderRadius: theme.shape.borderRadiusSm,
}));

const FoodList = () => {
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
              <>
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
                    } = row;

                    return (
                      <TableRow hover key={_id}>
                        <TableCell
                          style={{ maxWidth: 100 }}
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
                        <TableCell align="right">
                          <Button variant="contained">add to cart</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </>
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
