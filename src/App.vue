<script setup>
import { RouterView } from 'vue-router';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <!-- <RouterView  /> -->
    <router-view v-slot="{ Component, route }" class="flex-1">
      <!-- 如果路由被标记为需要缓存，则用 keep-alive 包裹 -->
      <keep-alive>
        <component :is="Component" v-if="route.meta.keepAlive" :key="route.name" />
      </keep-alive>
      <!-- 如果不需要缓存，则直接渲染 -->
      <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name" />
    </router-view>
  </ElConfigProvider>
</template>

<style scoped lang="scss"></style>
