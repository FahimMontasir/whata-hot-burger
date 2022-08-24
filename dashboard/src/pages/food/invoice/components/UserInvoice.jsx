import {
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
import { useGetAllInvoicesQuery } from "../../../../store/redux/api/invoice";
import ListSkeleton from "../../../../common/skeleton/List";
import Scrollbar from "../../../../common/Scrollbar";
import { NotFound, UserListHead } from "../../../../common/list";
import { fDateTimeSuffix } from "../../../../utils/formatTime";
import { USER_INVOICE_TABLE_HEAD } from "./invoice.config";
import InvoiceToolbar from "./pdf/InvoiceToolbar.jsx";

const UserInvoice = () => {
  const { size, page, handleNext, handlePrevious, handleSize } =
    useChangeList();

  const { isSuccess, isFetching, data, isError, error } =
    useGetAllInvoicesQuery({
      pageNumber: page,
      pageSize: size,
    });

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" align="center">
        Invoice List
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
                <UserListHead headLabel={USER_INVOICE_TABLE_HEAD} />
                <TableBody>
                  {data.array.map((row) => {
                    const {
                      _id,
                      name,
                      email,
                      paidAmount,
                      paymentStatus,
                      createdAt,
                    } = row;

                    return (
                      <TableRow hover key={_id}>
                        <TableCell align="left">
                          <InvoiceToolbar invoice={row} />
                        </TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">${paidAmount}</TableCell>
                        <TableCell align="left">
                          {paymentStatus.Method}
                        </TableCell>
                        <TableCell align="left">
                          {fDateTimeSuffix(createdAt)}
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
export default UserInvoice;
