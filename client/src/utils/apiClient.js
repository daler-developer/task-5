import axios from "axios";
import useAuthStore from "../stores/auth";

const apiClient = axios.create({});

apiClient.interceptors.request.use((config) => {
  const user = useAuthStore.getState().currentUser;

  if (user) {
    config.headers["Authorization"] = user;
  }

  return config;
});

export default apiClient;
