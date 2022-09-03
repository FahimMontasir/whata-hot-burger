import { useLocation } from "react-router-dom";
import ConsumerForm from "../../../authentication/components/form/ConsumerForm";

const UpdateUser = () => {
  const { state } = useLocation();
  return (
    <ConsumerForm
      isEdit
      currentUser={{ ...state, password: "proxyPass" }}
      notShow
    />
  );
};
export default UpdateUser;
