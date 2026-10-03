import axios from "axios";

const api = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
  timeout: 8000,
});

export default api;
