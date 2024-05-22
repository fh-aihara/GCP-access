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

        <div v-if="queryShow" class="mt-8">
          <h1 class="text-2xl font-bold mb-4 text-white">Query History</h1>
          <EasyDataTable :items="items" :headers="headers">
            <template v-slot:actions="{ item }">
              <button @click="openEditModal(item)" class="text-blue-500">
                Edit
              </button>
            </template>
          </EasyDataTable>
          <!-- <DoButton :clickFunction="downloadCSVPromise" :values="{}">
            Download CSV
          </DoButton> -->
        </div>
      </div>

      <!-- Edit Modal -->
      <div
        v-if="showEditModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      >
        <div class="bg-white p-4 rounded">
          <h2 class="text-xl mb-4">Edit Item</h2>
          <div class="mb-4">
            <label class="block mb-2">Title</label>
            <input
              v-model="editItem.title"
              class="w-full p-2 border rounded"
              type="text"
            />
          </div>
          <div class="mb-4">
            <label class="block mb-2">Description</label>
            <input
              v-model="editItem.description"
              class="w-full p-2 border rounded"
              type="text"
            />
          </div>
          <div class="flex justify-end">
            <button @click="showEditModal = false" class="mr-4">Cancel</button>
            <button
              @click="saveEdit"
              class="bg-blue-500 text-white px-4 py-2 rounded"
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
      headers: [
        { text: "id", value: "id", sortable: true },
        { text: "SQL", value: "SQL", sortable: true },
        { text: "created_at", value: "created_at", sortable: true },
        { text: "title", value: "title", sortable: true },
        { text: "description", value: "description", sortable: true },
        {
          text: "last_query_records",
          value: "last_query_records",
          sortable: true,
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [],
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
            this.results = response.data.results;
            if (this.results.length > 0) {
              this.columns = Object.keys(this.results[0]).map((key) => ({
                label: key,
                field: key,
              }));
              let output =
                this.columns.map((col) => col.label).join(",") + "\n";
              console.log(this.results.length);
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
    openEditModal(item) {
      this.editItem = { ...item };
      this.showEditModal = true;
    },
    saveEdit() {
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
