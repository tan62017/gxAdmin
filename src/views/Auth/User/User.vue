<script setup>
import { cloneDeep } from 'lodash-es'
import AddPermissions from './AddPermissions.vue'
import SelectRole from './SelectRole.vue'
import UserEditor from './UserEditor.vue'
import { delAuthUser, getUserList } from '@/api'
const searchForm = ref({
  userName: '',
  isEnable: 1,
  displayName: '',
  id: '',
  mobile: '',
  nickname: '' // 角色
})

const page = ref({
  total: 100,
  currentPage: 1,
  pageSize: 10
})
const loading = ref(false)
const user = ref({})

const showAddPermissions = ref(false)
const showSelectUser = ref(false)
const showUserEditor = ref(false)

const options = ref([
  { label: '全部', value: null },
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
])

const columns = [
  { label: '账号', prop: 'userName' },
  { label: '姓名', prop: 'displayName' },
  { label: '状态', prop: 'isEnable' },
  { label: '角色', prop: 'rolename' },
  { label: '操作', prop: 'action' }
]

const tableData = ref([])

async function getUsers(onExpired) {
  loading.value = true
  const res = await getUserList({
    pageNum: page.value.currentPage,
    pageSize: page.value.pageSize,
    orderByColumn: 'created_date',
    asc: 'desc',
    ...searchForm.value,
    cache: false
  })
  if (onExpired && onExpired()) {
    return
  }
  tableData.value = res.list
  loading.value = false
  page.value.total = res.total
  page.value.currentPage = res.pageNum
}

function editUser(add = false) {
  showUserEditor.value = true
  if (add) {
    user.value = {}
  }
}

watch(
  () => [page.value.currentPage, page.value.pageSize],
  (_, __, onCleanup) => {
    let expired = false
    onCleanup(() => {
      expired = true
    })
    getUsers(() => expired)
  },
  {
    immediate: true
  }
)

function showDialog(key, val) {
  user.value = cloneDeep(val)
  if (key === 'showAddPermissions') {
    showAddPermissions.value = true
  } else if (key === 'showSelectUser') {
    showSelectUser.value = true
  } else if (key === 'editUser') {
    showUserEditor.value = true
  }
}

async function delUser(row) {
  const [err] = await to(
    delAuthUser({
      id: row.id
    })
  )
  if (!err) {
    ElMessage.success('删除成功')
    getUsers()
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<template>
  <div class="wrap">
    <AddPermissions v-model="showAddPermissions" :user="user" @confirm="getUsers"></AddPermissions>
    <SelectRole v-model="showSelectUser" :user="user" @confirm="getUsers"></SelectRole>
    <UserEditor v-model="showUserEditor" :user="user" @confirm="getUsers"></UserEditor>
    <div class="user p-20px bb">
      <div class="search h50px">
        <el-form inline>
          <el-form-item label="">
            <el-input v-model="searchForm.userName" placeholder="登录账号"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="searchForm.displayName" placeholder="姓名"></el-input>
          </el-form-item>
          <!-- <el-form-item label="">
            <el-input v-model="searchForm.id" placeholder="编号"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="searchForm.mobile" placeholder="手机号"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="">
            <el-input v-model="searchForm.nickname" placeholder="角色"></el-input>
          </el-form-item> -->
          <el-form-item label="">
            <el-select-v2 v-model="searchForm.isEnable" :options="options"></el-select-v2>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="getUsers()">查询</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="success" @click="editUser(true)">新建账号</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="user-table h-[calc(100%-50px)] max-h-[calc(100%-50px)]">
        <AgelTable v-model:page="page" height="calc(100%-32px)" :loading="loading" :columns="columns" :data="tableData">
          <template #isEnable="scope">
            <el-text :type="scope.cellValue === 1 ? 'primary' : 'danger'">{{
              scope.cellValue === 1 ? '启用' : '禁用'
            }}</el-text>
            <el-switch class="ml5px" :model-value="true" disabled></el-switch>
          </template>
          <template #action="{ row }">
            <el-text type="primary" class="mr12px! cursor-pointer" @click="showDialog('showSelectUser', row)">
              选择角色
            </el-text>
            <el-text type="primary" class="mr12px! cursor-pointer" @click="showDialog('showAddPermissions', row)">
              添加权限
            </el-text>
            <el-text v-if="row.source === 1" type="warning" class="cursor-pointer" @click="showDialog('editUser', row)">
              编辑用户
            </el-text>
            <el-popconfirm
              v-if="row.source === 1"
              title="确定要删除当前账号吗？"
              confirm-button-text="删除"
              cancel-button-text="取消"
              @confirm="delUser(row)"
            >
              <template #reference>
                <el-text type="danger" class="cursor-pointer"> 删除 </el-text>
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
.user {
  background: #ffffff;
  border-radius: 16px 16px 16px 16px;
  height: 100%;
  overflow: hidden;
}
.wrap {
  padding: 24px;
  box-sizing: border-box;
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
