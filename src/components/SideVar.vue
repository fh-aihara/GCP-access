<template>
  <div>
    <div class="block navbar-menu relative z-20">
      <nav
        class="fixed top-0 left-0 bottom-0 w-60 flex flex-col h-full py-8 px-4 bg-green-200 overflow-auto"
      >
        <div class="mb-3">
          <a class="inline-block mb-9 w-24" href="#">
            <router-link to="/table-view">
              <img class="h-24" src="../assets/assets/icon.svg" alt="" />
            </router-link>
          </a>
          <ul>
            <li class="py-3">
              <router-link to="/table-view">
                <a
                  class="flex items-center p-3 rounded-xl"
                  :class="
                    focuspage == '/table-view'
                      ? 'text-white bg-green-500'
                      : 'text-green-900 hover:bg-green-600'
                  "
                  href="#"
                >
                  <span class="pi pi-book"> </span>
                  <span class="ml-4 text-sm font-semibold">テーブルビュー</span>
                </a>
              </router-link>
            </li>
            <li class="py-3">
              <router-link to="/kyc-list">
                <a
                  class="flex items-center p-3 rounded-xl"
                  :class="
                    focuspage == '/kyc-list'
                      ? 'text-white bg-green-500'
                      : 'text-green-900 hover:bg-green-600'
                  "
                  href="#"
                >
                  <span class="pi pi-file-edit"> </span>
                  <span class="ml-4 text-sm font-semibold">KYC審査</span>
                </a>
              </router-link>
            </li>
            <li class="py-3">
              <div v-if="authority == 0">
                <router-link to="/kpi-viewer">
                  <a
                    class="flex items-center p-3 rounded-xl"
                    :class="
                      focuspage == '/kpi-viewer'
                        ? 'text-white bg-green-500'
                        : 'text-green-900 hover:bg-green-600'
                    "
                    href="#"
                  >
                    <span class="pi pi-file-edit"> </span>
                    <span class="ml-4 text-sm font-semibold">KPIビュー</span>
                  </a>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
        <div class="pt-20">
          <a
            class="flex items-center p-3 text-green-900 hover:bg-green-600 hover:text-green-900 rounded-xl"
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
    authority: function () {
      return this.$store.getters["authority"];
    },
  },
  methods: {
    signOut() {
      this.$store.commit("updateuserId", null);
      this.$store.commit("updateauthToken", null);
    },
  },
};
</script>
