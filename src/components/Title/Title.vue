<template>
  <div class="font-size-24px font-bold">{{ title }}</div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped></style>
