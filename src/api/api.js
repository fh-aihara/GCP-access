import axios from "axios";
// import store from "@/store";

let base = "";
if (JSON.parse(process.env.VUE_APP_ENDPOINT_USE_PROD)) {
  base = "http://13.230.24.175:8000/api/";
} else {
  base = "http://127.0.0.1:8000/api/";
}
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
  // deleteEvent(params) {
  //   return client.delete(`/events/${params.event_id}/cancel`, params);
  // },
  // patchevents(params) {
  //   return client.patch(`/events/${params.id}`, params);
  // },
  // getusers(params) {
  //   return client.get("/users", params);
  // },
  // postusers(params) {
  //   return client.post("/users", params);
  // },
  // patchusers(params) {
  //   return client.patch(`/users/${params.id}`, params);
  // },
  // deleteUsers(params) {
  //   return client.delete(`/users/${params.user_id}`, params);
  // },
  // getage_verifications(params) {
  //   return client.get("/age_verifications", params);
  // },
  // getage_verification(params) {
  //   return client.get(`/age_verifications/${params.id}`, params);
  // },
  // getage_verification_image(params) {
  //   return client.get(`/age_verifications/image/${params.id}`, params);
  // },
  // postage_verifications(params) {
  //   return client.post("/age_verifications", params);
  // },
  // patchage_verifications(params) {
  //   return client.patch(`/age_verifications/${params.id}`, params);
  // },
  // getuser_photos(params) {
  //   return client.get("/user_photos", params);
  // },
  // postuser_photos(params) {
  //   return client.post("/user_photos", params);
  // },
  // patchuser_photos(params) {
  //   return client.patch(`/user_photos/${params.id}`, params);
  // },
  // getchat_rooms(params) {
  //   return client.get("/chat_rooms", params);
  // },
  // postchat_rooms(params) {
  //   return client.post("/chat_rooms", params);
  // },
  // patchchat_rooms(params) {
  //   return client.patch(`/chat_rooms/${params.id}`, params);
  // },
  // getchat_room_user(params) {
  //   return client.get("/chat_room_user", params);
  // },
  // postchat_room_user(params) {
  //   return client.post("/chat_room_user", params);
  // },
  // patchchat_room_user(params) {
  //   return client.patch(`/chat_room_user/${params.id}`, params);
  // },
  // getfriends(params) {
  //   return client.get("/friends", params);
  // },
  // postfriends(params) {
  //   return client.post("/friends", params);
  // },
  // patchfriends(params) {
  //   return client.patch(`/friends/${params.id}`, params);
  // },
  // getmessages(params) {
  //   return client.get("/messages", params);
  // },
  // postmessages(params) {
  //   return client.post("/messages", params);
  // },
  // patchmessages(params) {
  //   return client.patch(`/messages/${params.id}`, params);
  // },
  // getareas(params) {
  //   return client.get("/areas", params);
  // },
  // postareas(params) {
  //   return client.post("/areas", params);
  // },
  // patchareas(params) {
  //   return client.patch(`/areas/${params.id}`, params);
  // },
  // gettheme(params) {
  //   return client.get("/theme", params);
  // },
  // posttheme(params) {
  //   return client.post("/theme", params);
  // },
  // patchtheme(params) {
  //   return client.patch(`/theme/${params.id}`, params);
  // },
  // getparticipants(params) {
  //   return client.get("/participants", params);
  // },
  // postparticipants(params) {
  //   return client.post("/participants", params);
  // },
  // patchparticipants(params) {
  //   return client.patch(`/participants/${params.id}`, params);
  // },
  // getuser_opinions(params) {
  //   return client.get("/user_opinions", params);
  // },
  // postuser_opinions(params) {
  //   return client.post("/user_opinions", params);
  // },
  // patchuser_opinions(params) {
  //   return client.patch(`/user_opinions/${params.id}`, params);
  // },
  // getblocks(params) {
  //   return client.get("/blocks", params);
  // },
  // postblocks(params) {
  //   return client.post("/blocks", params);
  // },
  // patchblocks(params) {
  //   return client.patch(`/blocks/${params.id}`, params);
  // },
  // // 分析データ
  // getAccountCreationData(params) {
  //   return client.get("/kpi/account-creation", params);
  // },
  // getAccountGenderData(params) {
  //   return client.get("/kpi/account-gender", params);
  // },
  // getAccountAgeData(params) {
  //   return client.get("/kpi/account-age", params);
  // },
  // getKycGenderWomanData(params) {
  //   return client.get("/kpi/kyc-gender/1", params);
  // },
  // getKycGenderManData(params) {
  //   return client.get("/kpi/kyc-gender/0", params);
  // },
};
