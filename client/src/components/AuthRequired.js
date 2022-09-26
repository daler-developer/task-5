import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/auth";
import { getCurrentUser } from "../utils/helpers";

export default ({ children }) => {
  const { currentUser } = useAuthStore();

  if (currentUser) {
    return children;
  }

  return <Navigate to="/enter" />;
};
