import axios from "axios";


const api = axios.create({
  baseURL: "https://backend-10-lime.vercel.app/api",
});

export default api;
