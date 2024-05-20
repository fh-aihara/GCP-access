<template>
  <div class="campaign_analize">
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
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          クエリ実行
        </button>

        <div v-if="errorMessage" class="mt-4 text-red-500">
          {{ errorMessage }}
        </div>

        <div v-if="results.length" class="mt-4">
          <easy-data-table :data="results" :columns="columns"></easy-data-table>
          <button
            class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download CSV
          </button>
        </div>
      </div>
    </RightColumnOutline>
  </div>
</template>

<script>
import api from "../api/api.js";
// import axios from "axios";

export default {
  name: "tableView",
  components: {},
  data() {
    return {
      sqlQuery: "",
      errorMessage: "",
      results: [],
      columns: [],
    };
  },
  mounted() {},
  computed: {},
  methods: {
    async executeQuery() {
      api
        .postBigquery({ SQL: this.sqlQuery })
        .then((response) => {
          this.results = response.data;
          if (this.results.length > 0) {
            this.columns = Object.keys(this.results[0]).map((key) => ({
              label: key,
              field: key,
            }));
          } else {
            this.columns = [];
          }
          this.errorMessage = "";
        })
        .catch((error) => {
          this.errorMessage = "Error executing query: " + error.message;
          this.results = [];
          this.columns = [];
        });
    },
  },
  downloadCSV() {
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
  },
};
</script>
