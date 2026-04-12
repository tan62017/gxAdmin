<template>
  <div class="advanced-table" v-resize="resizeFun">
    <!-- 表格区域 -->
    <el-table
      ref="tableRef"
      :data="data"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      stripe
      :scrollbar-always-on="scrollbarAlwaysOn"
      :height="height"
      :key="tableKey"
    >
      <!-- 选择列 -->
      <el-table-column v-if="showSelection" type="selection" width="35" />

      <!-- 数据列 -->
      <template v-for="column in processedColumns" :key="column.prop">
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :sortable="column.sortable"
          :align="column.align || 'left'"
          :header-align="column.headerAlign || 'left'"
        >
          <template #default="scope">
            <slot :name="column.prop" :row="scope.row">
              {{ scope.row[column.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>

      <!-- 操作列插槽 -->
      <slot name="actions-column">
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="scope">
            <slot name="action" :row="scope.row"></slot>
          </template>
          <template #header>
            <slot name="header">
              <div class="active-header">
                <el-button type="primary" size="" v-show="selectedRows.length" @click="delectAll"
                  >批量删除</el-button
                >
                <span v-show="!selectedRows.length">操作</span>
              </div>
            </slot>
          </template>
        </el-table-column>
      </slot>
    </el-table>

    <!-- 分页区域 -->
    <div class="table-footer" v-show="showPagination">
      <el-pagination
        v-model:current-page="pages.currentPage"
        v-model:page-size="pages.pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        :total="pages.total"
        layout="total, sizes, prev, pager, next"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
        <template #jumper>
          <div class="slot-jumoer flex items-center">
            <span class="mr-2">跳转到</span>
            <el-input
              v-model="pages.currentPage"
              style="width: 80px"
              size="small"
              @change="handleCurrentChange(pages.currentPage)"
            ></el-input>
            <!-- <ElPaginationJumper :disabled="disabled" aria-label="跳转页码" /> -->
            <span class="ml-2">页</span>
          </div>
        </template>
      </el-pagination>
    </div>
  </div>
</template>
<script setup>
// import NoData from "./no-data";
import { defineProps, useSlots, watch, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash-es';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  // 列配置
  columns: {
    type: Array,
    required: true,
  },
  // 数据源函数
  dataSource: {
    type: Function,
    required: false,
  },
  // 初始化参数
  initParams: {
    type: Object,
    default: () => ({}),
  },
  // 是否显示分页
  showPagination: {
    type: Boolean,
    default: true,
  },
  // 是否显示选择列
  showSelection: {
    type: Boolean,
    default: false,
  },
  // 是否显示搜索表单
  showSearch: {
    type: Boolean,
    default: false,
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(['selection-change', 'page-change', 'delect-all']);

const pages = defineModel('pages');

const tableRef = ref(null);

const loading = ref(false);
const tableData = ref([]);
const selectedRows = ref([]);

const height = ref(0);

const tableKey = ref(0);

// 处理列配置，添加插槽支持
const processedColumns = ref([]);
//防抖处理
const resizeFun = debounce(() => {
  updateHeight();
  // tableRef.value?.doLayout();
  // tableKey.value = tableKey.value + 1;
}, 100);

// 加载数据
const loadData = async (params = {}) => {
  emits('page-change');
};
const delectAll = () => {
  emits('delect-all', selectedRows.value);
};
// 处理分页变化
const handleCurrentChange = (page) => {
  pages.value.currentPage = page;
  loadData();
};

// 处理每页数量变化
const handleSizeChange = (size) => {
  pages.value.pageSize = size;
  pages.value.currentPage = 1;
  loadData();
};

// 处理选择变化
const handleSelectionChange = (selection) => {
  selectedRows.value = selection;
  emits('selection-change', selection);
};

const slots = useSlots();
// 初始化
const init = () => {
  // 处理列配置
  processedColumns.value = props.columns.map((column) => {
    if (column.slot && slots[column.slot]) {
      return {
        ...column,
        slot: column.slot,
      };
    }
    return column;
  });
};

const clearSelection = () => {
  tableRef.value?.clearSelection();
};

const getSelectionRows = () => {
  return tableRef.value?.getSelectionRows();
};

function updateHeight() {
  nextTick(() => {
    const tableDom = document.querySelector('.advanced-table');
    const tablePage = document.querySelector('.table-footer');
    if (tableDom) {
      const rect = tableDom.getBoundingClientRect();
      const pageRect = tablePage.getBoundingClientRect();

      height.value = rect.height - 80 || 0;
    }
  });
}

onMounted(() => {
  init();
});

defineExpose({
  domRef: tableRef.value,
  clearSelection,
  getSelectionRows,
});
</script>

<style scoped lang="scss">
.advanced-table {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-x: hidden;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  :deep(.el-table) {
    width: 100%;
    thead {
      height: 50px;
    }
    th.el-table__cell {
      background-color: #e6eff8;
    }
    .el-table__inner-wrapper,
    .el-table__header,
    colgroup,
    table,
    thead,
    tbody,
    thead tr,
    tbody tr,
    .el-scrollbar,
    .el-scrollbar__wrap,
    .el-scrollbar__view,
    .el-table__body {
      width: 100% !important;
    }
    // .el-table__inner-wrapper,
    // .el-table__header,
    // .el-table__body-wrapper,
    // thead,
    // tbody,
    // colgroup {
    //   width: 100% !important;
    // }
    // tbody {
    //   width: 0 !important;
    //   display: none;
    // }
  }
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.table-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  :deep(.el-pagination) {
    justify-content: flex-end;
    button .el-icon {
      height: auto;
    }
  }
}
.search-form {
  margin-bottom: 20px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}
.table-actions {
  margin-bottom: 15px;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.active-header {
  :deep(.el-button) {
    background-color: #288cde;
  }
}
// div {
//   color: #f0f2f227;
// }
/*table-*/
</style>
<style lang="scss">
.my-table {
  --el-table-row-hover-bg-color: rgba(98, 179, 245, 0.158);
  tr {
    --el-table-tr-bg-color: transparent !important;
  }
  .cell {
    height: 100% !important;
  }
  tbody {
    background: transparent !important;
  }
  .el-checkbox {
    --el-checkbox-input-height: 22px;
    --el-checkbox-input-width: 22px;
    .el-checkbox__inner:after {
      padding-left: 3px;
      width: 6px;
      height: 13px;
    }
  }
  .el-button {
    font-size: 24px;
  }
}
</style>
