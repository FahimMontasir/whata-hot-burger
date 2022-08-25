import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@mui/lab";
import {
  styled,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Box,
  Alert,
} from "@mui/material";
// config
import { DineSchema, getDineInitialValues } from "./addDine.config";
// hook
import useUploadImage from "../../../hooks/useUploadImage";
import {
  useAddDineMutation,
  useUpdateDineMutation,
} from "../../../store/redux/api/dine";
import UploadSingleFile from "../../../common/upload/UploadSingleFile";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

AddDine.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function AddDine({ isEdit, currentProduct }) {
  const { uploading, uploadImage } = useUploadImage();

  const [addDine, { isError, error, isSuccess, isLoading }] =
    useAddDineMutation();

  const [
    updateDine,
    {
      isError: isErrorU,
      error: errorU,
      isSuccess: isSuccessU,
      isLoading: isLoadingU,
    },
  ] = useUpdateDineMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getDineInitialValues(currentProduct),
    validationSchema: DineSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      if (isEdit) {
        updateDine(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("Dine updated successfully!");
          })
          .catch((error) => {
            setErrors(error);
            toast.error("Some error occurred!");
          });
      } else {
        addDine(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("Dine added successfully!");
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
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <div>
                  <LabelStyle>Add Images</LabelStyle>
                  {uploading && (
                    <Box sx={{ width: "50%", margin: "auto" }}>
                      <Alert severity="warning">uploading...</Alert>
                    </Box>
                  )}
                  <UploadSingleFile
                    maxSize={3145728}
                    file={values.photoUrl}
                    onDrop={(acceptedFiles) =>
                      uploadImage(acceptedFiles, setFieldValue)
                    }
                    error={Boolean(touched.photoUrl && errors.photoUrl)}
                  />
                  {touched.photoUrl && errors.photoUrl && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.photoUrl && errors.photoUrl}
                    </FormHelperText>
                  )}
                </div>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={4}>
                <TextField
                  fullWidth
                  label="Title"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  {...getFieldProps("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Stack>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                loading={isLoading || isLoadingU}
              >
                {!isEdit ? "Create Dine" : "Save Changes"}
              </LoadingButton>

              {isError && (
                <Alert severity="error">
                  An error occurred: {error.data?.message}
                </Alert>
              )}
              {isSuccess && (
                <Alert severity="success">Dine added successfully!</Alert>
              )}
              {isErrorU && (
                <Alert severity="error">
                  An error occurred: {errorU.data?.message}
                </Alert>
              )}
              {isSuccessU && (
                <Alert severity="success">Dine updated successfully!</Alert>
              )}
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
