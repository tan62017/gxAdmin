<script setup>
import { RouterView } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
  <div class="app flex p20px">
    <Menu v-if="$route.meta.showMenu"></Menu>
    <div class="main flex-col flex-1 flex h100% ml20px overflow-hidden">
      <Navigation v-if="$route.meta.navigation"></Navigation>
      <RouterView class="flex-1" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  // background: url("@/assets/images/app-bg.png") no-repeat 0 0 / 100% 100%;
  background-color: rgb(206, 223, 243);
  overflow: hidden;

  :deep(.el-icon-industry) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/industry.png') no-repeat;
  }

  :deep(.el-icon-industryAc) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/industryActive.png') no-repeat;
  }

  :deep(.el-icon-project) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/project.png') no-repeat;
  }

  :deep(.el-icon-projectAc) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/projectActive.png') no-repeat;
  }
  :deep(.el-icon-important) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/important.png') no-repeat;
  }

  :deep(.el-icon-importantAc) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/importantActive.png') no-repeat;
  }
  :deep(.el-icon-business) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/business.png') no-repeat;
  }

  :deep(.el-icon-businessAc) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/businessActive.png') no-repeat;
  }
  :deep(.el-icon-state) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/state.png') no-repeat;
  }

  :deep(.el-icon-stateAc) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/stateActive.png') no-repeat;
  }
  :deep(.el-icon-number) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/number.png') no-repeat;
  }

  :deep(.el-icon-numberAc) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/numberActive.png') no-repeat;
  }
  :deep(.el-icon-ocean) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/ocean.png') no-repeat;
  }

  :deep(.el-icon-oceanAc) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/oceanActive.png') no-repeat;
  }
  :deep(.el-icon-meeting) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/meeting.png') no-repeat;
  }

  :deep(.el-icon-meetingAc) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/meetingActive.png') no-repeat;
  }
  :deep(.el-icon-data) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/data.png') no-repeat;
  }

  :deep(.el-icon-dataAc) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/dataActive.png') no-repeat;
  }
  :deep(.el-icon-report) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/report.png') no-repeat;
  }

  :deep(.el-icon-reportAc) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/reportActive.png') no-repeat;
  }
  :deep(.el-icon-analysis) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/analysis.png') no-repeat;
  }

  :deep(.el-icon-analysisAc) {
    width: 28px;
    height: 28px;
    background: url('@/assets/images/analysisActive.png') no-repeat;
  }
}
</style>
