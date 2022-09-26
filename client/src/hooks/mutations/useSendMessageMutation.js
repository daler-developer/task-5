import { useMutation } from "@tanstack/react-query";
import * as api from "../../api";

export default () => {
  return useMutation(async ({ text, title, receiver }) => {
    const { data } = await api.sendMessage({ text, receiver, title });

    return data.message;
  });
};
