<script setup>
import { Search } from "@element-plus/icons-vue";

const props = defineProps({
  isClear: {
    type: Boolean,
    default: false,
  },
});
const input = ref("");
const emits = defineEmits(["search", "update:isClear"]);
const search = () => {
  emits("search", input.value);
};

watch(
  () => props.isClear,
  (val) => {
    if (val) {
      input.value = "";
      emits("update:isClear", false);
    }
  }
);
</script>

<template>
  <div class="search-input-box">
    <el-input
      v-model="input"
      style="width: 240px"
      size="large"
      clearable
      placeholder="请输入关键字"
      @keyup.enter="search"
      @clear="search"
    >
      <template #prefix>
        <div class="icon" @click="search">
          <el-icon :size="20">
            <Search />
          </el-icon>
        </div>
      </template>
    </el-input>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-input) {
  --el-border-radius-base: 20px;
  .el-input__wrapper {
    box-shadow: 0px 1px 5px #d0d0d0;
  }
  .icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
