import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, Card, TextField, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { getUser } from "../../../../../store/redux/slices/localStorageAuth";
import { useConChangePasswordMutation } from "../../../../../store/redux/api/consumer";
import { useLocation } from "react-router-dom";

export default function ChangePassword() {
  const { type } = useSelector(getUser);
  const { state } = useLocation();

  const [changePass, { isError, error, isSuccess, isLoading }] =
    useConChangePasswordMutation();

  let ChangePassWordSchema;
  if (type === "admin") {
    ChangePassWordSchema = Yup.object().shape({
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New Password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });
  } else {
    ChangePassWordSchema = Yup.object().shape({
      oldPassword: Yup.string().required("Old Password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New Password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });
  }

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
          toast.error(error.data.message);
        });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            {type !== "admin" && (
              <TextField
                {...getFieldProps("oldPassword")}
                fullWidth
                autoComplete="on"
                type="password"
                label="Old Password"
                error={Boolean(touched.oldPassword && errors.oldPassword)}
                helperText={touched.oldPassword && errors.oldPassword}
              />
            )}

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
                An error occurred: {error.data.message}
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
