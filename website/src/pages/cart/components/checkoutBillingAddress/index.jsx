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
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
  });

  const formik = useFormik({
    initialValues: {
      city: address.city || "",
      state: address.state || "",
      zipcode: address.zipcode || "",
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
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Town / City"
                {...getFieldProps("city")}
                error={Boolean(touched.city && errors.city)}
                helperText={touched.city && errors.city}
              />

              <TextField
                fullWidth
                label="State"
                {...getFieldProps("state")}
                error={Boolean(touched.state && errors.state)}
                helperText={touched.state && errors.state}
              />

              <TextField
                fullWidth
                label="Zip / Postal Code"
                {...getFieldProps("zipcode")}
                error={Boolean(touched.zipcode && errors.zipcode)}
                helperText={touched.zipcode && errors.zipcode}
              />
            </Stack>
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
