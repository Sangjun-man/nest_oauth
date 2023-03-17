import axios from "axios";
console.log("axios, default  set");
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 301)
      window.location.assign(error.response.data.message);
  }
);
