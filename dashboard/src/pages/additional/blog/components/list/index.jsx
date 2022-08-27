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
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "../../../../../store/redux/api/blog";
import ListSkeleton from "../../../../../common/skeleton/List";
import Scrollbar from "../../../../../common/Scrollbar";
import { NotFound, UserListHead } from "../../../../../common/list";
import { BLOG_TABLE_HEAD } from "./list.config";
import DialogModal from "../../../../../common/DialogModal";
import BlogNewPostForm from "../form";
import Label from "../../../../../common/Label";
import { fDateTimeSuffix } from "../../../../../utils/formatTime";
import useChangeList from "../../../../../hooks/useChangeList";
import { LoadingButton } from "@mui/lab";

//styled component
const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: "cover",
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm,
}));

const BlogList = () => {
  const { size, page, handleNext, handlePrevious, handleSize } =
    useChangeList();

  const { isSuccess, isFetching, data, isError, error } = useGetAllBlogsQuery({
    pageNumber: page,
    pageSize: size,
  });
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDeleteBlog = (_id) => {
    deleteBlog({ _id: _id })
      .unwrap()
      .then((data) => toast.success(data.text))
      .catch(() => toast.error("Delete failed"));
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" align="center">
        Blog List
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
          <ListSkeleton size={{ sm: 310, md: 950, arr: 10, skh: 55 }} />
        </Stack>
      )}
      <Scrollbar>
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            {isSuccess && !isFetching && (
              <>
                <UserListHead headLabel={BLOG_TABLE_HEAD} />

                <TableBody>
                  {data.array.map((row) => {
                    const { _id, title, tags, reactLength, cover, updatedAt } =
                      row;

                    return (
                      <TableRow hover key={_id}>
                        <TableCell align="center">
                          <ButtonGroup
                            variant="outlined"
                            aria-label="outlined button group"
                          >
                            <Button onClick={() => handleDeleteBlog(_id)}>
                              Delete
                            </Button>
                            <DialogModal title="Update" update fullScreen>
                              <BlogNewPostForm isEdit currentValue={row} />
                            </DialogModal>
                          </ButtonGroup>
                        </TableCell>
                        <TableCell
                          style={{ minWidth: 150 }}
                          component="th"
                          scope="row"
                          padding="none"
                        >
                          <ThumbImgStyle alt={title} src={cover} />
                        </TableCell>
                        <TableCell align="left">{title}</TableCell>
                        <TableCell align="left">
                          {tags.map((v, i) => (
                            <Label key={i}>{v}</Label>
                          ))}
                        </TableCell>
                        <TableCell align="left">{reactLength}</TableCell>
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
export default BlogList;
