import axios from "axios";

const base_url = import.meta.env.VITE_BACKENDURL;

const axiosClient = axios.create({
  baseURL: base_url,
  header: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosClient;
