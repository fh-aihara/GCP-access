import axios from "axios";
// import store from "@/store";

let base = "";
if (JSON.parse(process.env.VUE_APP_ENDPOINT_USE_PROD)) {
  base = "http://13.230.24.175:8000/api/";
} else {
  base = "http://127.0.0.1:8000/api/";
}
console.log(base);
export const client = axios.create({
  baseURL: base,
});

client.interceptors.request.use(async (config) => {
  return config;
});

export default {
  login(params) {
    return client.post("/login", params);
  },
  postBigquery(params) {
    return client.post("/gcp/query", params);
  },
  getQueries(params) {
    return client.get("/queries", params);
  },
  putQuery(params) {
    return client.put(`/queries/${params.id}`, params);
  },
  postRentRoll(params) {
    return client.post("/gcp/rentroll", params);
  },
};
