import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    userId: null,
    authority: null,
    authToken: null,
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    authority(state) {
      return state.authority;
    },
    authToken(state) {
      return state.authToken;
    },
  },
  mutations: {
    updateuserId(state, id) {
      state.userId = id;
    },
    updateauthority(state, auth) {
      state.authority = auth;
    },
    updateauthToken(state, token) {
      state.authToken = token;
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      // ストレージのキーを指定
      key: "vuex",
      // ストレージの種類を指定
      storage: window.sessionStorage,
    }),
  ],
});
