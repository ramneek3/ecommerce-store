import axios from "axios";

export const api = axios.create({
  baseURL: "/api",   // ⬅️ NOT http://localhost:5000 anymore
});