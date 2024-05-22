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
        <DoButton :clickFunction="executeQueryPromise" :values="{}">
          クエリ実行
        </DoButton>

        <div v-if="errorMessage" class="mt-4 text-red-500">
          {{ errorMessage }}
        </div>

        <div v-if="chartShow" class="mt-4">
          <EasyDataTable :items="results" :headers="columns"></EasyDataTable>
          <DoButton :clickFunction="downloadCSVPromise" :values="{}">
            Download CSV
          </DoButton>
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
      chartShow: false,
    };
  },
  mounted() {},
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
              this.chartShow = true;
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
  },
};
</script>
