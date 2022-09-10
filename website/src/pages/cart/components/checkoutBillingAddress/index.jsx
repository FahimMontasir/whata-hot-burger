import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import arrowIosBackFill from "@iconify/icons-eva/arrow-ios-back-fill";
// material
import { Box, Grid, Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function CheckoutBillingAddress({
  handleBackStep,
  handleMoveNextStep,
  handleSetAddr,
  address,
}) {
  const NewAddressSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    address: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: address.name || "",
      email: address.email || "",
      address: address.address || "",
    },
    validationSchema: NewAddressSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      handleSetAddr(values);
      handleMoveNextStep();
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
              <TextField
                fullWidth
                label="Full Name"
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
            </Stack>
            <TextField
              rows={4}
              multiline
              fullWidth
              label="Address"
              {...getFieldProps("address")}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                size="small"
                color="inherit"
                onClick={handleBackStep}
                startIcon={<Icon icon={arrowIosBackFill} />}
              >
                Back
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Deliver to this Address
              </LoadingButton>
            </Box>
          </Form>
        </FormikProvider>
      </Grid>
    </Grid>
  );
}
