import { useQuery } from "@tanstack/react-query";
import * as api from "../../api";

export default () => {
  return useQuery(["users", "list"], async () => {
    const { data } = await api.getUsers();

    return data.users;
  });
};
