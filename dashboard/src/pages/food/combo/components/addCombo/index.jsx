import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
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
  InputAdornment,
  Alert,
  Button,
  Box,
  ButtonGroup,
} from "@mui/material";
//config
import {
  CATEGORY_OPTION,
  ComboSchema,
  getFoodInitialValues,
} from "./addCombo.config";
//components
//api
import {
  useAddComboMutation,
  useUpdateComboMutation,
} from "../../../../../store/redux/api/combo";
import UploadMultiFile from "../../../../../common/upload/UploadMultiFile";
import useUploadMultiImages from "../../../../../hooks/useUploadMultipleImages";
import {
  getToComboIds,
  removeAllIdToCombo,
} from "../../../../../store/redux/slices/toComboIds";

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
  const {
    uploading,
    handleDrop,
    urls,
    handleRemove,
    handleRemoveAll,
    loadImage,
  } = useUploadMultiImages();

  const [addCombo, { isError, error, isSuccess, isLoading }] =
    useAddComboMutation();

  const toComboIds = useSelector(getToComboIds);

  const dispatch = useDispatch();

  const [
    updateCombo,
    {
      isError: isErrorU,
      error: errorU,
      isSuccess: isSuccessU,
      isLoading: isLoadingU,
    },
  ] = useUpdateComboMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getFoodInitialValues(currentProduct),
    validationSchema: ComboSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      if (isEdit) {
        updateCombo(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("Food updated successfully!");
            // handleRemoveAll();
            // dispatch(removeAllIdToCombo());
          })
          .catch((error) => {
            setErrors(error);
            toast.error("Some error occurred!");
          });
      } else {
        addCombo(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("Food added successfully!");
            handleRemoveAll();
            dispatch(removeAllIdToCombo());
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
                  multiline
                  rows={4}
                  label="Description"
                  {...getFieldProps("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />

                <div>
                  <LabelStyle>
                    Add Images: {values.photoUrls.length} image added
                  </LabelStyle>
                  {uploading && (
                    <Box sx={{ width: "50%", margin: "auto" }}>
                      <Alert severity="warning">uploading...</Alert>
                    </Box>
                  )}
                  <UploadMultiFile
                    showPreview
                    maxSize={3145728}
                    files={urls}
                    onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
                    onRemove={(file) => handleRemove(file)}
                    onRemoveAll={() => handleRemoveAll()}
                    onConfirm={() => setFieldValue("photoUrls", urls)}
                    onLoadImage={() => loadImage(values.photoUrls)}
                    error={Boolean(touched.photoUrls && errors.photoUrls)}
                  />
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Typography>
                    Food added:{toComboIds.length} Food Confirmed:
                    {values.items.length}
                  </Typography>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    <Button
                      color="info"
                      onClick={() => setFieldValue("items", toComboIds)}
                    >
                      Confirm items
                    </Button>
                    <Button component={RouterLink} to="/food/explore">
                      Add items
                    </Button>
                    <Button
                      color="warning"
                      onClick={() => {
                        dispatch(removeAllIdToCombo());
                        setFieldValue("items", []);
                      }}
                    >
                      delete items
                    </Button>
                  </ButtonGroup>
                  <TextField
                    select
                    fullWidth
                    label="Category"
                    placeholder="Category"
                    {...getFieldProps("category")}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.category && errors.category)}
                    helperText={touched.category && errors.category}
                  >
                    <option value="" />
                    {CATEGORY_OPTION.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <TextField
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  fullWidth
                  label="Upto Discount Rate"
                  {...getFieldProps("uptoDiscountRate")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                    type: "number",
                  }}
                  error={Boolean(
                    touched.uptoDiscountRate && errors.uptoDiscountRate
                  )}
                  helperText={
                    touched.uptoDiscountRate && errors.uptoDiscountRate
                  }
                />
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
