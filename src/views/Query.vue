<template>
  <div class="query">
    <!-- side var  -->
    <SideVar />
    <!-- main div -->
    <RightColumnOutline>
      <PageTitle>本番データ取得</PageTitle>
      <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4 text-white">Qeury -> BigQuery</h1>
        <div class="mb-4">
          <textarea
            v-model="sqlQuery"
            class="w-full p-2 border rounded"
            rows="5"
            placeholder="Enter your SQL query here"
          ></textarea>
        </div>
        <DoButton :clickFunction="executeQueryPromise" :values="{}">
          クエリ実行
        </DoButton>

        <div v-if="errorMessage" class="mt-4 text-red-500">
          {{ errorMessage }}
        </div>

        <div v-if="queryResultShow" class="mt-12">
          <h1 class="text-2xl font-bold mb-4 text-white">Query Result</h1>
          <EasyDataTable :items="resultItems" :headers="resultHeaders">
          </EasyDataTable>
        </div>

        <div v-if="queryShow" class="mt-12">
          <h1 class="text-2xl font-bold mb-4 text-white">Query History</h1>
          <EasyDataTable
            :items="items"
            :headers="headers"
            :sortBy="'id'"
            :sortType="'desc'"
          >
            <template #item-actions="{ id, title, description }">
              <button
                @click="openEditModal(id, title, description)"
                class="text-blue-500"
              >
                Edit
              </button>
            </template>
          </EasyDataTable>
        </div>
      </div>

      <!-- Edit Modal -->
      <div
        v-if="showEditModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
      >
        <div class="bg-white p-8 rounded w-3/4 max-w-3xl">
          <h2 class="text-2xl mb-6">Edit Item</h2>
          <div class="mb-6">
            <label class="block mb-2 text-lg">Title</label>
            <input
              v-model="editItem.title"
              class="w-full p-3 border rounded"
              type="text"
            />
          </div>
          <div class="mb-6">
            <label class="block mb-2 text-lg">Description</label>
            <textarea
              v-model="editItem.description"
              class="w-full p-3 border rounded"
              rows="5"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              @click="showEditModal = false"
              class="mr-4 px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              @click="saveEdit"
              class="bg-blue-500 text-white px-6 py-3 rounded"
            >
              Save
            </button>
          </div>
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
      sqlQuery: "",
      errorMessage: "",
      results: [],
      columns: [],
      queries: [],
      queryShow: false,
      queryResultShow: false,
      resultItems: [],
      resultHeaders: [],
      headers: [
        { text: "Actions", value: "actions", sortable: false },
        { text: "title", value: "title", sortable: true },
        {
          text: "last_query_records",
          value: "last_query_records",
          sortable: true,
        },
        { text: "id", value: "id", sortable: true },
        { text: "SQL", value: "SQL", sortable: true },
        { text: "description", value: "description", sortable: true },
        { text: "created_at", value: "created_at", sortable: true },
      ],
      items: [],
      showEditModal: false,
      editItem: {},
    };
  },
  mounted() {
    api.getQueries().then((response) => {
      console.log(response);
      this.queries = response.data;
      this.items = this.queries;
      this.queryShow = true;
    });
  },
  computed: {},
  methods: {
    executeQueryPromise() {
      return new Promise((resolve) => {
        console.log("executing query...");
        api
          .postBigquery({ sql: this.sqlQuery })
          .then((response) => {
            console.log(response);
            this.queryResultShow = false; // 2回目以降のクエリ実行時にテーブルが表示されないようにする
            this.results = response.data.results;
            if (this.results.length > 0) {
              this.columns = Object.keys(this.results[0]).map((key) => ({
                label: key,
                field: key,
              }));
              this.resultItems = this.results;
              for (let i = 0; i < this.columns.length; i++) {
                this.resultHeaders.push({
                  text: this.columns[i].label,
                  value: this.columns[i].label,
                });
              }
              console.log(this.resultHeaders);
              console.log(this.resultItems);
              this.queryResultShow = true;
              let output =
                this.columns.map((col) => col.label).join(",") + "\n";
              for (let i = 0; i < this.results.length; i++) {
                for (let j = 0; j < this.columns.length; j++) {
                  output += this.results[i][this.columns[j].label] + ",";
                }
                output += "\n";
              }
              let csv = "\ufeff";
              csv += output;
              let blob = new Blob([csv], { type: "text/csv" });
              let link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = "itandi_prod_data.csv";
              link.click();

              api.getQueries().then((response) => {
                this.queries = response.data;
                this.items = this.queries;
                this.queryShow = true;
              });
            } else {
              this.columns = [];
            }
            this.errorMessage = "";
            resolve("resolved");
          })
          .catch((error) => {
            this.errorMessage = "Error executing query: " + error.message;
            this.results = [];
            this.columns = [];
            resolve("resolved");
          });
      });
    },
    downloadCSVPromise() {
      return new Promise((resolve) => {
        const headers = this.columns.map((col) => col.label).join(",");
        const rows = this.results
          .map((row) => this.columns.map((col) => row[col.field]).join(","))
          .join("\n");
        const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "results.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resolve("resolved");
      });
    },
    openEditModal(id, title, description) {
      this.editItem = { id: id, title: title, description: description };
      console.log(this.editItem);
      this.showEditModal = true;
    },
    saveEdit() {
      console.log(this.editItem);
      api
        .putQuery({
          id: this.editItem.id,
          title: this.editItem.title,
          description: this.editItem.description,
        })
        .then((response) => {
          console.log(response);
          this.showEditModal = false;
          this.updateItemInList(response.data);
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = "Error saving changes: " + error.message;
        });
    },
    updateItemInList(updatedItem) {
      const index = this.items.findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        this.items.splice(index, 1, updatedItem);
      }
    },
  },
};
</script>
