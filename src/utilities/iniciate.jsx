import axios from "axios";

const instance = axios.create({
  baseURL: "https://dev-api.innowave.solutions/",
});

export default instance;
