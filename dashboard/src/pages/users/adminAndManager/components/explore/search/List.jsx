import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
//api
import { useDeleteAMMutation } from "../../../../../../store/redux/api/am";
//component
import ListSkeleton from "../../../../../../common/skeleton/List";
import Scrollbar from "../../../../../../common/Scrollbar";
import { UserListHead, UserMoreMenu } from "../../../../../../common/list";
//config
import { AM_TABLE_HEAD } from "../amList.config";
import { PATH_DASHBOARD } from "../../../../../../routes/paths";
//utils
import { fDate, fDateTimeSuffix } from "../../../../../../utils/formatTime";

const List = ({ data, isFetching, isSuccess }) => {
  const [deleteAm] = useDeleteAMMutation();

  const navigate = useNavigate();

  const handleAmDelete = (_id) => {
    deleteAm({ _id: _id })
      .unwrap()
      .then((e) => toast.success(e.text))
      .catch(() => toast.error("Delete failed"));
  };

  return (
    <>
      {isFetching && (
        <Stack alignItems="center">
          <ListSkeleton size={{ sm: 310, md: 950, arr: 2, skh: 55 }} />
        </Stack>
      )}
      <Scrollbar>
        <TableContainer>
          <Table>
            {isSuccess && !isFetching && (
              <>
                <UserListHead headLabel={AM_TABLE_HEAD} />

                <TableBody>
                  {data.array.map((row) => {
                    const {
                      _id,
                      name,
                      photoUrl,
                      email,
                      contactNo,
                      type,
                      managerialPosition,
                      dateOfBirth,
                      createdAt,
                      updatedAt,
                    } = row;

                    return (
                      <TableRow hover key={_id}>
                        <TableCell align="center">
                          <UserMoreMenu
                            onDelete={() => handleAmDelete(_id)}
                            navigateWithData={() =>
                              navigate(PATH_DASHBOARD.am.register, {
                                state: row,
                              })
                            }
                            navigateOpen={() =>
                              navigate(PATH_DASHBOARD.am.open, {
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
                            navigate(PATH_DASHBOARD.am.open, {
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
                        <TableCell align="left">{contactNo}</TableCell>
                        <TableCell align="left">{type}</TableCell>
                        <TableCell align="left">{managerialPosition}</TableCell>
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
        </TableContainer>
      </Scrollbar>
    </>
  );
};
export default List;

List.propTypes = {
  data: PropTypes.object,
  isFetching: PropTypes.bool,
  isSuccess: PropTypes.bool,
};
