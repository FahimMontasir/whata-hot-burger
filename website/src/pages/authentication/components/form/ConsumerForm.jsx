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
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { toast } from "react-toastify";
//config
import { AMSchema, getAMInitialValues } from "./consumerForm.config";
//api
import {
  useConRegisterMutation,
  useUpdateConsumerMutation,
} from "../../../../store/redux/api/consumer";
import { fData } from "../../../../utils/formatNumber";
import UploadAvatar from "../../../../common/UploadAvatar";
import useUploadImage from "../../../../hooks/useUploadImage";
import { PATH_PAGE } from "../../../../routes/paths";

ConsumerForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function ConsumerForm({ isEdit, currentUser }) {
  const { uploading, uploadImage } = useUploadImage();
  const navigate = useNavigate();

  const [register, { isError, error, isSuccess, isLoading }] =
    useConRegisterMutation();

  const [
    updateConsumer,
    {
      isError: isErrorU,
      error: errorU,
      isSuccess: isSuccessU,
      isLoading: isLoadingU,
    },
  ] = useUpdateConsumerMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getAMInitialValues(currentUser),
    validationSchema: AMSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      if (isEdit) {
        updateConsumer(values)
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
            navigate("/login");
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
          <Grid item xs={12} md={5}>
            <Card sx={{ py: 10, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <UploadAvatar
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

          <Grid item xs={12} md={7}>
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

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Gender"
                    {...getFieldProps("gender")}
                    error={Boolean(touched.gender && errors.gender)}
                    helperText={touched.gender && errors.gender}
                  />
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
                        error={Boolean(
                          touched.dateOfBirth && errors.dateOfBirth
                        )}
                        helperText={touched.dateOfBirth && errors.dateOfBirth}
                      />
                    )}
                  />
                </Stack>

                <Box
                  sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isLoading || isLoadingU}
                  >
                    {!isEdit ? "Register" : "Save Changes"}
                  </LoadingButton>
                </Box>
                <Stack sx={{ my: 2 }}>
                  <Link
                    component={RouterLink}
                    variant="subtitle2"
                    to={PATH_PAGE.login}
                  >
                    Do you have an account? click here to Login
                  </Link>
                </Stack>
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
