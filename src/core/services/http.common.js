import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7163/api/v0",
  headers: {
    "Content-Type": "application/json",
  }
});

