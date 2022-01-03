import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export { axiosInstance };
