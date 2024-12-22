<template>
  <div class="query">
    <!-- side var  -->
    <SideVar />
    <!-- main div -->
    <RightColumnOutline>
      <PageTitle>帳票ダウンロード</PageTitle>
      <div class="container mx-auto p-4">
        <!-- 出納帳セクション -->
        <div class="mb-12 border-b pb-8">
          <h2 class="text-xl font-bold mb-6 text-white">出納帳</h2>

          <!-- 期間選択 -->
          <div class="mb-6">
            <label class="block mb-2 text-lg text-white">期間</label>
            <div class="flex gap-4 items-center">
              <input
                class="p-2 border rounded w-1/4"
                type="date"
                v-model="suitotyo.start_date"
              />
              <span class="text-white">〜</span>
              <input
                class="p-2 border rounded w-1/4"
                type="date"
                v-model="suitotyo.end_date"
              />
            </div>
          </div>

          <!-- 口座選択 -->
          <div class="mb-6">
            <label class="block mb-2 text-lg text-white">口座</label>
            <select class="w-1/3 p-2 border rounded" v-model="suitotyo.account">
              <option
                v-for="account in accountList"
                :key="account"
                :value="account"
              >
                {{ account }}
              </option>
            </select>
          </div>

          <!-- ダウンロードボタン -->
          <DoButton
            class="bg-blue-500 text-white px-6 py-3 rounded"
            :clickFunction="getSuitotyoPromise"
            :values="{}"
          >
            出納帳ダウンロード
          </DoButton>
        </div>

        <!-- 保証会社未マッチリストセクション -->
        <div>
          <h2 class="text-xl font-bold mb-6 text-white">
            保証会社未マッチリスト
          </h2>

          <!-- 期間選択 -->
          <div class="mb-6">
            <label class="block mb-2 text-lg text-white">期間</label>
            <div class="flex gap-4 items-center">
              <input
                class="p-2 border rounded w-1/4"
                type="date"
                v-model="hosyoKaisya.start_date"
              />
              <span class="text-white">〜</span>
              <input
                class="p-2 border rounded w-1/4"
                type="date"
                v-model="hosyoKaisya.end_date"
              />
            </div>
          </div>

          <!-- ダウンロードボタン -->
          <DoButton
            class="bg-blue-500 text-white px-6 py-3 rounded"
            :clickFunction="getHosyoKaisyaPromise"
            :values="{}"
          >
            未マッチリストダウンロード
          </DoButton>
        </div>
      </div>
    </RightColumnOutline>
  </div>
</template>

<script>
import api from "../api/api.js";

export default {
  name: "ReportDownload",
  data() {
    return {
      accountList: [
        "YF JRE B口",
        "みずほ融資案件",
        "第三グレイス口",
        "第二グレイス口",
        "リブリ・プロパティ",
        "グレイスレジ口",
        "企画2(契約口)",
        "企画1(家賃口)",
        "既存物件口座",
        "りそな(家賃口)",
        "リブリレジ口",
      ],
      suitotyo: {
        start_date: "",
        end_date: "",
        account: "りそな(家賃口)",
      },
      hosyoKaisya: {
        start_date: "",
        end_date: "",
      },
    };
  },
  mounted() {
    // 前月の初日と末日を取得
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    );

    // 日付をYYYY-MM-DD形式に変換
    this.suitotyo.start_date = lastMonth.toISOString().split("T")[0];
    this.suitotyo.end_date = lastDayOfLastMonth.toISOString().split("T")[0];
    this.hosyoKaisya.start_date = lastMonth.toISOString().split("T")[0];
    this.hosyoKaisya.end_date = lastDayOfLastMonth.toISOString().split("T")[0];
  },
  methods: {
    getSuitotyoPromise() {
      return new Promise((resolve) => {
        api
          .getSuitotyo(this.suitotyo)
          .then((response) => {
            // CSVとしてダウンロード
            const csvData = this.convertToCSV(response.data.results);
            const blob = new Blob([csvData], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            const filename = `suitotyo_${this.suitotyo.start_date}_${this.suitotyo.end_date}.csv`;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            resolve("resolved");
          })
          .catch((error) => {
            console.error(error);
            resolve("resolved");
          });
      });
    },
    getHosyoKaisyaPromise() {
      return new Promise((resolve) => {
        api
          .getHosyoKaisyaUnmatch(this.hosyoKaisya)
          .then((response) => {
            // CSVとしてダウンロード
            const csvData = this.convertToCSV(response.data.results);
            const blob = new Blob([csvData], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            const filename = `hosyo_kaisya_unmatch_${this.hosyoKaisya.start_date}_${this.hosyoKaisya.end_date}.csv`;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            resolve("resolved");
          })
          .catch((error) => {
            console.error(error);
            resolve("resolved");
          });
      });
    },
    convertToCSV(data) {
      if (!data || data.length === 0) return "";

      const headers = Object.keys(data[0]);
      const csvRows = [];

      // ヘッダー行を追加
      csvRows.push(headers.join(","));

      // データ行を追加
      for (const row of data) {
        const values = headers.map((header) => {
          const value = row[header] || "";
          return typeof value === "string" ? `"${value}"` : value;
        });
        csvRows.push(values.join(","));
      }

      return csvRows.join("\n");
    },
  },
};
</script>
