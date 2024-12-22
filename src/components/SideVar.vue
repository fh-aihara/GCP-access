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
            <!-- <li class="py-3">
              <router-link to="/query">
                <a
                  class="flex items-center p-3 rounded-xl"
                  :class="
                    focuspage == '/query'
                      ? 'text-white bg-gray-500'
                      : 'text-gray-900 hover:bg-gray-600'
                  "
                  href="#"
                >
                  <span class="pi pi-book"> </span>
                  <span class="ml-4 text-sm font-semibold">本番データ取得</span>
                </a>
              </router-link>
            </li> -->
            <li class="py-3">
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
            <!-- 経理帳票ダウンロードメニューを追加 -->
            <li class="py-3">
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
  },
  methods: {
    signOut() {
      this.$store.commit("updateuserId", null);
      this.$router.go({ path: "/login", force: true });
    },
  },
};
</script>
