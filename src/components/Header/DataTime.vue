<script setup>
import { useAppStore } from '@/stores'

const appStore = useAppStore()
</script>

<template>
  <div class="flex ic text-16px c-[var(--font-color)]!">
    数据时间：{{ appStore.currentYear }}年{{ appStore.currentMonth.replace(/^0/, '') }}月
  </div>
</template>
