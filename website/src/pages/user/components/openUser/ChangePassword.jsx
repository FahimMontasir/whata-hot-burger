import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, Card, TextField, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useLocation } from "react-router-dom";
import { useConChangePasswordMutation } from "../../../../store/redux/api/consumer";

export default function ChangePassword() {
  const { state } = useLocation();

  const [changePass, { isError, error, isSuccess, isLoading }] =
    useConChangePasswordMutation();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      changePass({
        _id: state._id,
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      })
        .unwrap()
        .then(() => {
          resetForm();
          toast.success("Password changed successfully!");
        })
        .catch((error) => {
          setErrors(error);
          toast.error(error.data?.message);
        });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps("oldPassword")}
              fullWidth
              autoComplete="on"
              type="password"
              label="Old Password"
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />

            <TextField
              {...getFieldProps("newPassword")}
              fullWidth
              autoComplete="on"
              type="password"
              label="New Password"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={
                (touched.newPassword && errors.newPassword) ||
                "Password must be minimum 6+"
              }
            />

            <TextField
              {...getFieldProps("confirmNewPassword")}
              fullWidth
              autoComplete="on"
              type="password"
              label="Confirm New Password"
              error={Boolean(
                touched.confirmNewPassword && errors.confirmNewPassword
              )}
              helperText={
                touched.confirmNewPassword && errors.confirmNewPassword
              }
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Save Changes
            </LoadingButton>
            {isError && (
              <Alert severity="error">
                An error occurred:{" "}
                {error.data
                  ? error.data.message
                  : "Check your network connection"}
              </Alert>
            )}
            {isSuccess && (
              <Alert severity="success">Password changed successfully!</Alert>
            )}
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
