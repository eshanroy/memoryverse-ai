import axios from "axios";

const api = axios.create({
  baseURL: "https://memoryverse-ai-s534.onrender.com/api",
});

export default api;