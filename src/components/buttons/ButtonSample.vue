<template>
  <div>
    <p class="mb-2 text-2xl">Buttons</p>
    <div class="mb-2">
      <PrimaryButton @click="handleClick">Primary</PrimaryButton>
    </div>
    <div class="mb-2">
      <PrimaryButton :disabled="true" @click="handleClick"
        >Primary</PrimaryButton
      >
    </div>
    <div class="mb-2">
      <SecondButton :disabled="true" @click="handleClick"
        >SecondButton</SecondButton
      >
    </div>
  </div>
</template>

<script>
import PrimaryButton from "./DoButton.vue";
import SecondButton from "./SecondButton.vue";

export default {
  name: "ButtonSample",
  components: {
    PrimaryButton,
    SecondButton,
  },
  emits: ["click"],
  setup() {
    const handleClick = () => {
      alert("clicked");
    };

    return {
      handleClick,
    };
  },
};
</script>
