import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@mui/lab";
import {
  styled,
  Card,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  Box,
  Alert,
} from "@mui/material";
//config
import {
  CATEGORY_OPTION,
  FoodSchema,
  getFoodInitialValues,
} from "./addFood.config";
//hook
import useUploadImage from "../../../../../hooks/useUploadImage";
//components
import UploadSingleFile from "../../../../../common/upload/UploadSingleFile";
import {
  useAddFoodMutation,
  useUpdateFoodMutation,
} from "../../../../../store/redux/api/food";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

AddFood.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function AddFood({ isEdit, currentProduct }) {
  const { uploading, uploadImage } = useUploadImage();

  const [addFood, { isError, error, isSuccess, isLoading }] =
    useAddFoodMutation();

  const [
    updateFood,
    {
      isError: isErrorU,
      error: errorU,
      isSuccess: isSuccessU,
      isLoading: isLoadingU,
    },
  ] = useUpdateFoodMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getFoodInitialValues(currentProduct),
    validationSchema: FoodSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      if (isEdit) {
        updateFood(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("Food updated successfully!");
          })
          .catch((error) => {
            setErrors(error);
            toast.error("Some error occurred!");
          });
      } else {
        addFood(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("Food added successfully!");
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
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
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

                <div>
                  <LabelStyle>Add Images</LabelStyle>
                  {uploading && (
                    <Box sx={{ width: "50%", margin: "auto" }}>
                      <Alert severity="warning">uploading...</Alert>
                    </Box>
                  )}
                  <UploadSingleFile
                    maxSize={3145728}
                    accept={{
                      "image/png": [".png"],
                      "image/jpg": [".jpg"],
                      "image/jpeg": [".jpeg"],
                    }}
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
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    fullWidth
                    label="Number in Stock"
                    {...getFieldProps("numberInStock")}
                    error={Boolean(
                      touched.numberInStock && errors.numberInStock
                    )}
                    helperText={touched.numberInStock && errors.numberInStock}
                  />
                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.category}
                    onChange={(event, newValue) => {
                      setFieldValue("category", newValue);
                    }}
                    options={CATEGORY_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={option}
                          size="small"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        label="Categories"
                        {...params}
                        error={Boolean(touched.category && errors.category)}
                        helperText={touched.category && errors.category}
                      />
                    )}
                  />
                  <TextField
                    fullWidth
                    label="Sizes(small:0, md:2)"
                    {...getFieldProps("size")}
                    error={Boolean(touched.size && errors.size)}
                    helperText={touched.size && errors.size}
                  />
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    fullWidth
                    label="Regular Price"
                    {...getFieldProps("price")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                      type: "number",
                    }}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />

                  <TextField
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    fullWidth
                    label="Discount Rate"
                    {...getFieldProps("discountRate")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                      type: "number",
                    }}
                    error={Boolean(touched.discountRate && errors.discountRate)}
                    helperText={touched.discountRate && errors.discountRate}
                  />
                </Stack>
              </Card>

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                loading={isLoading || isLoadingU}
              >
                {!isEdit ? "Create Product" : "Save Changes"}
              </LoadingButton>

              {isError && (
                <Alert severity="error">
                  An error occurred: {error.data?.message}
                </Alert>
              )}
              {isSuccess && (
                <Alert severity="success">Food added successfully!</Alert>
              )}
              {isErrorU && (
                <Alert severity="error">
                  An error occurred: {errorU.data?.message}
                </Alert>
              )}
              {isSuccessU && (
                <Alert severity="success">Food updated successfully!</Alert>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
