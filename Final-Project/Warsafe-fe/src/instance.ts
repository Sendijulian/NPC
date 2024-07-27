import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "https://grobak-be.vercel.app",
});

export default instance;
