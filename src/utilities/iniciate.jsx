import axios from "axios";

const instance = axios.create({
  url: "https://dev-api.innowave.solutions",
});

export default instance;
