import axios from "axios";

const api = axios.create({
  baseURL: "https://questionnaire-be-nra7.onrender.com",
});
export default api;
