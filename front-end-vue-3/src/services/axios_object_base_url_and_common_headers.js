import axios from "axios";

const axios_object_with_base_url_and_common_headers = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  Accept: "application/json",
});

export default axios_object_with_base_url_and_common_headers;
