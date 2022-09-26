import client from "../utils/apiClient";

export const enter = async (name) => {
  return await client.post("/api/auth/enter", { name });
};

export const leave = async () => {
  return await client.post("/api/auth/leave");
};

export const sendMessage = async ({ receiver, text, title }) => {
  return await client.post("/api/messages", { receiver, text, title });
};

export const getMessages = async () => {
  return await client.get("/api/messages");
};

export const getUsers = async () => {
  return await client.get("/api/users");
};
