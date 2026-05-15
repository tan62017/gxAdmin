<script setup>
import { RouterView } from 'vue-router';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

onUnmounted(() => {
  window.removeEventListener('resize', () => {});
  window.removeEventListener('unauthorized', () => {});
});
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped lang="scss"></style>
