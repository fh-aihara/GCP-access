<template>
  <!-- <input @change="selectedFile" type="file" name="file" />
  <button @click="upload" type="submit">アップロード</button> -->
  <div class="KycList">
    <div>
      <!-- side var  -->
      <SideVar />
      <!-- input panel -->
      <RightColumnOutline>
        <PageTitle> KYC一覧 </PageTitle>
        <div class="flex justify-between items-center">
          <div class="text-white text-left ml-4 text-sm">KYC待ち</div>
          <div class="flex text-white items-center">
            最新更新時刻 {{ final_got_time }}
            <button
              class="block p-2 px-4 leading-6 text-white rounded-lg transition duration-200 bg-green-500 hover:bg-green-600 text-base mr-8 ml-4"
              @click="getage_verifications"
            >
              画面更新
            </button>
          </div>
        </div>
        <div class="m-4 p-2">
          <EasyDataTable
            :headers="headers"
            :items="itemsYet"
            :sort-by="sortBy"
            :sort-type="sortType"
          >
            <template #item-check="{ verification_id }">
              <router-link
                :to="{
                  name: 'kyc',
                  params: { id: verification_id },
                }"
              >
                <DoButton>審査する</DoButton>
              </router-link>
            </template>
          </EasyDataTable>
        </div>
        <div class="flex justify-between items-center mt-8">
          <div class="text-white text-left ml-4 text-sm">KYC保留</div>
        </div>
        <div class="m-4 p-2">
          <EasyDataTable
            :headers="headers"
            :items="itemsPend"
            :sort-by="sortBy"
            :sort-type="sortType"
          >
            <template #item-check="{ verification_id }">
              <router-link
                :to="{
                  name: 'kyc',
                  params: { id: verification_id },
                }"
              >
                <DoButton>審査する</DoButton>
              </router-link>
            </template>
          </EasyDataTable>
        </div>
        <div class="flex justify-between items-center mt-8">
          <div class="text-white text-left ml-4 text-sm">KYC完了</div>
        </div>
        <div class="m-4 p-2">
          <EasyDataTable
            :headers="headers"
            :items="itemsDone"
            :sort-by="sortBy"
            :sort-type="sortType"
          >
            <template #item-check="{ verification_id }">
              <router-link
                :to="{
                  name: 'kyc',
                  params: { id: verification_id },
                }"
              >
                <DoButton>参照</DoButton>
              </router-link>
            </template>
          </EasyDataTable>
        </div>
        <div class="flex justify-between items-center mt-8">
          <div class="text-white text-left ml-4 text-sm">KYC拒否</div>
        </div>
        <div class="m-4 p-2">
          <EasyDataTable
            :headers="headers"
            :items="itemsDeny"
            :sort-by="sortBy"
            :sort-type="sortType"
          >
            <template #item-check="{ verification_id }">
              <router-link
                :to="{
                  name: 'kyc',
                  params: { id: verification_id },
                }"
              >
                <DoButton>参照</DoButton>
              </router-link>
            </template>
          </EasyDataTable>
        </div>
      </RightColumnOutline>
    </div>
  </div>
</template>

<script>
import SideVar from "@/components/SideVar.vue";
import api from "../api/api";
import { ref, onMounted } from "vue";
import DoButton from "@/components/buttons/DoButton.vue";
export default {
  data: function () {
    return {
      show_flag: false,
      final_got_time: "",
    };
  },
  components: {
    SideVar,
    DoButton,
  },
  setup() {
    const sortBy = "created_at";
    const sortType = "asc";
    const headers = [
      { text: "", value: "check", width: 120 },
      { text: "verification_id", value: "verification_id", sortable: true },
      { text: "user_id", value: "user_id", sortable: true },
      { text: "image_url", value: "image_url", sortable: true },
      { text: "status", value: "status", sortable: true },
      { text: "memo", value: "memo", sortable: true },
      { text: "updated_by", value: "update_by", sortable: true },
      { text: "updated_at", value: "updated_at", sortable: true },
      { text: "created_at", value: "created_at", sortable: true },
    ];
    let itemsYet = ref([]);
    let itemsPend = ref([]);
    let itemsDone = ref([]);
    let itemsDeny = ref([]);
    onMounted(() => {});
    return {
      headers,
      itemsYet,
      itemsPend,
      itemsDone,
      sortBy,
      sortType,
      itemsDeny,
    };
  },
  mounted() {
    this.getage_verifications();
    this.show_flag = true;
  },
  computed: {},
  methods: {
    getage_verifications() {
      api
        .getage_verifications()
        .then((response) => {
          this.itemsYet = [];
          this.itemsPend = [];
          this.itemsDone = [];
          this.itemsDeny = [];
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, "0"); // 月は0から始まるので+1
          const day = String(now.getDate()).padStart(2, "0");
          const hours = String(now.getHours()).padStart(2, "0");
          const minutes = String(now.getMinutes()).padStart(2, "0");
          const seconds = String(now.getSeconds()).padStart(2, "0");
          this.final_got_time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

          for (let i = 0; i < response["data"].length; i++) {
            switch (response["data"][i]["status"]) {
              // 送った0, 承認1, 否認２, ペンディング３
              case 0:
                this.itemsYet.push({
                  verification_id: response["data"][i]["verification_id"],
                  user_id: response["data"][i]["user_id"],
                  image_url: response["data"][i]["image_url"],
                  status: response["data"][i]["status"],
                  memo: response["data"][i]["memo"],
                  update_by: response["data"][i]["update_by"],
                  updated_at: response["data"][i]["updated_at"],
                  created_at: response["data"][i]["created_at"],
                });
                break;
              case 3:
                this.itemsPend.push({
                  verification_id: response["data"][i]["verification_id"],
                  user_id: response["data"][i]["user_id"],
                  image_url: response["data"][i]["image_url"],
                  status: response["data"][i]["status"],
                  memo: response["data"][i]["memo"],
                  update_by: response["data"][i]["update_by"],
                  updated_at: response["data"][i]["updated_at"],
                  created_at: response["data"][i]["created_at"],
                });
                break;
              case 1:
                this.itemsDone.push({
                  verification_id: response["data"][i]["verification_id"],
                  user_id: response["data"][i]["user_id"],
                  image_url: response["data"][i]["image_url"],
                  status: response["data"][i]["status"],
                  memo: response["data"][i]["memo"],
                  update_by: response["data"][i]["update_by"],
                  updated_at: response["data"][i]["updated_at"],
                  created_at: response["data"][i]["created_at"],
                });
                break;
              case 2:
                this.itemsDeny.push({
                  verification_id: response["data"][i]["verification_id"],
                  user_id: response["data"][i]["user_id"],
                  image_url: response["data"][i]["image_url"],
                  status: response["data"][i]["status"],
                  memo: response["data"][i]["memo"],
                  update_by: response["data"][i]["update_by"],
                  updated_at: response["data"][i]["updated_at"],
                  created_at: response["data"][i]["created_at"],
                });
                break;
            }
          }
        })
        .catch(() => {
          this.$toast.show("データの取得に失敗しました", {
            type: "error",
            position: "top-right",
            duration: 5000,
          });
        });
    },
  },
};
</script>
