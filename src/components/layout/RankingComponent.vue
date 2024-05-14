<template>
  <div :class="panelClass" class="h-94 pl-4 mr-4 py-4 bg-gray-400 rounded-lg">
    <div v-for="(row, index) in ranking" v-bind:key="row[0]">
      <div class="text-white w-full py-2">
        {{ index + 1 }}位 {{ row[0] }} {{ row[1] }}回
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "DoButton",
  components: {},
  props: {
    ranking: {
      type: Array,
      default: null,
    },
    panelClass: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    let ranking_in = ref();
    let panelClass_in = ref();
    ranking_in = ref(props.ranking);
    panelClass_in = ref(props.panelClass);
    return {
      ranking_in,
      panelClass_in,
    };
  },
};
</script>
