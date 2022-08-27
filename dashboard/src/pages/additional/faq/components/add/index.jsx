import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@mui/lab";
import {
  Card,
  Stack,
  TextField,
  Alert,
  FormControlLabel,
  Switch,
} from "@mui/material";
// config
import { FAQSchema, getFAQInitialValues } from "./add.config";
import {
  useAnswerQuestionMutation,
  useAskQuestionAdminMutation,
} from "../../../../../store/redux/api/faq";

AddFAQ.propTypes = {
  isEdit: PropTypes.bool,
  currentData: PropTypes.object,
};

export default function AddFAQ({ isEdit, currentData }) {
  const [addQuestion, { isError, error, isSuccess, isLoading }] =
    useAskQuestionAdminMutation();

  const [
    updateFAQ,
    {
      isError: isErrorU,
      error: errorU,
      isSuccess: isSuccessU,
      isLoading: isLoadingU,
    },
  ] = useAnswerQuestionMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getFAQInitialValues(currentData),
    validationSchema: FAQSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      if (isEdit) {
        updateFAQ(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("FAQ updated successfully!");
          })
          .catch((error) => {
            setErrors(error);
            toast.error("Some error occurred!");
          });
      } else {
        addQuestion(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("FAQ added successfully!");
          })
          .catch((error) => {
            setErrors(error);
            toast.error("Some error occurred!");
          });
      }
    },
  });

  const { errors, values, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3} mb={4}>
            <TextField
              fullWidth
              label="Full Name"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Email"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Question"
              {...getFieldProps("question")}
              error={Boolean(touched.question && errors.question)}
              helperText={touched.question && errors.question}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Answer"
              {...getFieldProps("answer")}
              error={Boolean(touched.answer && errors.answer)}
              helperText={touched.answer && errors.answer}
            />
            <div>
              <FormControlLabel
                control={
                  <Switch
                    {...getFieldProps("isAdded")}
                    checked={values.isAdded}
                  />
                }
                label="Is Added"
                labelPlacement="start"
                sx={{
                  mb: 1,
                  mx: 0,
                  width: "100%",
                  justifyContent: "space-between",
                }}
              />
            </div>
          </Stack>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            loading={isLoading || isLoadingU}
          >
            {!isEdit ? "Add Question" : "Save Changes"}
          </LoadingButton>

          {isError && (
            <Alert severity="error">
              An error occurred: {error.data?.message}
            </Alert>
          )}
          {isSuccess && (
            <Alert severity="success">FAQ added successfully!</Alert>
          )}
          {isErrorU && (
            <Alert severity="error">
              An error occurred: {errorU.data?.message}
            </Alert>
          )}
          {isSuccessU && (
            <Alert severity="success">FAQ updated successfully!</Alert>
          )}
        </Card>
      </Form>
    </FormikProvider>
  );
}
