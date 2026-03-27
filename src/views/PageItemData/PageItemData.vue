<template>
  <div class="page-item-data">
    <Header></Header>
    <!-- {{ colunms }} -->
    <BaseTable
      class="table-list-box"
      :showPage="true"
      :pages="pages"
      :columns="colunms"
      :data="tableData"
    >
    </BaseTable>
    <!-- <AgelTable :columns="columns"></AgelTable> -->
  </div>
</template>

<script setup>
// import Header from "./"
import Header from './components/Header.vue';

const colunms = [
  {
    id: 0,
    type: 'selection',
    label: '',
    width: 55,
  },
  {
    id: 1,
    label: '表名',
    // width: 50,
    prop: 'name',
    // type: "index",
    // fixed: "left",
    headerAlign: 'left',
    textAlign: 'left',
    showOverflowTooltip: true,
  },
  {
    label: '上传人',
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
    label: '上传日期',
    // width: 50,
    prop: 'time',
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
];
const buttons = [
  { type: 'primary', text: '编辑' },
  { type: 'warning', text: '删除' },
];

function rowStyle({ rowIndex }) {
  if (rowIndex % 2) {
    return {
      // background: '#6C8CB9',
      background: 'transparent',
    };
  }
  return {
    // background: '#283246',
    background: '#f0f2f227',
    /*background: 'transparent'*/
  };
}
</script>

<style lang="scss" scoped>
.page-item-data {
  padding: 20px 0;
  :deep(.el-table) {
    .el-table__cell .cell {
      // margin: 10px 0 !important;
      padding: 10px 12px;
    }
    tbody .el-table__cell .cell {
      margin: 10px 0 !important;
    }
  }
}
</style>

<!-- <style lang="scss" >
.page-item-data {
  .el-table .el-table__cell .cell {
    margin: 30px 0 !important;
  }
}
</style> -->
