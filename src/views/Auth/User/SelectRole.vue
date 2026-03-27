<script setup>
import { WarningFilled } from '@element-plus/icons-vue'
import { addUserRolePermission as _addUserRolePermission, getRolePermissionList as _getRolePermissionList } from '@/api'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['confirm'])

const roleName = ref('')
const loading = ref(false)
const agel = ref(null)

const elTable = computed(() => agel.value?.getRef())
const show = defineModel('modelValue', {
  type: Boolean,
  required: true
})

async function confirm() {
  loading.value = true
  await addUserRolePermission({
    selUserId: props.user.id,
    permissionId: []
  })
  loading.value = false
  show.value = false
  emits('confirm')
}

async function addUserRolePermission() {
  const selection = elTable.value.getSelectionRows()
  const [err] = await to(
    _addUserRolePermission({
      selUserId: props.user.id,
      permissionId: selection.map(item => item.id)
    })
  )
  if (!err) {
    ElMessage.success('添加成功')
    show.value = false
  } else {
    ElMessage.error('添加失败')
  }
}

// const page = ref({
//   total: 100,
//   currentPage: 1,
//   pageSize: 10
// })

const columns = [
  {
    type: 'selection',
    width: 60
  },
  {
    label: '角色名称',
    prop: 'name'
  },
  {
    label: '角色说明',
    prop: 'remark'
  }
]

const tableData = ref([
  {
    title: '用户管理',
    path: 'user'
  },
  {
    title: '角色管理',
    path: 'role'
  },
  {
    title: '权限管理',
    path: 'permission'
  },
  {
    title: '用户管理',
    path: 'user'
  },
  {
    title: '角色管理',
    path: 'role'
  },
  {
    title: '权限管理',
    path: 'permission'
  },
  {
    title: '用户管理',
    path: 'user'
  },
  {
    title: '角色管理',
    path: 'role'
  },
  {
    title: '权限管理',
    path: 'permission'
  },
  {
    title: '用户管理',
    path: 'user'
  },
  {
    title: '角色管理',
    path: 'role'
  },
  {
    title: '权限管理',
    path: 'permission'
  },
  {
    title: '角色管理',
    path: 'role'
  },
  {
    title: '权限管理',
    path: 'permission'
  }
])

const renderTableData = computed(() => {
  if (!roleName.value) return tableData.value
  return tableData.value.filter(item => item.name.includes(roleName.value) || item.remark?.includes(roleName.value))
})

async function getRoleList() {
  loading.value = true
  const res = await _getRolePermissionList({
    selUserId: props.user.id,
    cache: false
  })
  tableData.value = res

  loading.value = false
}

watch(
  () => renderTableData.value,
  async nv => {
    const selected = nv.filter(item => item.isRelation === 1)
    await nextTick()
    for (const row of selected) {
      elTable.value.toggleRowSelection(row, true)
    }
  }
)

getRoleList()

watch(
  () => show.value,
  () => {
    if (show.value) {
      getRoleList()
    }
  }
)
</script>

<template>
  <el-drawer v-model="show" class="member" title="选择角色" size="500px">
    <div class="flex flex-col h100%">
      <div class="tip mb10px">
        <el-icon color="#F5A937"><WarningFilled /></el-icon>
        <span class="ml10px">用户加入到角色后，将拥有该角色的所有权限。</span>
      </div>
      <el-form ref="formRef" class="h-[calc(100%-130px)]" :model="user">
        <el-form-item label="用户账号：" prop="name">
          <el-input :model-value="user.displayName" disabled></el-input>
        </el-form-item>
        <el-form-item class="h-[calc(100%-80px)]" label="选择角色：">
          <div class="w100% h100%">
            <el-input
              v-model="roleName"
              clearable
              class="mb10px"
              placeholder="请输入用户账号或名称"
              @keydown.enter="getRoleList"
            ></el-input>
            <AgelTable ref="agel" height="calc(100% - 60px)" :columns="columns" :data="renderTableData"> </AgelTable>
          </div>
        </el-form-item>
      </el-form>
      <div class="mt10px flex h60px operate ic">
        <el-button :loading="loading" type="primary" @click="confirm">确定</el-button>
        <el-button color="#E7E9ED" @click="show = false">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="scss">
.operate {
  border-top: 1px solid #eee;
}
.table-commom-ui {
  height: 100%;
}
.member {
  .tip {
    padding: 10px 20px;

    background: #fff4e3;
    font-size: 14px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #000000;
    display: flex;
    align-items: center;
  }
}
</style>
