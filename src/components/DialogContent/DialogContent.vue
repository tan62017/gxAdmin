<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :before-close="handleClose"
    :top="top"
  >
    <slot></slot>
    <template #title>
      <div class="dialog-title font-size-24px">{{ title }}</div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  top: {
    type: String,
    default: '15vh',
  },
  width: {
    type: String,
    default: '50%',
  },
});
const dialogVisible = defineModel('modelValue');

const handleClose = (done) => {
  ElMessageBox.confirm('请确认关闭?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style lang="scss" scoped>
.dialog-title {
}
</style>
