<template>
  <el-upload
    action="#"
    v-model:file-list="item.form.file"
    :auto-upload="false"
    :limit="1"
    :on-change="fileVadit"
    v-bind="$attrs"
  >
    <slot>
      <el-button type="primary" size="large">上传文件</el-button>
    </slot>
    <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </el-upload>
</template>
<script setup>

const fileList=defineModel('modelValue')
onMounted(() => {});
</script>
<style lang="scss" scoped></style>
