<template>
  <router-view v-slot="{ Component, route }" class="flex-1" v-if="currentSelectPwoer">
    <!-- 如果路由被标记为需要缓存，则用 keep-alive 包裹 -->
    <keep-alive>
      <component :is="Component" v-if="route.meta.keepAlive" :key="route.name" />
    </keep-alive>
    <!-- 如果不需要缓存，则直接渲染 -->
    <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name" />
  </router-view>

  <NoPwoer text="暂无查看权限" v-else />
</template>

<script setup>
const route = useRoute();
const currentSelectPwoer = computed(() => true);
</script>
