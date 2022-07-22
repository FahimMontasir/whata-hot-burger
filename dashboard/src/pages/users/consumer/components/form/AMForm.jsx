import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Alert,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { toast } from "react-toastify";
// utils
import { fData } from "../../../../../utils/formatNumber";
//components
import UploadAvatar from "../../../../../common/UploadAvatar";
//hooks
import useUploadImage from "../../../../../hooks/useUploadImage";
//config
import { AMSchema, getAMInitialValues } from "./consumerForm.config";
//api
import {
  useRegisterMutation,
  useUpdateAMMutation,
} from "../../../../../store/redux/api/am";

ConsumerForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function ConsumerForm({ isEdit, currentUser }) {
  const { uploading, uploadImage } = useUploadImage();

  const [register, { isError, error, isSuccess, isLoading }] =
    useRegisterMutation();

  const [
    updateAM,
    {
      isError: isErrorU,
      error: errorU,
      isSuccess: isSuccessU,
      isLoading: isLoadingU,
    },
  ] = useUpdateAMMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getAMInitialValues(currentUser),
    validationSchema: AMSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      if (isEdit) {
        updateAM(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("User updated successfully!");
          })
          .catch((error) => {
            setErrors(error);
            toast.error("Some error occurred!");
          });
      } else {
        register(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("User registered successfully!");
          })
          .catch((error) => {
            setErrors(error);
            toast.error("Some error occurred!");
          });
      }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept={{
                    "image/png": [".png"],
                    "image/jpg": [".jpg"],
                    "image/jpeg": [".jpeg"],
                  }}
                  file={values.photoUrl}
                  maxSize={31457280}
                  onDrop={(acceptedFiles) =>
                    uploadImage(acceptedFiles, setFieldValue)
                  }
                  error={Boolean(touched.photoUrl && errors.photoUrl)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color: "text.secondary",
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png
                      <br /> max size of {fData(31457280)}
                      {uploading && (
                        <Box sx={{ width: "50%", margin: "auto" }}>
                          <Alert severity="warning">uploading...</Alert>
                        </Box>
                      )}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                  {touched.photoUrl && errors.photoUrl}
                </FormHelperText>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Full Name"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                {!isEdit && (
                  <TextField
                    fullWidth
                    label="Password"
                    {...getFieldProps("password")}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                )}

                <TextField
                  fullWidth
                  label="Contact Number"
                  {...getFieldProps("contactNo")}
                  error={Boolean(touched.contactNo && errors.contactNo)}
                  helperText={touched.contactNo && errors.contactNo}
                />

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Type"
                    {...getFieldProps("type")}
                    error={Boolean(touched.type && errors.type)}
                    helperText={touched.type && errors.type}
                  />

                  <TextField
                    fullWidth
                    label="Managerial Position"
                    {...getFieldProps("managerialPosition")}
                    error={Boolean(
                      touched.managerialPosition && errors.managerialPosition
                    )}
                    helperText={
                      touched.managerialPosition && errors.managerialPosition
                    }
                  />
                </Stack>

                <DesktopDatePicker
                  label="Date of Birth"
                  inputFormat="dd/MM/yyyy"
                  value={values.dateOfBirth}
                  onChange={(newValue) =>
                    setFieldValue("dateOfBirth", newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                      helperText={touched.dateOfBirth && errors.dateOfBirth}
                    />
                  )}
                />

                <Box
                  sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isLoading || isLoadingU}
                  >
                    {!isEdit ? "Register Admin or Manager" : "Save Changes"}
                  </LoadingButton>
                </Box>

                {isError && (
                  <Alert severity="error">
                    An error occurred: {error.data?.message}
                  </Alert>
                )}
                {isSuccess && (
                  <Alert severity="success">User created successfully!</Alert>
                )}
                {isErrorU && (
                  <Alert severity="error">
                    An error occurred: {errorU.data?.message}
                  </Alert>
                )}
                {isSuccessU && (
                  <Alert severity="success">User updated successfully!</Alert>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
