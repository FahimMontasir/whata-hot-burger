import {
  Button,
  ButtonGroup,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

import ListSkeleton from "../../../../../common/skeleton/List";
import Scrollbar from "../../../../../common/Scrollbar";
import { NotFound, UserListHead } from "../../../../../common/list";
import { FAQ_TABLE_HEAD } from "./list.config";
import DialogModal from "../../../../../common/DialogModal";

import { fDateTimeSuffix } from "../../../../../utils/formatTime";
import {
  useGetAllFaqQuery,
  useDeleteFaqMutation,
} from "../../../../../store/redux/api/faq";
import AddFAQ from "../add";

const FAQList = () => {
  const { isSuccess, isFetching, data, isError, error } = useGetAllFaqQuery();
  const [deleteFAQ] = useDeleteFaqMutation();

  const handleDeleteFAQ = (_id) => {
    deleteFAQ({ _id: _id })
      .unwrap()
      .then((data) => toast.success(data.text))
      .catch(() => toast.error("Delete failed"));
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" align="center">
        FAQ List
      </Typography>
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
                <UserListHead headLabel={FAQ_TABLE_HEAD} />

                <TableBody>
                  {data.array.map((row) => {
                    const {
                      _id,
                      name,
                      email,
                      question,
                      answer,
                      isAdded,
                      updatedAt,
                    } = row;

                    return (
                      <TableRow hover key={_id}>
                        <TableCell align="center">
                          <ButtonGroup
                            variant="outlined"
                            aria-label="outlined button group"
                          >
                            <Button onClick={() => handleDeleteFAQ(_id)}>
                              Delete
                            </Button>
                            <DialogModal title="Update" update>
                              <AddFAQ isEdit currentData={row} />
                            </DialogModal>
                          </ButtonGroup>
                        </TableCell>

                        <TableCell align="left">{question}</TableCell>
                        <TableCell align="left">{answer}</TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">
                          {isAdded ? "published" : "not published"}
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
export default FAQList;
