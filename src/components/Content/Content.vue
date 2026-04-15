<template>
  <div
    class="content-contrain w-100% h-100% flex flex-col overflow-hidden mt-20px p-20px border-rd-8px bg-[#fff]"
  >
    <Title class="mb-20px" :title="title" v-if="title"></Title>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.title {
}
</style>
