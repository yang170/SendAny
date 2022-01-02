import axios from "axios";

const baseURL = `http://${
  process.env.BASE_URL ? process.env.BASE_URL : "localhost:3001"
}/api/`;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export { axiosInstance };
