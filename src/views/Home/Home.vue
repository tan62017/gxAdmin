<script setup>
import Nav from './Nav/index.vue';
import Left from './NavContent/Left.vue';
import Right from './NavContent/Right.vue';
import LinkList from '@/components/LinkList/LinkList.vue';
import {
  getLocalStorage,
  setLocalStorage,
  noApi,
  urlTime,
  hexToStr,
  strToHex,
  getLocation,
} from '@/utils';

import { navList } from '@/config';

const navListData = getLocalStorage('NAV_LIST_DATA');

if (navListData) {
  // navList.value = navListData;
  navList.value.forEach((i, index) => {
    const item = (navListData || []).find((b) => b?.label === i.label);
    if (i.list) {
      i.list.forEach((b, ind) => {
        b.num = item?.list[ind]?.num || 0;
      });
    }
  });
}

const navContentData = reactive({
  label: '全部',
  leftData: [],
  rightData: [],
});
navContentData.leftData = [];
navContentData.rightData = navList.value[0].list || [];
const changeNav = (data) => {
  navContentData.label = data.label;
  if (['全部', '零售条线', '综合管理'].includes(data.label)) {
    console.log(data);
    navContentData.leftData = [];
    navContentData.rightData = data.list || [];
  } else {
    navContentData.leftData = data.list;
    navContentData.rightData = data.list[0]?.list || [];
  }
};
const tabClick = (data) => {
  navContentData.rightData = data.list || [];
};

const search = (data) => {
  navContentData.label = '全部';
  navContentData.leftData = [];
  navContentData.rightData = navList.value[0].list.filter((i) => i.label.includes(data));
};

const changeItem = (data) => {
  data.num += 1;
  if (data.location) {
    window.open(data.location);
    setLocalStorage('NAV_LIST_DATA', navList.value);
  } else {
    ElMessage.error('暂未开放');
  }
};

const processList = (data) => {
  (data || []).forEach((i) => {
    let typeArr = [];
    i.types = i.typesLine.map((type) => {
      typeArr = type?.split('-');

      const navItem = navList.value.find((nav) => nav.label === typeArr[0]);
      if (navItem) {
        if (typeArr.length === 1) navItem.list.push(i);
        else {
          typeArr.slice(1).forEach((b) => {
            const navB = navItem.list.find((navChild) => navChild.label === b);
            if (navB) {
              navB.list.push(i);
            }
          });
        }
      }

      return typeArr[0];
    });
  });
};
processList(navList.value[0].list);
</script>

<template>
  <el-scrollbar class="pt20px flex flex-wrap h100%">
    <Nav
      class="nav-out"
      :data="navList"
      v-model:active="navContentData.label"
      @change="changeNav"
      @search="search"
    ></Nav>
    <div class="nav-content">
      <Left
        :data="navContentData.leftData"
        @tabChange="tabClick"
        v-if="navContentData.leftData.length"
      ></Left>
      <LinkList :data="navContentData.rightData" @change="changeItem"></LinkList>
    </div>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
:deep(.el-scrollbar__wrap) {
  width: 100%;
  overflow: hidden;
  .el-scrollbar__view {
    height: 100%;
    overflow: hidden;
  }
  // height: 100%;
}
.nav-content {
  display: flex;
  // height: 880px;
  height: 100%;
  height: calc(100% - 64px);
  overflow: hidden;
  margin-top: 20px;

  border-radius: var(--border-radius-num);

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #21c2df59;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #adadad00;
  }
}
</style>
