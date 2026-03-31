<template>
  <div class="big-vis-admin-contrain w-full h-full overflow-hidden flex flex-col">
    <div class="nav-box w-full mb16px flex justify-between items-center">
      <div class="nav-box-title font-size-21px font-bold">大屏系统管理</div>
      <div class="nav-box-btns">
        <el-button type="primary">添加大屏</el-button>
        <el-button type="warning">批量删除</el-button>
      </div>
    </div>
    <div class="big-vis-list flex-1 overflow-auto">
      <div
        class="big-vis-item flex h-300px p-20px mx16px my12px border-rd-8px"
        v-for="item in navList[0].list"
        :key="item.label"
      >
        <div class="img w360px h250px border-rd-8px overflow-hidden">
          <img style="width: 100%; height: 100%" :src="item.icon" alt="" srcset="" />
        </div>
        <div class="item-content flex-1 h-full pl-20px py-12px flex flex-col justify-between">
          <div class="item-content-msg">
            <div class="item-content-msg-title font-size-20px font-bold mb-18px">
              {{ item.label }}
            </div>
            <div class="item-content-msg-content">简介：{{ item.content || '--' }}</div>
          </div>
          <div class="item-content-btns">
            <el-button plain type="primary">编辑</el-button>
            <el-button plain type="warning">删除</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { navList } from '@/config';
</script>

<style lang="scss" scoped>
.big-vis-list {
  display: grid;
  grid-template-columns: 50% 50%;
  // grid-template-rows: 300px 300px 300px;
  grid-auto-flow: row;
  //   gap: 20px;
  //   overflow: hidden;
  .big-vis-item {
    align-items: center;
    box-shadow: 0px 1px 5px rgba(161, 161, 161, 0.516);
    &:hover {
      //   padding: 12px;
      box-shadow: 0px 1px 5px rgba(40, 40, 211, 0.685);
    }
  }
}
</style>
