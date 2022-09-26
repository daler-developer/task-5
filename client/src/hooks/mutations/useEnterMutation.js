import { useMutation } from "@tanstack/react-query";
import * as api from "../../api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth";

export default () => {
  const navigate = useNavigate();

  const { setCurrentUser } = useAuthStore();

  return useMutation(
    async (name) => {
      await api.enter(name);

      return name;
    },
    {
      onSuccess(name) {
        setCurrentUser(name);
      },
    }
  );
};
