import { useState } from "react";
//mui
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  useTheme,
} from "@mui/material";

import Scrollbar from "../../../../../common/Scrollbar";
import Label from "../../../../../common/Label";
import SearchNotFound from "../../../../../common/SearchNotFound";

import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../../../../../common/list";

const TABLE_HEAD = [
  { id: "kd" },
  { id: "name", label: "Name", alignRight: false },
  { id: "company", label: "Company", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "isVerified", label: "Verified", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "time", label: "Time", alignRight: false },
];

export default function AMList() {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDeleteUser = () => {};

  const emptyRows = true;

  const isUserNotFound = [].length === 0;
  return (
    <Card>
      <UserListToolbar
        numSelected={[].length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead headLabel={TABLE_HEAD} />
            <TableBody>
              {[{}].map((row) => {
                const {
                  id,
                  name,
                  role,
                  status,
                  company,
                  avatarUrl,
                  isVerified,
                } = row;

                return (
                  <TableRow hover key={id} tabIndex={-1} role="checkbox">
                    <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={name} src={avatarUrl} />
                        <Typography variant="subtitle2" noWrap>
                          {name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">{company}</TableCell>
                    <TableCell align="left">{role}</TableCell>
                    <TableCell align="left">
                      {isVerified ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="left">
                      <Label
                        variant={
                          theme.palette.mode === "light" ? "ghost" : "filled"
                        }
                        color={(status === "banned" && "error") || "success"}
                      >
                        {status}
                      </Label>
                    </TableCell>

                    <TableCell align="right">
                      <UserMoreMenu
                        onDelete={() => handleDeleteUser(id)}
                        userName={name}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
