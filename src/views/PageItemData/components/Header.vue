<template>
  <div class="data-header">
    <div class="left">
      <div class="from-name">{{ route.query?.page }}</div>
      <div class="left-btn">
        <el-button type="primary" @click="addData">添加数据</el-button>
      </div>
    </div>
    <div class="right">
      <SearchInput></SearchInput>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
console.log(route.query.page);

const addData = () => {
  router.push({
    path: "supplemental-admission-item-add-data",
    query: {
      page: route.query.page,
    },
  });
};
</script>

<style lang="scss" scoped>
.data-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28px;
    .from-name {
      margin-right: 20px;
    }
    .el-button {
      padding: 20px 18px;
      font-size: 24px;
    }
  }
  .right {
    :deep(.el-input__wrapper) {
      --el-input-bg-color: rgba(251, 250, 250, 0.564);
      // --el-fill-color-blank: #fff;
    }
  }
}
</style>
