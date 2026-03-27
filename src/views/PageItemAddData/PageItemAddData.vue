<template>
  <div class="page-add-data">
    <div class="page-name">{{ route.query?.page }}</div>
    <DataForm></DataForm>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import DataForm from "./components/DataForm.vue";
const route = useRoute();
</script>

<style lang="scss" scoped>
.page-add-data {
  padding: 30px 0;
}
.page-name {
  font-size: 24px;
}
</style>
