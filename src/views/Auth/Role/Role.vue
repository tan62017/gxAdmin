<script setup>
import { Plus, RefreshRight } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import AddRole from './AddRole.vue'
import RoleMember from './RoleMember.vue'
import RolePermissions from './RolePermissions.vue'
import { deleteRole as _deleteRole, updateRoleStatus as _updateRoleStatus, getRoleList } from '@/api'

const table = ref(null)
const showAddRole = ref(false)
const showRoleMember = ref(false)
const showRolePermissions = ref(false)
const elTable = computed(() => table.value?.getRef())
const loading = ref(false)
const role = ref()

const page = ref({
  total: 100,
  currentPage: 1,
  pageSize: 10
})

const searchForm = ref({
  name: '',
  status: ''
})

const options = ref([
  { label: '全部', value: '' },
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
])

const columns = [
  { type: 'selection', width: 55 },
  { label: '角色名称', prop: 'name' },
  { label: '角色说明', prop: 'remark' },
  { label: '状态', prop: 'status' },
  { label: '操作', prop: 'action' }
]

const tableData = ref()

const formatStatus = row => {
  return row.cellValue === 1
}

async function batchUse(status) {
  const selecteds = elTable.value.getSelectionRows()
  if (!selecteds.length) {
    ElMessage.warning('请选择要操作的角色')
    return
  }
  const err = await updateRoleStatus(
    selecteds.map(item => item.id),
    status
  )

  if (!err) {
    ElMessage.success('修改成功')
    getRoles()
  } else {
    ElMessage.error('修改失败')
  }
}

async function getRoles(onExpired) {
  loading.value = true
  const res = await getRoleList({
    pageNum: page.value.currentPage,
    pageSize: page.value.pageSize,
    ...searchForm.value,
    cache: false
  })
  if (onExpired && onExpired()) {
    return
  }
  tableData.value = res.list
  page.value.total = res.total
  page.value.currentPage = res.pageNum
  loading.value = false
}

async function updateRoleStatus(idList, status) {
  const [err] = await to(
    _updateRoleStatus({
      idList,
      status
    })
  )
  return err
}

function selectRole(row, type) {
  role.value = cloneDeep(row)
  if (type === 'showRoleMember') {
    showRoleMember.value = true
  } else {
    showRolePermissions.value = true
  }
}

async function betchDeleteRole() {
  const selecteds = elTable.value.getSelectionRows()
  if (!selecteds.length) {
    ElMessage.warning('请选择要操作的角色')
    return
  }
  const [err] = await to(
    _deleteRole({
      idList: selecteds.map(item => item.id)
    })
  )
  if (!err) {
    ElMessage.success('删除成功')
    getRoles()
  } else {
    ElMessage.error('删除失败')
  }
}

async function deleteRole(row) {
  const [err] = await to(
    _deleteRole({
      idList: [row.id]
    })
  )
  if (!err) {
    ElMessage.success('删除成功')
    getRoles()
  } else {
    ElMessage.error('删除失败')
  }
}

async function toggleStatus(row) {
  if (row.loading) return
  row.loading = true
  const status = row.status === 1 ? 0 : 1
  const err = await updateRoleStatus([row.id], status)
  row.loading = false
  if (!err) {
    ElMessage.success('修改成功')
    row.status = status
  } else {
    ElMessage.error('修改失败')
  }
}

watch(
  () => [page.value.currentPage, page.value.pageSize],
  (_, __, onCleanup) => {
    let expired = false
    onCleanup(() => {
      expired = true
    })
    getRoles(() => expired)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="wrap">
    <div class="role p-20px bb">
      <AddRole v-model="showAddRole" @created="getRoles()"></AddRole>
      <RoleMember v-model="showRoleMember" :role="role"></RoleMember>
      <RolePermissions v-model="showRolePermissions" :role="role"></RolePermissions>
      <div class="search relative">
        <el-form inline>
          <el-form-item label="">
            <el-input v-model="searchForm.name" placeholder="角色名称"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-select-v2 v-model="searchForm.status" :options="options" placeholder="请输入角色名称"></el-select-v2>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="getRoles()">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="absolute right-0 top-0 cursor-pointer">
          <el-icon :size="30" color="#409eff" @click="getRoles()"><RefreshRight /></el-icon>
        </div>
      </div>
      <div class="opration mb16px flex jb">
        <div class="add">
          <el-button :icon="Plus" type="primary" @click="showAddRole = true">添加角色</el-button>
        </div>
        <div class="opration">
          <el-button plain type="primary" @click="batchUse(1)">批量启用</el-button>
          <el-button plain type="warning" @click="batchUse(0)">批量禁用</el-button>
          <el-popconfirm
            title="确定要删除当前角色吗？"
            confirm-button-text="删除"
            cancel-button-text="取消"
            @confirm="betchDeleteRole"
          >
            <template #reference>
              <el-button plain type="danger">批量删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
      <div class="role-table flex-1">
        <AgelTable ref="table" v-model:page="page" :loading="loading" stripe :columns="columns" :data="tableData">
          <template #status="scope">
            <el-text :type="scope.cellValue === 1 ? 'primary' : 'danger'">{{
              scope.cellValue === 1 ? '启用' : '禁用'
            }}</el-text>
            <el-switch
              :loading="scope.row.loading"
              class="ml5px"
              :model-value="formatStatus(scope)"
              @change="toggleStatus(scope.row)"
            />
          </template>
          <template #action="{ row }">
            <el-text class="cursor-pointer mr24px!" type="primary" @click="selectRole(row, 'showRoleMember')"
              >角色成员</el-text
            >
            <el-text class="cursor-pointer mr24px!" type="primary" @click="selectRole(row, 'showRolePermissions')">
              角色权限
            </el-text>

            <el-popconfirm
              title="确定要删除当前角色吗？"
              confirm-button-text="删除"
              cancel-button-text="取消"
              width="200px"
              @confirm="deleteRole(row)"
            >
              <template #reference>
                <el-text class="cursor-pointer" type="danger">删除</el-text>
              </template>
            </el-popconfirm>
          </template>
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
