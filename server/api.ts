import axios from "axios";

console.log(import.meta.env)
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL as string,
});

export default API;
