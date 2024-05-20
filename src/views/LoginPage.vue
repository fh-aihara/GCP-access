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
                class="relative w-full h-14 py-4 px-3 mb-8 border border-gray-400 hover:border-blue focus-within:border-gray-500 rounded-lg"
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
                class="relative w-full h-14 py-4 px-3 mb-3 border border-gray-400 hover:border-blue focus-within:border-gray-500 rounded-lg"
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
              class="mt-8 block w-full py-4 mb-4 leading-6 text-white font-semibold rounded-lg transition duration-200"
              :class="
                username != '' && this.password != '' && !loading
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-500 hover:bg-gray-600'
              "
              :disabled="!username || !password || loading"
              @click="signIn"
            >
              <i class="pi pi-spin pi-spinner text-sm" v-if="loading"></i>
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "@/api/api.js";
// import store from "@/store";

export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  computed: {},
  methods: {
    signIn: function () {
      this.loading = true;
      api
        .login({
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          if (response.data == "WRONG") {
            this.$toast.show("ユーザー名又はパスワードが間違っています", {
              type: "error",
              position: "top-right",
              duration: 5000,
            });
            this.loading = false;
            return;
          }
          if (response.data == "ERROR") {
            this.$toast.show("エラーが発生しました。", {
              type: "error",
              position: "top-right",
              duration: 5000,
            });
            this.loading = false;
            return;
          }
          if (response.data == "SUCCESS") {
            this.$toast.show("ログインに成功しました", {
              type: "success",
              position: "top-right",
              duration: 3000,
            });
            this.loading = false;
            this.$store.commit("updateuserId", 1);
            this.$router.replace("/query");
          }
        })
        .catch((error) => {
          this.$toast.show("エラーが発生しました。", {
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
