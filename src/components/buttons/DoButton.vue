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
  name: "DoButton",
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
      await props.clickFunction(props.values);
      isLoading.value = false;
      emit("click");
    };
    const buttonClass = computed(() =>
      props.disabled || isLoading.value
        ? "text-white bg-gray-700 hover:bg-gray-800"
        : "text-white bg-green-500 hover:bg-green-600"
    );

    return {
      handleClick,
      buttonClass,
      isLoading,
    };
  },
};
</script>
