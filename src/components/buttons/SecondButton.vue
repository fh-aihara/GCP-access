<template>
  <BaseButton :disabled="disabled" :class="buttonClass" @click="handleClick">
    <slot />
  </BaseButton>
</template>

<script>
import { computed } from "vue";
import BaseButton from "./BaseButton.vue";

export default {
  name: "SecondButton",
  components: {
    BaseButton,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    click: null,
  },
  setup(props, { emit }) {
    const handleClick = () => {
      emit("click");
    };

    const buttonClass = computed(() =>
      props.disabled ? "text-gray-400 bg-gray-100" : "text-gray-900 bg-gray-200"
    );

    return {
      handleClick,
      buttonClass,
    };
  },
};
</script>
