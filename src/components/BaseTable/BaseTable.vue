<template>
  <div class="advanced-table">
    <!-- 搜索区域 -->
    <div v-if="showSearch" class="search-form">
      <el-form :model="searchForm" label-width="80px" inline>
        <el-form-item
          v-for="col in columns.filter((c) => c.searchable)"
          :key="col.prop"
          :label="col.label"
        >
          <el-input
            v-if="col.searchType === 'input' || !col.searchType"
            v-model="searchForm[col.prop]"
            :placeholder="'请输入' + col.label"
            clearable
          />
          <el-select
            v-else-if="col.searchType === 'select'"
            v-model="searchForm[col.prop]"
            :placeholder="'请选择' + col.label"
            clearable
          >
            <el-option
              v-for="option in col.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <el-date-picker
            v-else-if="col.searchType === 'date'"
            v-model="searchForm[col.prop]"
            type="date"
            :placeholder="'选择日期'"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 顶部操作按钮区域 -->
    <div class="flex-container">
      <div class="table-actions">
        <slot name="top-actions"></slot>
      </div>
      <div>
        <el-button icon="el-icon-refresh" @click="refresh">刷新</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table
      :data="tableData"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      stripe
    >
      <!-- 选择列 -->
      <el-table-column v-if="showSelection" type="selection" width="55" />

      <!-- 数据列 -->
      <template v-for="column in processedColumns" :key="column.prop">
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :sortable="column.sortable"
        >
          <template #default="scope">
            <template v-if="column.slot">
              <slot :name="column.slot" :row="scope.row"></slot>
            </template>
            <template v-else>
              {{ scope.row[column.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>

      <!-- 操作列插槽 -->
      <slot name="actions-column">
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <slot name="action" :row="scope.row"></slot>
          </template>
        </el-table-column>
      </slot>
    </el-table>

    <!-- 分页区域 -->
    <div class="table-footer" v-if="showPagination">
      <div>共 {{ total }} 条记录</div>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script setup>
// import NoData from "./no-data";
import { defineProps, defineEmits, useSlots, watch, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
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
});

const loading = ref(false);
const tableData = ref([]);
const selectedRows = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const searchForm = reactive({});

// 处理列配置，添加插槽支持
const processedColumns = ref([]);

// 加载数据
const loadData = async (params = {}) => {
  if (!props.dataSource) return;
  loading.value = true;
  try {
    const response = await props.dataSource({
      page: currentPage.value,
      pageSize: pageSize.value,
      ...searchForm,
      ...params,
    });

    tableData.value = response.data;
    total.value = response.total;
  } catch (error) {
    console.error('加载数据失败:', error);
    ElMessage.error('数据加载失败');
  } finally {
    loading.value = false;
  }
};

// 刷新表格
const refresh = (params = {}) => {
  currentPage.value = 1;
  loadData(params);
};

// 处理分页变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
  loadData();
};

// 处理每页数量变化
const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1;
  loadData();
};

// 处理选择变化
const handleSelectionChange = (selection) => {
  selectedRows.value = selection;
  emit('selection-change', selection);
};

// 处理搜索
const handleSearch = () => {
  refresh();
};

// 处理重置
const handleReset = () => {
  Object.keys(searchForm).forEach((key) => {
    searchForm[key] = '';
  });
  refresh();
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

  // 初始化搜索表单
  props.columns.forEach((column) => {
    if (column.searchable) {
      searchForm[column.prop] = '';
    }
  });

  // 加载数据
  refresh(props.initParams);
};

// 暴露方法给父组件
const exposeMethods = {
  refresh,
  getSelectedRows: () => selectedRows.value,
  getTableData: () => tableData.value,
  setSearchField: (field, value) => {
    searchForm[field] = value;
  },
};

onMounted(() => {
  init();
});
</script>

<style scoped lang="scss">
.advanced-table {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
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
.el-pagination {
  justify-content: flex-end;
}
.flex-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
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
