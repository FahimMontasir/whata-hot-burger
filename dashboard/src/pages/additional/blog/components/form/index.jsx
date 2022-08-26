import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@mui/lab";
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
  styled,
  Box,
  Alert,
} from "@mui/material";
//
import QuillEditor from "../../../../../common/quillEditor";
import UploadSingleFile from "../../../../../common/upload/UploadSingleFile";
//
import BlogNewPostPreview from "../preview";
import { getBlogInitialValue, BlogSchema, TAGS_OPTION } from "./form.config";
import useUploadImage from "../../../../../hooks/useUploadImage";
import {
  useAddBlogMutation,
  useUpdateBlogMutation,
} from "../../../../../store/redux/api/blog";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

BlogPostForm.propTypes = {
  currentValue: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default function BlogPostForm({ currentValue, isEdit }) {
  const { uploading, uploadImage } = useUploadImage();

  const [addBlog, { isError, error, isSuccess, isLoading }] =
    useAddBlogMutation();

  const [
    updateBlog,
    {
      isError: isErrorU,
      error: errorU,
      isSuccess: isSuccessU,
      isLoading: isLoadingU,
    },
  ] = useUpdateBlogMutation();

  const [open, setOpen] = useState(false);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: getBlogInitialValue(currentValue),
    validationSchema: BlogSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      if (isEdit) {
        updateBlog(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("Blog update successfully!");
          })
          .catch((error) => {
            setErrors(error);
            toast.error("Some error occurred!");
          });
      } else {
        addBlog(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("Blog posted successfully!");
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
  console.log(values);
  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Post Title"
                    {...getFieldProps("title")}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Short Description"
                    {...getFieldProps("shortDescription")}
                    error={Boolean(
                      touched.shortDescription && errors.shortDescription
                    )}
                    helperText={
                      touched.shortDescription && errors.shortDescription
                    }
                  />

                  <div>
                    <LabelStyle>Content</LabelStyle>
                    <QuillEditor
                      id="post-content"
                      value={values.content}
                      onChange={(val) => setFieldValue("content", val)}
                      error={Boolean(touched.content && errors.content)}
                    />
                    {touched.content && errors.content && (
                      <FormHelperText
                        error
                        sx={{ px: 2, textTransform: "capitalize" }}
                      >
                        {touched.content && errors.content}
                      </FormHelperText>
                    )}
                  </div>

                  <div>
                    <LabelStyle>Add Images</LabelStyle>
                    {uploading && (
                      <Box sx={{ width: "50%", margin: "auto" }}>
                        <Alert severity="warning">uploading...</Alert>
                      </Box>
                    )}
                    <UploadSingleFile
                      maxSize={3145728}
                      file={values.cover}
                      onDrop={(acceptedFiles) =>
                        uploadImage(acceptedFiles, setFieldValue, "cover")
                      }
                      error={Boolean(touched.cover && errors.cover)}
                    />
                    {touched.cover && errors.cover && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.cover && errors.cover}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <FormControlLabel
                      control={
                        <Switch
                          {...getFieldProps("publish")}
                          checked={values.publish}
                        />
                      }
                      label="Publish"
                      labelPlacement="start"
                      sx={{
                        mb: 1,
                        mx: 0,
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          {...getFieldProps("comments")}
                          checked={values.comments}
                        />
                      }
                      label="Enable comments"
                      labelPlacement="start"
                      sx={{
                        mx: 0,
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    />
                  </div>

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue("tags", newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
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
                        {...params}
                        label="Tags"
                        error={Boolean(touched.tags && errors.tags)}
                        helperText={touched.tags && errors.tags}
                      />
                    )}
                  />

                  <TextField
                    fullWidth
                    label="Meta title"
                    {...getFieldProps("metaTitle")}
                    error={Boolean(touched.metaTitle && errors.metaTitle)}
                    helperText={touched.metaTitle && errors.metaTitle}
                  />

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Meta description"
                    {...getFieldProps("metaDescription")}
                    error={Boolean(
                      touched.metaDescription && errors.metaDescription
                    )}
                    helperText={
                      touched.metaDescription && errors.metaDescription
                    }
                  />

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.metaKeywords}
                    onChange={(event, newValue) => {
                      setFieldValue("metaKeywords", newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
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
                        {...params}
                        label="Meta keywords"
                        error={Boolean(
                          touched.metaKeywords && errors.metaKeywords
                        )}
                        helperText={touched.metaKeywords && errors.metaKeywords}
                      />
                    )}
                  />
                </Stack>
              </Card>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  type="button"
                  color="inherit"
                  variant="outlined"
                  size="large"
                  onClick={handleOpenPreview}
                  sx={{ mr: 1.5 }}
                >
                  Preview
                </Button>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  loading={isLoading || isLoadingU}
                >
                  {!isEdit ? "Publish" : "Save Changes"}
                </LoadingButton>
              </Stack>
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
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>

      <BlogNewPostPreview
        formik={formik}
        openPreview={open}
        onClosePreview={handleClosePreview}
      />
    </>
  );
}
