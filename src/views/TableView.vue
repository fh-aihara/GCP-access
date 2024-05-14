<template>
  <div class="campaign_analize">
    <!-- side var  -->
    <SideVar />
    <!-- main div -->
    <RightColumnOutline>
      <div
        class="absolute left-0 top-0 z-30 w-full h-full bg-opacity-50 bg-black flex justify-center items-center"
        v-if="deleteEventModal"
        @click="closeModal"
      >
        <div class="relative z-40 w-auto h-auto bg-white text-black rounded-lg">
          <div class="m-6">本当にイベントを削除しますか？</div>
          <button
            class="inline-block py-2 px-4 text-xs text-center font-semibold leading-normal rounded-lg transition duration-200 m-4"
            :class="
              !fixLoading
                ? 'text-red-50 bg-red-500 hover:bg-red-600'
                : 'text-red-50 bg-red-700 hover:bg-red-800'
            "
            :disabled="fixLoading"
            @click="cancelEvent"
          >
            <i class="pi pi-spin pi-spinner text-xs" v-if="fixLoading"></i>
            削除する
          </button>
          <button
            class="inline-block py-2 px-4 text-xs text-center font-semibold leading-normal text-blue-50 bg-gray-300 hover:bg-gray-400 rounded-lg transition duration-200 m-4"
            @click="closeModal"
          >
            キャンセル
          </button>
        </div>
      </div>
      <div
        class="absolute left-0 top-0 z-30 w-full h-full bg-opacity-50 bg-black flex justify-center items-center"
        v-if="deleteUserModal"
        @click="closeModal"
      >
        <div class="relative z-40 w-auto h-auto bg-white text-black rounded-lg">
          <div class="m-6">本当にユーザーを削除しますか？</div>
          <button
            class="inline-block py-2 px-4 text-xs text-center font-semibold leading-normal rounded-lg transition duration-200 m-4"
            :class="
              !fixLoading
                ? 'text-red-50 bg-red-500 hover:bg-red-600'
                : 'text-red-50 bg-red-700 hover:bg-red-800'
            "
            :disabled="fixLoading"
            @click="deleteUser"
          >
            <i class="pi pi-spin pi-spinner text-xs" v-if="fixLoading"></i>
            削除する
          </button>
          <button
            class="inline-block py-2 px-4 text-xs text-center font-semibold leading-normal text-blue-50 bg-gray-300 hover:bg-gray-400 rounded-lg transition duration-200 m-4"
            @click="closeModal"
          >
            キャンセル
          </button>
        </div>
      </div>
      <PageTitle>Table View</PageTitle>
      <div class="flex justify-between items-center">
        <div class="text-white text-left ml-4 text-sm">
          データベースの中身を参照・更新することができます。
        </div>
      </div>
      <div class="flex justify-left items-center py-5">
        <div class="text-white text-left ml-4 text-sm">操作対象テーブル：</div>
        <select v-model="selectedTable">
          <option
            v-for="table in optionTables"
            v-bind:value="table.name"
            v-bind:key="table.id"
          >
            {{ table.name }}
          </option>
        </select>
      </div>
      <div class="m-4" v-if="selectedTable">
        <div v-if="selectedTable == 'users'">
          <div class="text-left mb-3">
            <span class="text-white mr-6">search field:</span>
            <select class="p-1 text-xs" v-model="searchField">
              <option>user_id</option>
              <option>name</option>
            </select>
          </div>
          <div class="text-left mb-3">
            <span class="text-white mr-6">search value: </span>
            <input class="p-1 text-xs" type="text" v-model="searchValue" />
          </div>
        </div>
        <EasyDataTable
          :headers="headers"
          :items="items"
          :sort-by="sortBy"
          :sort-type="sortType"
          :search-field="searchField"
          :search-value="searchValue"
          multi-sort
        >
          <template #item-update="{ event_id, status, deleted_at }">
            <div v-if="status < 5 && deleted_at == NULL && authority == 0">
              <BackButton :clickFunction="preCancelEvent" :values="event_id"
                >Delete</BackButton
              >
            </div>
          </template>
          <template #item-delete_user="{ user_id, deleted_at }">
            <div v-if="deleted_at == NULL && authority == 0">
              <BackButton :clickFunction="preDeleteUser" :values="user_id"
                >Delete</BackButton
              >
            </div>
          </template>
        </EasyDataTable>
      </div>
    </RightColumnOutline>
  </div>
