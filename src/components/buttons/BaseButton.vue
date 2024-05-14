<template>
  <button
    class="px-4 rounded-lg h-10 text-xs text-center inline-block"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  emits: {
    click: null,
  },
  setup(_, { emit }) {
    const handleClick = () => {
      emit("click");
    };

    return {
      handleClick,
    };
  },
};
</script>
