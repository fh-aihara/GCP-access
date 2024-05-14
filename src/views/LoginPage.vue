<template>
  <div class="login_page">
    <section class="relative pt-24">
      <div class="container px-4 mx-auto">
        <div class="h-full">
          <div class="relative max-w-xs mx-auto text-center">
            <div class="w-48 inline-block mx-auto mb-10">
              <img class="block" src="../assets/assets/icon.svg" />
            </div>
            <h2 class="text-2xl text-gray-500 font-semibold mb-2"></h2>
            <p class="text-gray-400 font-medium mb-10">
              ユーザー名とパスワードを入力してください
            </p>
            <form action="">
              <div
                class="relative w-full h-14 py-4 px-3 mb-8 border border-gray-400 hover:border-blue focus-within:border-green-500 rounded-lg"
              >
                <span
                  class="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-600 px-1 bg-gray-200"
                  >ユーザー名</span
                >
                <input
                  class="block w-full outline-none text-sm text-gray-600 font-medium"
                  type="text"
                  placeholder="ADIuser"
                  v-model="username"
                />
              </div>
              <div
                class="relative w-full h-14 py-4 px-3 mb-3 border border-gray-400 hover:border-blue focus-within:border-green-500 rounded-lg"
              >
                <span
                  class="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-600 px-1 bg-gray-200"
                  >パスワード</span
                >
                <input
                  class="block w-full outline-none bg-transparent text-sm text-gray-600 font-medium"
                  id="password"
                  type="password"
                  placeholder="password"
                  v-model="password"
                />
              </div>
            </form>
            <button
              class="mt-6 block w-full py-4 mb-4 leading-6 text-white font-semibold rounded-lg transition duration-200"
              :class="
                username != '' && this.password != '' && !loading
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-500 hover:bg-gray-600'
              "
              :disabled="!username || !password || loading"
              @click="signIn"
            >
              <i class="pi pi-spin pi-spinner text-sm" v-if="loading"></i>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "@/api/api.js";
import store from "@/store";

export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  computed: {
    user_id() {
      return this.$store.getters["userId"];
    },
    token() {
      return this.$store.getters["authToken"];
    },
  },
  methods: {
    signIn: function () {
      this.loading = true;
      var SHA256 = require("crypto-js/sha256");
      const pw_token = SHA256(this.password);
      api
        .login({
          name: this.username,
          password: pw_token.toString(),
        })
        .then((response) => {
          const token = SHA256(this.password + response.data);
          store.commit("updateauthToken", token.toString());
          this.$toast.show("ログインに成功しました", {
            type: "success",
            position: "top-right",
            duration: 3000,
          });
          api
            .getAdminUser()
            .then((response) => {
              console.log(response);
              store.commit("updateuserId", response.data.admin_id);
              store.commit("updateauthority", response.data.authority);
              this.$router.replace("/table-view");
            })
            .catch(() => {
              this.$toast.show(
                "アカウント情報の取得に失敗しました。システム管理者にお問合せください。",
                {
                  type: "error",
                  position: "top-right",
                  duration: 5000,
                }
              );
            });
          this.loading = false;
        })
        .catch((error) => {
          this.$toast.show("Username又はPasswordが間違っています", {
            type: "error",
            position: "top-right",
            duration: 5000,
          });
          this.loading = false;
          console.log(error.code + " " + error.message);
        });
    },
    refresh_error: function () {
      this.error_message = "";
    },
  },
};
</script>
