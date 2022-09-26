import { useQuery } from "@tanstack/react-query";
import * as api from "../../api";

export default () => {
  return useQuery(["messages", "list"], async () => {
    const { data } = await api.getMessages();

    return data.messages;
  });
};
