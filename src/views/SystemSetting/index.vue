<script setup>
import { RouterView } from 'vue-router';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView class="flex-1" />
  </ElConfigProvider>
</template>

<style scoped lang="scss"></style>
