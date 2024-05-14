import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/tailwind/tailwind.css";
import VueTippy from "vue-tippy";
import "tippy.js/dist/tippy.css"; // optional for styling
import "tippy.js/animations/scale.css";
import "tippy.js/themes/light.css";
import Toaster from "@meforma/vue-toaster";
import VueWriter from "vue-writer";
import Vue3EasyDataTable from "vue3-easy-data-table";
import store from "./store";
import router from "./router";
import "vue3-easy-data-table/dist/style.css";

import DoButton from "./components/buttons/DoButton.vue";
import BackButton from "./components/buttons/BackButton.vue";
import RightColumnOutline from "./components/layout/RightColumnOutline.vue";
import PageTitle from "./components/layout/PageTitle.vue";
import SideVar from "./components/SideVar.vue";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(Toaster)
  .provide("toast", app.config.globalProperties.$toast)
  .use(VueTippy, {
    directive: "tippy",
    defaultProps: {
      placement: "top",
      animation: "scale",
      theme: "light",
    },
  })
  .use(VueWriter)
  .component("EasyDataTable", Vue3EasyDataTable)
  .component("DoButton", DoButton)
  .component("BackButton", BackButton)
  .component("RightColumnOutline", RightColumnOutline)
  .component("PageTitle", PageTitle)
  .component("SideVar", SideVar)
  .mount("#app");
