<script setup>
import { defineOptions, useAttrs } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

defineProps({
  menu: {
    type: Object,
    required: true,
  },
  defaultActive: {
    type: String,
  },
});
</script>

<template>
  <el-sub-menu v-if="menu.children && menu.children.length" v-bind="attrs" :index="menu.path">
    <template #title>
      <div class="menu-content">
        <el-icon
          class="icon-info"
          :class="defaultActive === menu.path ? menu.elIconAc : menu.elIcon"
        >
          <component :is="menu.icon"></component>
        </el-icon>
        <span>{{ menu.title }}</span>
      </div>
    </template>
    <MenuItem v-for="m in menu.children" :key="m.path" :menu="m"></MenuItem>
  </el-sub-menu>
  <el-menu-item v-else v-bind="attrs" :index="menu.path">
    <el-icon :class="defaultActive === menu.path ? menu.elIconAc : menu.elIcon">
      <component :is="menu.icon"></component>
    </el-icon>
    <span>{{ menu.title }}</span>
  </el-menu-item>
</template>

<style lang="scss">
.menu-content {
}
.el-menu-item,
.el-sub-menu__title {
  font-size: 18px;
  padding: 30px 0;
  margin-top: 10px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #3f465f;
  border-radius: 12px 12px 12px 12px;

  &:hover {
    background-color: #6072ff;
    color: #fff;
  }
  &.is-active {
    background-color: #6072ff;
  }
}
.el-menu-item {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  .el-icon {
    background-size: 100%, 100% !important;
    // font-size: 20px;
    // margin-right: 10px;
  }
}
.el-menu {
}
.el-sub-menu {
  &.is-active {
    background-color: transparent;
  }
  // .el-menu-item {
  //   &.is-active {
  //     background-color: #6072ff;
  //     border-radius: 12px 12px 12px 12px;
  //     width: 80%;
  //     position: relative;
  //     left: 10%;
  //     padding-left: calc(40px - 10%) !important;
  //   }

  //   &:hover {
  //     background-color: #6072ff;
  //     border-radius: 12px 12px 12px 12px;
  //     width: 80%;
  //     position: relative;
  //     left: 10%;
  //     color: #fff;
  //     padding-left: calc(40px - 10%) !important;
  //   }
  // }
}
</style>
