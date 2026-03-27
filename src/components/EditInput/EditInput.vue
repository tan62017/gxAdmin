<template>
  <div class="edit-input">
    <div class="label">{{ label }}</div>
    <el-input
      v-model="input"
      style="width: 100%"
      size="large"
      placeholder="请输入"
      @change="inputVal"
      v-bind="$attrs"
    >
    </el-input>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emits = defineEmits("updata:modelValue");

const input = ref("");

const inputVal = () => {
  emits("updata:modelValue", input.value);
};

watch(
  () => props.modelValue,
  (val) => (input.value = val),
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.edit-input {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 28px;
  border-radius: 40px;
  border: 1px solid #3a3a3a;
  overflow: hidden;
  .label {
    display: flex;
    width: 240px;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    // text-align: right;
    padding-right: 12px;
    color: #fff;
    border-right: 1px solid #3a3a3a;
    background-color: #1954f5b9;
    // margin-bottom: 10px;
  }
  :deep(.el-input__wrapper) {
    background-color: rgba(106, 174, 241, 0.445);
    background-color: #ffffffb6;
    padding: 10px;
    // border-radius: 10px;
  }
  :deep(.el-input__inner) {
    font-size: 28px !important;
    // color: #f8f8fa;
    color: #000;
    &::placeholder {
      color: #868686;
    }
  }
}
:deep(.el-input.is-disabled) {
  .el-input__inner {
    -webkit-text-fill-color: #dddada;
  }
}
</style>
