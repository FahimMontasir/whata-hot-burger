import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useChangeList from "../../../../hooks/useChangeList";
import { useGetUserHasCartQuery } from "../../../../store/redux/api/cart";
import ListSkeleton from "../../../../common/skeleton/List";
import Scrollbar from "../../../../common/Scrollbar";
import { NotFound, UserListHead, UserMoreMenu } from "../../../../common/list";
import { CONSUMER_TABLE_HEAD } from "../../../users/consumer/components/explore/consumerList.config";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import { fDate, fDateTimeSuffix } from "../../../../utils/formatTime";

const UserCats = () => {
  const { size, page, handleNext, handlePrevious, handleSize } =
    useChangeList();

  const { isSuccess, isFetching, data, isError, error } =
    useGetUserHasCartQuery({
      pageNumber: page,
      pageSize: size,
    });

  const navigate = useNavigate();

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" align="center">
        Consumer List
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
          <InputLabel id="size-select-am">Number of List</InputLabel>
          <Select
            labelId="size-select-am"
            id="size-select-am"
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
          <ListSkeleton size={{ sm: 310, md: 950, arr: size, skh: 55 }} />
        </Stack>
      )}
      <Scrollbar>
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            {isSuccess && !isFetching && (
              <>
                <UserListHead headLabel={CONSUMER_TABLE_HEAD} />

                <TableBody>
                  {data.array.map((row) => {
                    const {
                      _id,
                      name,
                      photoUrl,
                      email,
                      type,
                      gender,
                      dateOfBirth,
                      createdAt,
                      updatedAt,
                    } = row;

                    return (
                      <TableRow hover key={_id}>
                        <TableCell align="center">
                          <UserMoreMenu
                            navigateWithData={() =>
                              navigate(PATH_DASHBOARD.consumer.register, {
                                state: row,
                              })
                            }
                            navigateOpen={() =>
                              navigate(PATH_DASHBOARD.consumer.open, {
                                state: row,
                              })
                            }
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(PATH_DASHBOARD.consumer.open, {
                              state: row,
                            })
                          }
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar alt={name} src={photoUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{type}</TableCell>
                        <TableCell align="left">{gender}</TableCell>
                        <TableCell align="left">{fDate(dateOfBirth)}</TableCell>
                        <TableCell align="left">
                          {fDateTimeSuffix(createdAt)}
                        </TableCell>
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
export default UserCats;
