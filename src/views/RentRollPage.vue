<template>
  <div class="query">
    <!-- side var  -->
    <SideVar />
    <!-- main div -->
    <RightColumnOutline>
      <PageTitle>レントロール</PageTitle>
      <div class="container mx-auto p-4">
        <!-- <h1 class="text-2xl font-bold mb-4 text-white">レントロール取得</h1> -->
        <!-- 物件ID入力フィールド -->
        <div class="mb-8">
          <label for="property-id" class="block mb-2 text-lg text-white"
            >物件ID</label
          >
          <input
            id="property-id"
            class="w-full p-2 border rounded w-1/3"
            type="text"
            placeholder="Enter 物件ID"
            v-model="property_customer_managed_id"
          />
        </div>
        <!-- 日付入力フィールド -->
        <div class="mb-12">
          <label for="date" class="block mb-2 text-lg text-white">日付</label>
          <input
            id="date"
            class="w-full p-2 border rounded w-1/3"
            type="date"
            v-model="date"
          />
        </div>
        <!-- レントロール取得ボタン -->
        <div class="mb-4">
          <DoButton
            class="bg-blue-500 text-white px-6 py-3 rounded"
            :clickFunction="getRentRollPromise"
            :values="{}"
          >
            レントロール取得
          </DoButton>
        </div>
      </div>
    </RightColumnOutline>
  </div>
</template>

<script>
import api from "../api/api.js";

export default {
  name: "tableView",
  components: {},
  data() {
    return {
      property_customer_managed_id: "",
      date: "",
    };
  },
  mounted() {
    // date項目に今日のJST日付をセット
    this.date = new Date().toISOString().substr(0, 10);
  },
  computed: {},
  methods: {
    getRentRollPromise() {
      return new Promise((resolve) => {
        console.log("Get rentroll...");
        api
          .postRentRoll({
            property_customer_managed_id: this.property_customer_managed_id,
            date: this.date,
          })
          .then((response) => {
            console.log(response);
            // ブラウザ上でファイルを作成
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;

            // ファイル名を設定
            const filename =
              response.headers["content-disposition"].split("filename=")[1];
            link.setAttribute("download", filename);

            // ファイルを自動的にダウンロード
            document.body.appendChild(link);
            link.click();

            // その後、リンクを削除
            link.remove();
            resolve("resolved");
          })
          .catch((error) => {
            console.log(error);
            resolve("resolved");
          });
      });
    },
  },
};
</script>
