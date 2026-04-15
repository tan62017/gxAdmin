<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :before-close="handleClose"
    :top="top"
    style="max-height: 88%; overflow: hidden"
  >
    <slot class="h-full overflow-hidden"></slot>
    <template #header>
      <div class="dialog-title font-size-24px">{{ title }}</div>
    </template>
    <template #footer>
      <div class="dialog-footer" v-show="showBtns">
        <slot name="footer">
          <el-button type="primary" @click="dialogVisible = false">确认</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </slot>
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
  showBtns: {
    type: Boolean,
    default: true,
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
<style lang="scss">
.el-dialog {
  display: flex;
  flex-direction: column;
  .el-dialog__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
