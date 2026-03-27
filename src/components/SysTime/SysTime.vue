<script setup>
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const currentTime = computed({
  get: () => appStore.currentTime,
  set: val => appStore.updateCurrentTime(val)
})
</script>

<template>
  <div>
    <el-date-picker
      v-model="currentTime"
      popper-class="sys-time-picker"
      format="YYYY年MM月"
      value-format="YYYYMM"
      type="month"
      :clearable="false"
      placeholder="请选择时间"
    />
  </div>
</template>

<style lang="scss"></style>
