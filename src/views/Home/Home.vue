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
  getToken,
} from '@/utils';
import { pageAddView } from '@/api/pages';
import { usePagesStore } from '@/stores';
import { cloneDeep } from 'lodash-es';
const pagesStore = usePagesStore();
const proUrl = hexToStr('687474703a2f2f36302e302e3139312e3231313a39313138');
const testUrl = hexToStr('687474703a2f2f3132382e312e3132342e36383a39313138');

const baseUrl =
  getLocation() ||
  (import.meta.env.MODE === 'development'
    ? 'http://localhost'
    : import.meta.env.MODE === 'production'
    ? proUrl
    : testUrl);
// import { navList } from '@/config';

// const navListData = getLocalStorage('NAV_LIST_DATA');
pagesStore.getPagesList();

const navList = toRef(pagesStore, 'navList');
const infoPagesList = toRef(pagesStore, 'infoPagesList');
// const getPagesList = unref(pagesStore, 'getPagesList');

// if (navListData) {
//   // navList.value = navListData;
//   navList.value.forEach((i, index) => {
//     const item = (navListData || []).find((b) => b?.label === i.label);
//     if (i.list) {
//       i.list.forEach((b, ind) => {
//         b.num = item?.list[ind]?.num || 0;
//       });
//     }
//   });
// }

const navContentData = reactive({
  label: '全部',
  leftData: [],
  rightData: [],
});

let activeItem = {};
let activeList = [];
// navContentData.leftData = [];
// navContentData.rightData = navList.value[0].list || [];
const changeNav = (data) => {
  activeItem = data;
  const fItem = navList.value.find((i) => i.label === data.label);

  navContentData.label = fItem.label;
  if (['全部', '零售条线', '综合管理'].includes(fItem.label)) {
    navContentData.leftData = [];
    navContentData.rightData = fItem.list || [];
  } else {
    navContentData.leftData = fItem.list;
    navContentData.rightData = fItem.list[0]?.list || [];
  }
  activeList = cloneDeep(navContentData.rightData);
};
const tabClick = (data) => {
  navContentData.rightData = data.list || [];
};

const search = (data) => {
  console.log(data);
  if (data) {
    navContentData.rightData = activeList.filter((i) => i.name?.includes(data));
  } else {
    navContentData.rightData = activeList;
  }
  // navContentData.label = '全部';
  // navContentData.leftData = [];
};

const changeItem = async (data) => {
  await pageAddView(data.id);
  pagesStore.getPagesList();
  // return;
  if (data.location) {
    window.open(data.location + `?token=${getToken()}&from_url=${baseUrl}/gxAdmin/home`);
    // setLocalStorage('NAV_LIST_DATA', navList.value);
  } else {
    ElMessage.error('暂未开放');
  }
};
watch(
  () => navList.value,
  (val) => {
    if (Array.isArray(val) && val.length) {
      if (Object.keys(activeItem).length) {
        changeNav(activeItem);
      } else {
        changeNav(val[0]);
      }
    }
  },
  { immediate: true, deep: true },
);
// processList(navList.value[0].list);
</script>

<template>
  <div class="pt20px flex flex-col flex-wrap h100% overflow-hidden">
    <Nav
      class="nav-out"
      :data="navList"
      v-model:active="navContentData.label"
      @change="changeNav"
      @search="search"
    ></Nav>
    <div class="nav-content flex-1 mt10px overflow-hidden">
      <Left
        :data="navContentData.leftData"
        @tabChange="tabClick"
        v-if="navContentData.leftData.length"
      ></Left>
      <Content>
        <div class="flex h100%">
          <LinkList :data="navContentData.rightData" @change="changeItem"></LinkList>
        </div>
      </Content>
    </div>
  </div>
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
  //height: 100%;
  // height: calc(100% - 80px);
  // padding: 20px; //

  overflow: hidden;

  border-radius: var(--border-radius-num);
  :deep(.content-contrain) {
    margin-top: 0;
  }
  // ::-webkit-scrollbar {
  //   width: 10px;
  //   height: 10px;
  // }

  // ::-webkit-scrollbar-thumb {
  //   border-radius: 10px;
  //   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  //   background: #21c2df59;
  // }

  // ::-webkit-scrollbar-track {
  //   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  //   border-radius: 10px;
  //   background: #adadad00;
  // }
}
</style>
