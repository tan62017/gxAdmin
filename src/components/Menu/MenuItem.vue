<script setup>
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
  <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.path">
    <template #title>
      <el-icon
        :class="defaultActive === menu.path ? menu.elIconAc : menu.elIcon"
      >
        <component :is="menu.icon"></component>
      </el-icon>
      <span>{{ menu.title }}</span>
    </template>
    <MenuItem v-for="m in menu.children" :key="m.path" :menu="m"></MenuItem>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.path">
    <el-icon :class="defaultActive === menu.path ? menu.elIconAc : menu.elIcon">
      <component :is="menu.icon"></component>
    </el-icon>
    <span>{{ menu.title }}</span>
  </el-menu-item>
</template>

<style lang="scss">
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
