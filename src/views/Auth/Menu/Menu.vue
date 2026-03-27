<script setup>
import { Plus, RefreshRight } from '@element-plus/icons-vue';
import { cloneDeep } from 'lodash-es';
import AddMenu from './AddMenu.vue';
import { formatType } from './config';
import { delAcl as _delAcl, getAclList } from '@/api';
const table = ref(null);
const showAddMenu = ref(false);
const loading = ref(false);
const menu = ref();

const page = ref({
  total: 100,
  currentPage: 1,
  pageSize: 10,
});

const searchForm = ref({
  name: '',
});

const columns = [
  { label: 'id', width: 55, prop: 'id' },
  { label: '菜单名称', prop: 'name' },
  { label: '菜单说明', prop: 'remark' },
  { label: '权限所在的权限模块id', prop: 'aclModuleId' },
  { label: 'url', prop: 'url' },
  { label: '类型', prop: 'type' },
  { label: 'code', prop: 'code' },
  { label: '操作者', prop: 'operator' },
  { label: '操作', prop: 'action' },
];

const tableData = ref();

async function getMenus(onExpired) {
  loading.value = true;
  const res = await getAclList({
    pageNum: page.value.currentPage,
    pageSize: page.value.pageSize,
    ...searchForm.value,
    cache: false,
  });
  if (onExpired && onExpired()) {
    return;
  }
  tableData.value = res.list;
  page.value.total = res.total;
  page.value.currentPage = res.pageNum;
  loading.value = false;
}

function selectMenu(row) {
  menu.value = cloneDeep(row);
  showAddMenu.value = true;
}

async function delAcl(row) {
  const [err] = await to(
    _delAcl({
      id: row.id,
    }),
  );
  if (!err) {
    ElMessage.success('删除成功');
    getMenus();
  } else {
    ElMessage.error('删除失败');
  }
}

watch(
  () => [page.value.currentPage, page.value.pageSize],
  (_, __, onCleanup) => {
    let expired = false;
    onCleanup(() => {
      expired = true;
    });
    getMenus(() => expired);
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div class="wrap">
    <div class="role p-20px bb">
      <AddMenu v-model="showAddMenu" :menu="menu" @created="getMenus()"></AddMenu>
      <div class="search relative">
        <el-form inline>
          <el-form-item label="">
            <el-input v-model="searchForm.name" placeholder="菜单名称"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="getMenus()">查询</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button :icon="Plus" type="primary" @click="(showAddMenu = true), (menu = null);"
              >新建菜单</el-button
            >
          </el-form-item>
        </el-form>
        <div class="absolute right-0 top-0 cursor-pointer">
          <el-icon :size="30" color="#409eff" @click="getMenus()"><RefreshRight /></el-icon>
        </div>
      </div>
      <div class="role-table h-[calc(100%-90px)]">
        <AgelTable
          ref="table"
          v-model:page="page"
          height="100%"
          :loading="loading"
          stripe
          :columns="columns"
          :data="tableData"
        >
          <template #action="{ row }">
            <el-text class="cursor-pointer mr24px!" type="primary" @click="selectMenu(row)"
              >编辑菜单</el-text
            >
            <el-popconfirm
              title="确定要删除当前菜单吗？"
              confirm-button-text="删除"
              cancel-button-text="取消"
              width="200px"
              @confirm="delAcl(row)"
            >
              <template #reference>
                <el-text class="cursor-pointer" type="danger">删除</el-text>
              </template>
            </el-popconfirm>
          </template>
          <template #type="{ cellValue }">{{ formatType[cellValue] }}</template>
        </AgelTable>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-input {
  width: 200px;
}
.role {
  background: #ffffff;
  border-radius: 16px 16px 16px 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.wrap {
  padding: 24px;

  height: 100%;
  overflow: hidden;
}
:deep(.el-table__header-wrapper) {
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  thead {
    tr {
      .el-table__cell {
        background-color: #0645ed11;
      }
    }
  }
}
.table-default-ui {
  height: 100%;
  :deep(.el-table--fit) {
    height: calc(100% - 32px);
  }
}
</style>
