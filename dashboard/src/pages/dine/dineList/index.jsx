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
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { NotFound } from "../../../common/list";
// components
import ListSkeleton from "../../../common/skeleton/List";
import {
  useDeleteDineMutation,
  useGetAllDinesQuery,
} from "../../../store/redux/api/dine";
import DineCard from "./Card";
// hook
import useChangeList from "../../../hooks/useChangeList";

const DineList = () => {
  const { size, page, handleNext, handlePrevious, handleSize } =
    useChangeList();

  const { isSuccess, isFetching, data, isError, error } = useGetAllDinesQuery({
    pageNumber: page,
    pageSize: size,
  });

  const [deleteDine] = useDeleteDineMutation();

  const handleDeleteDine = (_id) => {
    deleteDine({ _id: _id })
      .unwrap()
      .then((data) => toast.success(data.text))
      .catch(() => toast.error("Delete failed"));
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" align="center">
        Dine List
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <LoadingButton onClick={handlePrevious} loading={isFetching}>
            Previous
          </LoadingButton>
          {isError ? (
            <LoadingButton disabled onClick={handleNext}>
              Next
            </LoadingButton>
          ) : (
            <LoadingButton onClick={handleNext} loading={isFetching}>
              Next
            </LoadingButton>
          )}

          <Typography variant="caption" sx={{ px: 1, color: "GrayText" }}>
            Page No. {page}
          </Typography>
        </Stack>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="size-select">Number of List</InputLabel>
          <Select
            labelId="size-select"
            id="size-select"
            value={size}
            label="Number of List"
            onChange={handleSize}
          >
            <MenuItem value={5}>05</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
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
          {data.array.map((dine) => (
            <Grid key={dine._id} item xs={12} sm={6} md={3}>
              <DineCard dine={dine} handleDeleteDine={handleDeleteDine} />
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
export default DineList;
