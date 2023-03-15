import axios, { AxiosError } from "axios";

export const getUserData = async () => {
  const response = await axios({
    method: "GET",
    url: "/status",
  });
  return response.data;
};
