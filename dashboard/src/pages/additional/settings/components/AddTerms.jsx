import { toast } from "react-toastify";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@mui/lab";
import {
  Card,
  Stack,
  Typography,
  FormHelperText,
  styled,
  Alert,
} from "@mui/material";
import QuillEditor from "../../../../common/quillEditor";
import {
  useAddTermsConditionMutation,
  useUpdateTermsConditionMutation,
} from "../../../../store/redux/api/termsAndCondition";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

AddTerms.propTypes = {
  currentValue: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default function AddTerms({ currentValue, isEdit }) {
  const [addTerms, { isError, error, isSuccess, isLoading }] =
    useAddTermsConditionMutation();

  const [
    updateBlog,
    {
      isError: isErrorU,
      error: errorU,
      isSuccess: isSuccessU,
      isLoading: isLoadingU,
    },
  ] = useUpdateTermsConditionMutation();

  const TermsSchema = Yup.object().shape({
    content: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      _id: currentValue?._id,
      content: currentValue?.content || "",
    },
    validationSchema: TermsSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      if (isEdit) {
        updateBlog(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("Terms updated successfully!");
          })
          .catch((error) => {
            setErrors(error);
            toast.error("Some error occurred!");
          });
      } else {
        addTerms(values)
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("Terms posted successfully!");
          })
          .catch((error) => {
            setErrors(error);
            toast.error("Some error occurred!");
          });
      }
    },
  });

  const { errors, values, touched, handleSubmit, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Card sx={{ p: 3 }}>
          <div>
            <LabelStyle>Content</LabelStyle>
            <QuillEditor
              id="post-terms"
              value={values.content}
              onChange={(val) => setFieldValue("content", val)}
              error={Boolean(touched.content && errors.content)}
            />
            {touched.content && errors.content && (
              <FormHelperText error sx={{ px: 2, textTransform: "capitalize" }}>
                {touched.content && errors.content}
              </FormHelperText>
            )}
          </div>
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
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
            <Alert severity="success">Terms added successfully!</Alert>
          )}
          {isErrorU && (
            <Alert severity="error">
              An error occurred: {errorU.data?.message}
            </Alert>
          )}
          {isSuccessU && (
            <Alert severity="success">Terms updated successfully!</Alert>
          )}
        </Card>
      </Form>
    </FormikProvider>
  );
}
