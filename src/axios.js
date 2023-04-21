import axios from "axios";

const axiosOptions = {
  baseURL: "https://diploma-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
};

export const axiosInstance = axios.create(axiosOptions);
