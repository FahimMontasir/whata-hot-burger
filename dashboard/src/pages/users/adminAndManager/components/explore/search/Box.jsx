import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@mui/lab";
import { Card, Stack, TextField } from "@mui/material";
//api
import { useSearchAMQuery } from "../../../../../../store/redux/api/am";
//config
import { initialSearchValue, SearchSchema } from "./search.config";
//component
import List from "./List";
import { NotFound } from "../../../../../../common/list";

export default function SearchAM() {
  const [valueObj, setValueObj] = useState(skipToken);

  const { isError, error, isFetching, isSuccess, data } =
    useSearchAMQuery(valueObj);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialSearchValue,
    validationSchema: SearchSchema,
    onSubmit: (values, { setSubmitting }) => {
      setValueObj(values);
      setSubmitting(false);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Card sx={{ p: 3, my: 3 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 2 }}
            sx={{ mb: 2 }}
          >
            <TextField
              fullWidth
              label="Phone No."
              {...getFieldProps("contactNo")}
              error={Boolean(touched.contactNo && errors.contactNo)}
              helperText={touched.contactNo && errors.contactNo}
            />
            <TextField
              fullWidth
              label="Name"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              label="Email"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isFetching}
            >
              Search
            </LoadingButton>
          </Stack>

          {isSuccess && !isFetching && (
            <List data={data} isFetching={isFetching} isSuccess={isSuccess} />
          )}
          {isError && (
            <NotFound
              message={
                error.data
                  ? error.data.message
                  : "Check your network connection"
              }
            />
          )}
        </Card>
      </Form>
    </FormikProvider>
  );
}
