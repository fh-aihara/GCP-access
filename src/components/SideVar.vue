<template>
  <div>
    <div class="block navbar-menu relative z-20">
      <nav
        class="fixed top-0 left-0 bottom-0 w-60 flex flex-col h-full py-8 px-4 bg-gray-300 overflow-auto"
      >
        <div class="mb-3">
          <a class="inline-block mb-9 w-24" href="#">
            <router-link to="/query">
              <img class="h-24" src="../assets/assets/icon.svg" alt="" />
            </router-link>
          </a>
          <ul>
            <!-- レントロールメニュー - rentroll権限がある場合のみ表示 -->
            <li class="py-3" v-if="hasRentrollAccess">
              <router-link to="/rentroll">
                <a
                  class="flex items-center p-3 rounded-xl"
                  :class="
                    focuspage == '/rentroll'
                      ? 'text-white bg-gray-500'
                      : 'text-gray-900 hover:bg-gray-600'
                  "
                  href="#"
                >
                  <span class="pi pi-book"> </span>
                  <span class="ml-4 text-sm font-semibold">レントロール</span>
                </a>
              </router-link>
            </li>

            <!-- 経理帳票ダウンロードメニュー - keiri権限がある場合のみ表示 -->
            <li class="py-3" v-if="hasKeiriAccess">
              <router-link to="/keiri">
                <a
                  class="flex items-center p-3 rounded-xl"
                  :class="
                    focuspage == '/keiri'
                      ? 'text-white bg-gray-500'
                      : 'text-gray-900 hover:bg-gray-600'
                  "
                  href="#"
                >
                  <span class="pi pi-file"> </span>
                  <span class="ml-4 text-sm font-semibold"
                    >経理帳票ダウンロード</span
                  >
                </a>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="pt-20">
          <a
            class="flex items-center p-3 text-gray-900 hover:bg-gray-600 hover:text-gray-900 rounded-xl"
            href="#"
            @click="signOut"
          >
            <span class="pi pi-sign-out"> </span>
            <span class="ml-4 text-sm font-semibold">ログアウト</span>
          </a>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    focuspage: function () {
      return this.$route.path;
    },
    // ユーザー権限を取得するコンピューテッドプロパティ
    userAuthority: function () {
      return this.$store.getters.authority;
    },
    // レントロールへのアクセス権限があるか確認
    hasRentrollAccess: function () {
      if (!this.userAuthority) return false;
      return this.userAuthority.rentroll === true;
    },
    // 経理帳票へのアクセス権限があるか確認
    hasKeiriAccess: function () {
      if (!this.userAuthority) return false;
      return this.userAuthority.keiri === true;
    },
  },
  methods: {
    signOut() {
      // ログアウト時に全ての認証情報をクリア
      this.$store.commit("updateuserId", null);
      this.$store.commit("updateauthority", null);
      this.$store.commit("updateauthToken", null);
      this.$router.go({ path: "/login", force: true });
    },
  },
};
</script>
