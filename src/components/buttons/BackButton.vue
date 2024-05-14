<template>
  <BaseButton
    :disabled="disabled || isLoading"
    :class="buttonClass"
    @click="handleClick"
  >
    <i class="pi pi-spin pi-spinner text-xs px-1" v-if="isLoading" /><slot />
  </BaseButton>
</template>

<script>
import { computed, ref } from "vue";
import BaseButton from "./BaseButton.vue";

export default {
  name: "BackButton",
  components: {
    BaseButton,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    clickFunction: {
      type: Function,
    },
    values: {
      type: Object,
      default: null,
    },
  },
  emits: {
    click: null,
  },
  setup(props, { emit }) {
    let isLoading = ref(false);

    const handleClick = async function () {
      isLoading.value = true;
      console.log(props);
      await props.clickFunction(props.values);
      isLoading.value = false;
      emit("click");
    };
    const buttonClass = computed(() =>
      props.disabled || isLoading.value
        ? "text-blue-50 bg-red-700 hover:bg-red-800"
        : "text-blue-50 bg-red-500 hover:bg-red-600"
    );

    return {
      handleClick,
      buttonClass,
      isLoading,
    };
  },
};
</script>