</template>

<script>
import api from "../api/api.js";
import { ref, onMounted } from "vue";

export default {
  name: "tableView",
  components: {},
  setup() {
    const headers = [
      { text: "update", value: "update" },
      { text: "event_id", value: "event_id", sortable: true },
      {
        text: "theme",
        value: "theme",
        sortable: true,
      },
      {
        text: "states",
        value: "states",
        sortable: true,
      },
      { text: "area", value: "area", sortable: true },
      { text: "start_at", value: "start_at", sortable: true },
      { text: "name", value: "name", sortable: true },
      { text: "status", value: "status", sortable: true },
      { text: "payment_ratio", value: "payment_ratio", sortable: true },
      {
        text: "male_estimated_payment",
        value: "male_estimated_payment",
        sortable: true,
      },
      {
        text: "female_estimated_payment",
        value: "female_estimated_payment",
        sortable: true,
      },
      {
        text: "message_from_owner",
        value: "message_from_owner",
        sortable: true,
      },
      { text: "owner_user_id", value: "owner_user_id", sortable: true },
      {
        text: "participants_pattern",
        value: "participants_pattern",
        sortable: true,
      },
      { text: "restaurant_url", value: "restaurant_url", sortable: true },
      {
        text: "male_participants_number",
        value: "male_participants_number",
        sortable: true,
      },
      {
        text: "female_participants_number",
        value: "female_participants_number",
        sortable: true,
      },
      { text: "deleted_at", value: "deleted_at", sortable: true },
      { text: "created_at", value: "created_at", sortable: true },
      { text: "updated_at", value: "updated_at", sortable: true },
    ];

    let items = ref([]);

    onMounted(() => {});
    return {
      headers,
      items,
    };
  },
  mounted() {
    this.getevents();
    this.show_flag = true;
  },
  watch: {
    selectedTable: {
      handler(newVal) {
        this.items = [];
        switch (newVal) {
          case "events":
            this.headers = [
              { text: "update", value: "update" },
              { text: "event_id", value: "event_id", sortable: true },
              { text: "theme", value: "theme", sortable: true },
              { text: "states", value: "states", sortable: true },
              { text: "area", value: "area", sortable: true },
              { text: "start_at", value: "start_at", sortable: true },
              { text: "name", value: "name", sortable: true },
              { text: "status", value: "status", sortable: true },
              { text: "payment_ratio", value: "payment_ratio", sortable: true },
              {
                text: "male_estimated_payment",
                value: "male_estimated_payment",
                sortable: true,
              },
              {
                text: "female_estimated_payment",
                value: "female_estimated_payment",
                sortable: true,
              },
              {
                text: "message_from_owner",
                value: "message_from_owner",
                sortable: true,
              },
              { text: "owner_user_id", value: "owner_user_id", sortable: true },
              {
                text: "participants_pattern",
                value: "participants_pattern",
                sortable: true,
              },
              {
                text: "restaurant_url",
                value: "restaurant_url",
                sortable: true,
              },
              {
                text: "male_participants_number",
                value: "male_participants_number",
                sortable: true,
              },
              {
                text: "female_participants_number",
                value: "female_participants_number",
                sortable: true,
              },
              { text: "deleted_at", value: "deleted_at", sortable: true },
              { text: "created_at", value: "created_at", sortable: true },
              { text: "updated_at", value: "updated_at", sortable: true },
            ];
            this.getevents();
            break;
          case "friends":
            this.headers = [
              { text: "from_user_id", value: "from_user_id", sortable: true },
              { text: "to_user_id", value: "to_user_id", sortable: true },
              { text: "deleted_at", value: "deleted_at", sortable: true },
              { text: "created_at", value: "created_at", sortable: true },
            ];
            this.getfriends();
            break;
          case "users":
            this.headers = [
              { text: "delete_user", value: "delete_user" },
              { text: "user_id", value: "user_id", sortable: true },
              { text: "name", value: "name", sortable: true },
              { text: "age", value: "age", sortable: true },
              { text: "gender", value: "gender", sortable: true },
              { text: "state", value: "state", sortable: true },
              { text: "phone_number", value: "phone_number", sortable: true },
              { text: "bio", value: "bio", sortable: true },
              {
                text: "authentication_token",
                value: "authentication_token",
                sortable: true,
              },
              {
                text: "firebase_token",
                value: "firebase_token",
                sortable: true,
              },
              { text: "device_uuid", value: "device_uuid", sortable: true },
              { text: "close_reason", value: "close_reason", sortable: true },
              { text: "invite_code", value: "invite_code", sortable: true },
              { text: "birthday", value: "birthday", sortable: true },
              { text: "blood_type", value: "blood_type", sortable: true },
              { text: "height", value: "height", sortable: true },
              {
                text: "educational_background",
                value: "educational_background",
                sortable: true,
              },
              { text: "working_type", value: "working_type", sortable: true },
              { text: "holiday", value: "holiday", sortable: true },
              { text: "drink_type", value: "drink_type", sortable: true },
              { text: "smoke_type", value: "smoke_type", sortable: true },
              { text: "top_message", value: "top_message", sortable: true },
              { text: "mail", value: "mail", sortable: true },
              { text: "workplace", value: "workplace", sortable: true },
              {
                text: "graduated_from",
                value: "graduated_from",
                sortable: true,
              },
              { text: "annual_income", value: "annual_income", sortable: true },
              {
                text: "mail_unsubscribed",
                value: "mail_unsubscribed",
                sortable: true,
              },
              { text: "referral_code", value: "referral_code", sortable: true },
              { text: "created_at", value: "created_at", sortable: true },
              { text: "updated_at", value: "updated_at", sortable: true },
              { text: "deleted_at", value: "deleted_at", sortable: true },
            ];
            this.getusers();
            break;
          case "age_verifications":
            this.headers = [
              {
                text: "verification_id",
                value: "verification_id",
                sortable: true,
              },
              { text: "user_id", value: "user_id", sortable: true },
              { text: "image_url", value: "image_url", sortable: true },
              { text: "status", value: "status", sortable: true },
              { text: "memo", value: "memo", sortable: true },
              { text: "updated_by", value: "update_by", sortable: true },
              { text: "updated_at", value: "updated_at", sortable: true },
              { text: "created_at", value: "created_at", sortable: true },
            ];
            this.getage_verifications();
            break;
          case "user_photos":
            this.headers = [
              { text: "photo_id", value: "photo_id", sortable: true },
              { text: "user_id", value: "user_id", sortable: true },
              { text: "image_url", value: "image_url", sortable: true },
              { text: "is_main", value: "is_main", sortable: true },
              { text: "deleted_at", value: "deleted_at", sortable: true },
              { text: "updated_at", value: "updated_at", sortable: true },
              { text: "created_at", value: "created_at", sortable: true },
            ];
            this.getuser_photos();
            break;
          case "chat_rooms":
            this.headers = [
              { text: "room_id", value: "room_id", sortable: true },
              { text: "name", value: "name", sortable: true },
              { text: "event_id", value: "event_id", sortable: true },
              { text: "deleted_at", value: "deleted_at", sortable: true },
              { text: "updated_at", value: "updated_at", sortable: true },
              { text: "created_at", value: "created_at", sortable: true },
            ];
            this.getchat_rooms();
            break;
          case "chat_room_user":
            this.headers = [
              { text: "room_id", value: "room_id", sortable: true },
              { text: "user_id", value: "user_id", sortable: true },
              { text: "deleted_at", value: "deleted_at", sortable: true },
              { text: "created_at", value: "created_at", sortable: true },
            ];
            this.getchat_room_user();
            break;
          case "messages":
            this.headers = [
              { text: "message_id", value: "message_id", sortable: true },
              { text: "text", value: "text", sortable: true },
              { text: "user_id", value: "user_id", sortable: true },
              { text: "room_id", value: "room_id", sortable: true },
              { text: "deleted_at", value: "deleted_at", sortable: true },
              { text: "created_at", value: "created_at", sortable: true },
              { text: "updated_at", value: "updated_at", sortable: true },
            ];
            this.getmessages();
            break;
          case "theme":
            this.headers = [
              { text: "id", value: "id", sortable: true },
              { text: "name", value: "name", sortable: true },
              { text: "image_url", value: "image_url", sortable: true },
              { text: "priority", value: "priority", sortable: true },
              { text: "deleted_at", value: "deleted_at", sortable: true },
              { text: "created_at", value: "created_at", sortable: true },
              { text: "updated_at", value: "updated_at", sortable: true },
            ];
            this.gettheme();
            break;
          case "participants":
            this.headers = [
              {
                text: "participants_id",
                value: "participants_id",
                sortable: true,
              },
              { text: "event_id", value: "event_id", sortable: true },
              { text: "user_id", value: "user_id", sortable: true },
              {
                text: "status",
                value: "status",
                sortable: true,
              },
              { text: "group_id", value: "group_id", sortable: true },
              { text: "created_at", value: "created_at", sortable: true },
              { text: "updated_at", value: "updated_at", sortable: true },
            ];
            this.getparticipants();
            break;
          case "user_opinions":
            this.headers = [
              { text: "opinion_id", value: "opinion_id", sortable: true },
              { text: "opinion_type", value: "opinion_type", sortable: true },
              {
                text: "return_address",
                value: "return_address",
                sortable: true,
              },
              {
                text: "function_name",
                value: "function_name",
                sortable: true,
              },
              { text: "user_id", value: "user_id", sortable: true },
              { text: "content", value: "content", sortable: true },
              { text: "created_at", value: "created_at", sortable: true },
              { text: "updated_at", value: "updated_at", sortable: true },
            ];
            this.getuser_opinions();
            break;
          case "blocks":
            this.headers = [
              { text: "from_user_id", value: "from_user_id", sortable: true },
              { text: "to_user_id", value: "to_user_id", sortable: true },
              { text: "created_at", value: "created_at", sortable: true },
            ];
            this.getblocks();
            break;
          case "areas":
            this.headers = [
              { text: "area_id", value: "area_id", sortable: true },
              { text: "states", value: "states", sortable: true },
              { text: "name", value: "name", sortable: true },
              { text: "priority", value: "priority", sortable: true },
              { text: "deleted_at", value: "deleted_at", sortable: true },
              { text: "created_at", value: "created_at", sortable: true },
              { text: "updated_at", value: "updated_at", sortable: true },
            ];
            this.getareas();
            break;
        }
        // this.dailycountSeries = [];
        // this.getDiscordSummary();
      },
      deep: true,
    },
  },
  data() {
    return {
      show_flag: false,
      isLoading: false,
      selectedTable: "events",
      optionTables: [
        { id: 1, name: "events" },
        { id: 2, name: "users" },
        { id: 3, name: "age_verifications" },
        { id: 4, name: "user_photos" },
        { id: 5, name: "chat_rooms" },
        { id: 6, name: "chat_room_user" },
        { id: 7, name: "friends" },
        { id: 8, name: "messages" },
        { id: 9, name: "areas" },
        { id: 10, name: "theme" },
        { id: 11, name: "participants" },
        { id: 12, name: "user_opinions" },
        { id: 13, name: "blocks" },
      ],
      // eventsを対象にソートを記載している
      sortBy: ["status", "deleted_at", "start_at"],
      sortType: ["asc", "asc", "asc"],
      searchField: "",
      searchValue: "",
      deleteEventModal: false,
      deleteTragetEventId: null,
      deleteUserModal: false,
      deleteTragetUserId: null,
    };
  },
  computed: {
    authority: function () {
      return this.$store.getters["authority"];
    },
  },
  methods: {
    getusers() {
      api
        .getusers()
        .then((response) => {
          this.items = [];
          for (let i = 0; i < response["data"].length; i++) {
            this.items.push({
              user_id: response["data"][i]["user_id"],
              name: response["data"][i]["name"],
              age: response["data"][i]["age"],
              gender: response["data"][i]["gender"],
              state: response["data"][i]["state"],
              phone_number: response["data"][i]["phone_number"],
              bio: response["data"][i]["bio"],
              authentication_token: response["data"][i]["authentication_token"],
              firebase_token: response["data"][i]["firebase_token"],
              device_uuid: response["data"][i]["device_uuid"],
              close_reason: response["data"][i]["close_reason"],
              invite_code: response["data"][i]["invite_code"],
              birthday: response["data"][i]["birthday"],
              blood_type: response["data"][i]["blood_type"],
              height: response["data"][i]["height"],
              educational_background:
                response["data"][i]["educational_background"],
              working_type: response["data"][i]["working_type"],
              holiday: response["data"][i]["holiday"],
              drink_type: response["data"][i]["drink_type"],
              smoke_type: response["data"][i]["smoke_type"],
              top_message: response["data"][i]["top_message"],
              mail: response["data"][i]["mail"],
              workplace: response["data"][i]["workplace"],
              graduated_from: response["data"][i]["graduated_from"],
              annual_income: response["data"][i]["annual_income"],
              mail_unsubscribed: response["data"][i]["mail_unsubscribed"],
              referral_code: response["data"][i]["referral_code"],
              created_at: response["data"][i]["created_at"],
              updated_at: response["data"][i]["updated_at"],
              deleted_at: response["data"][i]["deleted_at"],
            });
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
    getevents() {
      api
        .getevents()
        .then((response) => {
          this.items = [];
          for (let i = 0; i < response["data"].length; i++) {
            this.items.push({
              event_id: response["data"][i]["event_id"],
              theme: response["data"][i]["theme"],
              states: response["data"][i]["states"],
              area: response["data"][i]["area"],
              start_at: response["data"][i]["start_at"],
              name: response["data"][i]["name"],
              status: response["data"][i]["status"],
              payment_ratio: response["data"][i]["payment_ratio"],
              male_estimated_payment:
                response["data"][i]["male_estimated_payment"],
              female_estimated_payment:
                response["data"][i]["female_estimated_payment"],
              message_from_owner: response["data"][i]["message_from_owner"],
              owner_user_id: response["data"][i]["owner_user_id"],
              participants_pattern: response["data"][i]["participants_pattern"],
              restaurant_url: response["data"][i]["restaurant_url"],
              male_participants_number:
                response["data"][i]["male_participants_number"],
              female_participants_number:
                response["data"][i]["female_participants_number"],
              deleted_at: response["data"][i]["deleted_at"],
              created_at: response["data"][i]["created_at"],
              updated_at: response["data"][i]["updated_at"],
            });
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
    getage_verifications() {
      api
        .getage_verifications()
        .then((response) => {
          for (let i = 0; i < response["data"].length; i++) {
            this.items.push({
              verification_id: response["data"][i]["verification_id"],
              user_id: response["data"][i]["user_id"],
              image_url: response["data"][i]["image_url"],
              status: response["data"][i]["status"],
              memo: response["data"][i]["memo"],
              update_by: response["data"][i]["update_by"],
              updated_at: response["data"][i]["updated_at"],
              created_at: response["data"][i]["created_at"],
            });
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
    getuser_photos() {
      api
        .getuser_photos()
        .then((response) => {
          for (let i = 0; i < response["data"].length; i++) {
            this.items.push({
              photo_id: response["data"][i]["photo_id"],
              user_id: response["data"][i]["user_id"],
              image_url: response["data"][i]["image_url"],
              is_main: response["data"][i]["is_main"],
              deleted_at: response["data"][i]["deleted_at"],
              updated_at: response["data"][i]["updated_at"],
              created_at: response["data"][i]["created_at"],
            });
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
    getchat_rooms() {
      api
        .getchat_rooms()
        .then((response) => {
          for (let i = 0; i < response["data"].length; i++) {
            this.items.push({
              room_id: response["data"][i]["room_id"],
              name: response["data"][i]["name"],
              event_id: response["data"][i]["event_id"],
              deleted_at: response["data"][i]["deleted_at"],
              updated_at: response["data"][i]["updated_at"],
              created_at: response["data"][i]["created_at"],
            });
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
    getchat_room_user() {
      api
        .getchat_room_user()
        .then((response) => {
          for (let i = 0; i < response["data"].length; i++) {
            this.items.push({
              room_id: response["data"][i]["room_id"],
              user_id: response["data"][i]["user_id"],
              deleted_at: response["data"][i]["deleted_at"],
              created_at: response["data"][i]["created_at"],
            });
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
    getfriends() {
      api
        .getfriends()
        .then((response) => {
          for (let i = 0; i < response["data"].length; i++) {
            this.items.push({
              from_user_id: response["data"][i]["from_user_id"],
              to_user_id: response["data"][i]["to_user_id"],
              deleted_at: response["data"][i]["deleted_at"],
              created_at: response["data"][i]["created_at"],
            });
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
    getmessages() {
      api
        .getmessages()
        .then((response) => {
          for (let i = 0; i < response["data"].length; i++) {
            this.items.push({
              message_id: response["data"][i]["message_id"],
              text: response["data"][i]["text"],
              user_id: response["data"][i]["user_id"],
              room_id: response["data"][i]["room_id"],
              deleted_at: response["data"][i]["deleted_at"],
              updated_at: response["data"][i]["updated_at"],
              created_at: response["data"][i]["created_at"],
            });
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
    getareas() {
      api
        .getareas()
        .then((response) => {
          for (let i = 0; i < response["data"].length; i++) {
            this.items.push({
              area_id: response["data"][i]["area_id"],
              states: response["data"][i]["states"],
              name: response["data"][i]["name"],
              priority: response["data"][i]["priority"],
              deleted_at: response["data"][i]["deleted_at"],
              updated_at: response["data"][i]["updated_at"],
              created_at: response["data"][i]["created_at"],
            });
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
    gettheme() {
      api
        .gettheme()
        .then((response) => {
          for (let i = 0; i < response["data"].length; i++) {
            this.items.push({
              id: response["data"][i]["id"],
              name: response["data"][i]["name"],
              image_url: response["data"][i]["image_url"],
              priority: response["data"][i]["priority"],
              deleted_at: response["data"][i]["deleted_at"],
              updated_at: response["data"][i]["updated_at"],
              created_at: response["data"][i]["created_at"],
            });
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
    getparticipants() {
      api
        .getparticipants()
        .then((response) => {
          for (let i = 0; i < response["data"].length; i++) {
            this.items.push({
              participants_id: response["data"][i]["participants_id"],
              event_id: response["data"][i]["event_id"],
              status: response["data"][i]["status"],
              group_id: response["data"][i]["group_id"],
              updated_at: response["data"][i]["updated_at"],
              created_at: response["data"][i]["created_at"],
            });
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
    getuser_opinions() {
      api
        .getuser_opinions()
        .then((response) => {
          for (let i = 0; i < response["data"].length; i++) {
            this.items.push({
              opinion_id: response["data"][i]["opinion_id"],
              opinion_type: response["data"][i]["opinion_type"],
              return_address: response["data"][i]["return_address"],
              function_name: response["data"][i]["function_name"],
              user_id: response["data"][i]["user_id"],
              content: response["data"][i]["content"],
              updated_at: response["data"][i]["updated_at"],
              created_at: response["data"][i]["created_at"],
            });
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
    getblocks() {
      api
        .getblocks()
        .then((response) => {
          for (let i = 0; i < response["data"].length; i++) {
            this.items.push({
              from_user_id: response["data"][i]["from_user_id"],
              to_user_id: response["data"][i]["to_user_id"],
              created_at: response["data"][i]["created_at"],
            });
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
    preCancelEvent(event_id) {
      return new Promise((resolve) => {
        this.deleteTragetEventId = event_id;
        this.deleteEventModal = true;
        resolve("resolved");
      });
    },
    cancelEvent() {
      return new Promise((resolve) => {
        api
          .deleteEvent({ event_id: this.deleteTragetEventId })
          .then(() => {
            this.$toast.show("データの更新に成功しました", {
              type: "success",
              position: "top-right",
              duration: 3000,
            });
            this.getevents();
            resolve("resolved");
          })
          .catch(() => {
            this.$toast.show("データの更新に失敗しました", {
              type: "error",
              position: "top-right",
              duration: 5000,
            });
            resolve("resolved");
          });
      });
    },
    preDeleteUser(user_id) {
      return new Promise((resolve) => {
        this.deleteTragetUserId = user_id;
        this.deleteUserModal = true;
        resolve("resolved");
      });
    },
    deleteUser() {
      return new Promise((resolve) => {
        api
          .deleteUsers({
            user_id: this.deleteTragetUserId,
          })
          .then(() => {
            this.$toast.show("データの更新に成功しました", {
              type: "success",
              position: "top-right",
              duration: 3000,
            });
            this.getusers();
            resolve("resolved");
          })
          .catch(() => {
            this.$toast.show("データの更新に失敗しました", {
              type: "error",
              position: "top-right",
              duration: 5000,
            });
            resolve("resolved");
          });
      });
    },
    closeModal() {
      this.deleteEventModal = false;
      this.deleteUserModal = false;
    },
  },
};
</script>
