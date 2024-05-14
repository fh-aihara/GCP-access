<template>
  <!-- <input @change="selectedFile" type="file" name="file" />
  <button @click="upload" type="submit">アップロード</button> -->
  <div class="KyCheck">
    <div>
      <!-- side var  -->
      <SideVar />
      <!-- input panel -->
      <RightColumnOutline>
        <PageTitle>KYC審査</PageTitle>
        <div class="flex justify-left items-center">
          <div class="text-white text-left ml-4 text-lg">ユーザーID：</div>
          <div class="text-white text-left ml-4 text-lg">{{ user_id }}</div>
        </div>
        <div class="flex justify-left items-center mt-4">
          <div class="text-white text-left ml-4 text-lg">性別：</div>
          <div class="text-white text-left ml-4 text-lg">{{ gender }}</div>
        </div>
        <div class="flex justify-left items-center mt-4">
          <div class="text-white text-left ml-4 text-lg">ユーザー名：</div>
          <div class="text-white text-left ml-4 text-lg">{{ name }}</div>
        </div>
        <div class="flex justify-left items-center mt-4">
          <div class="text-white text-left ml-4 text-lg">生年月日：</div>
          <div class="text-white text-left ml-4 text-lg">{{ birthday }}</div>
        </div>
        <div class="mt-4 text-lg text-white text-left ml-4 mx-auto">
          年齢証明画像：
        </div>
        <img :src="personalPic" v-if="personalPic" class="mt-2 ml-4 w-1/2" />
        <div class="flex justify-left items-center mt-12">
          <div class="text-white text-left ml-4 text-lg">確認結果</div>
        </div>
        <div class="flex justify-left items-center">
          <div class="flex items-center pl-4 text-white">
            <input
              id="bordered-radio-1"
              type="radio"
              value="1"
              v-model="result"
              name="bordered-radio"
              class="w-4 h-4"
            />
            <label for="bordered-radio-1" class="py-4 ml-2 text-sm font-medium"
              >承認</label
            >
          </div>
          <div class="flex items-center pl-4 text-white ml-12">
            <input
              id="bordered-radio-2"
              type="radio"
              value="2"
              v-model="result"
              name="bordered-radio"
              class="w-4 h-4"
            />
            <label for="bordered-radio-2" class="py-4 ml-2 text-sm font-medium"
              >非承認</label
            >
          </div>
          <div class="flex items-center pl-4 text-white ml-12">
            <input
              id="bordered-radio-3"
              type="radio"
              value="3"
              v-model="result"
              name="bordered-radio"
              class="w-4 h-4"
            />
            <label for="bordered-radio-3" class="py-4 ml-2 text-sm font-medium"
              >ペンディング</label
            >
          </div>
        </div>
        <div class="mt-6 ml-4">
          <label
            for="large-input"
            class="block mb-2 text-lg text-white text-left"
            >備考</label
          >
          <textarea
            id="large-input"
            v-model="memo"
            class="block w-2/3 h-32 p-4 text-black border border-gray-900 rounded-lg bg-white text-sm"
          />
        </div>
        <button
          class="mt-6 block p-2 px-4 my-4 leading-6 text-white rounded-lg transition duration-200 ml-4"
          v-if="previous_result != 1 && previous_result != 2"
          :class="
            result != null
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-500 hover:bg-gray-600'
          "
          :disabled="result == null"
          @click="patchage_verification"
        >
          更新
        </button>
      </RightColumnOutline>
    </div>
  </div>
</template>

<script>
import SideVar from "@/components/SideVar.vue";
import api from "../api/api";
export default {
  data: function () {
    return {
      birthday: null,
      gender: null,
      name: "",
      user_id: null,
      personalPic: null,
      picShow: null,
      result: null,
      memo: null,
      previous_result: null,
    };
  },
  components: {
    SideVar,
  },
  mounted() {
    this.getage_verification();
    this.getage_verification_image();
  },
  computed: {},
  methods: {
    getage_verification: function () {
      api
        .getage_verification({ id: this.$route.params.id })
        .then((response) => {
          console.log(response);
          this.birthday = response.data.birthday;
          this.name = response.data.name;
          this.gender = response.data.gender;
          this.user_id = response.data.user_id;
          this.memo = response.data.memo;
          this.previous_result = response.data.status;
        })
        .catch(function (error) {
          this.$toast.show(
            "データの取得に失敗しました。システム管理者にお問合せください。",
            {
              type: "error",
              position: "top-right",
              duration: 5000,
            }
          );
          console.log(error);
        });
    },
    getage_verification_image: function () {
      api
        .getage_verification_image({ id: this.$route.params.id })
        .then((response) => {
          console.log(response);
          this.personalPic = "data:image/png;base64," + response.data;
        })
        .catch(function (error) {
          this.$toast.show(
            "データの取得に失敗しました。システム管理者にお問合せください。",
            { type: "error", position: "top-right", duration: 5000 }
          );
          console.log(error);
        });
    },
    patchage_verification: function () {
      api
        .patchage_verifications({
          id: this.$route.params.id,
          status: this.result,
          memo: this.memo,
        })
        .then((response) => {
          console.log(response);
          this.$toast.show("データの更新に成功しました。", {
            type: "success",
            position: "top-right",
            duration: 3000,
          });
          this.$router.replace("/kyc-list");
        })
        .catch(function (error) {
          this.$toast.show(
            "データの更新に失敗しました。システム管理者にお問合せください。",
            { type: "error", position: "top-right", duration: 5000 }
          );
          console.log(error);
        });
    },
  },
};
</script>
