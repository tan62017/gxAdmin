<script setup>
import Top from './components/Top.vue';
const colunms = [
  {
    id: 1,
    label: '日期',
    // width: 50,
    prop: 'time',
    // type: "index",
    // fixed: "left",
    headerAlign: 'left',
    textAlign: 'left',
    showOverflowTooltip: true,
  },
  {
    label: '用户',
    // width: 50,
    prop: 'user',
    // type: "index",
    // fixed: "left",
    headerAlign: 'left',
    textAlign: 'left',
    showOverflowTooltip: true,
  },
  {
    id: 3,
    label: '部门',
    // width: 50,
    prop: 'unit',
    // type: "index",
    // fixed: "left",
    headerAlign: 'left',
    textAlign: 'left',
    showOverflowTooltip: true,
  },
  {
    id: 4,
    label: 'ip',
    // width: 50,
    prop: 'ip',
    // type: "index",
    // fixed: "left",
    headerAlign: 'left',
    textAlign: 'left',
    showOverflowTooltip: true,
  },
  {
    id: 5,
    label: '访问页面',
    // width: 50,
    prop: 'name',
    // type: "index",
    // fixed: "left",
    headerAlign: 'left',
    textAlign: 'left',
    showOverflowTooltip: true,
  },
];

const tableData = [
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
  {
    time: '2016-05-03',
    name: '主要业务指标',
    user: '小小',
  },
];
const pages = ref({
  total: 10,
  currentPage: 1,
  pageSize: 10,
});
const delectDialog = ref(false);
const delectAll = (arr) => {
  console.log(arr);
  delectDialog.value = true;
};
const look = () => {};
</script>

<template>
  <Content>
    <Top></Top>
    <BaseTable
      class="table-list-box mt30px w-full overflow-hidden"
      showSelection
      :showPage="true"
      v-model:pages="pages"
      :columns="colunms"
      :data="tableData"
      @delectAll="delectAll"
    >
      <template #action="{ row }">
        <div class="flex items-center justify-center px-10px">
          <div class="edit cursor-pointer" @click="look(row)">查看</div>
        </div>
      </template>
    </BaseTable>
    <DialogContent v-model="delectDialog" title="批量删除" width="40%"> </DialogContent>
  </Content>
</template>

<style lang="scss" scoped>
.nav-content {
  display: flex;
  // height: 880px;
  height: 100%;
  height: calc(100% - 64px);
  overflow: hidden;
  margin-top: 20px;

  border-radius: var(--border-radius-num);

  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 1px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #a7a8a800;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 0px;
    background: #adadad00;
  }
}
</style>
