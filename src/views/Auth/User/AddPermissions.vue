<script setup>
import { addRolePermission as _addRolePermission, getPermissionList as _getPermissionList } from '@/api'
const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['confirm'])

const agel = ref(null)

const elTable = computed(() => agel.value?.getRef())

const roleName = ref('')

const show = defineModel('modelValue', {
  type: Boolean,
  required: true
})

function confirm() {
  addRolePermission()
  emits('confirm')
}

const columns = [
  {
    type: 'selection',
    width: 60
  },
  {
    label: '权限名称',
    prop: 'name'
  },
  {
    label: '权限说明',
    prop: 'remark'
  }
]

const tableData = ref([])

const renderTableData = computed(() => {
  if (!roleName.value) return tableData.value
  return tableData.value.filter(item => item.name.includes(roleName.value) || item.remark?.includes(roleName.value))
})

async function getPermissionList() {
  const res = await _getPermissionList({
    selUserId: props.user.id,
    cache: false
  })

  tableData.value = res
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

async function addRolePermission() {
  const selection = elTable.value.getSelectionRows()

  const [err] = await to(
    _addRolePermission({
      selUserId: props.user.id,
      permissionId: selection.map(item => item.id),
      cache: false
    })
  )
  if (!err) {
    ElMessage.success('添加成功')
    show.value = false
  } else {
    ElMessage.error('添加失败')
  }
}

getPermissionList()

watch(
  () => show.value,
  () => {
    if (show.value) {
      getPermissionList()
    }
  }
)
</script>

<template>
  <el-drawer v-model="show" class="member" title="添加权限" size="400px">
    <div class="flex flex-col h100%">
      <el-form ref="formRef" class="h-[calc(100%-60px)]" :model="user">
        <el-form-item label="用户账号:" prop="name">
          <el-input :model-value="user.displayName" disabled></el-input>
        </el-form-item>
        <el-form-item class="h-[calc(100%-80px)]" label="选择权限：">
          <div class="w100% h100%">
            <el-input v-model="roleName" class="mb10px" placeholder="请输入权限策略名称或说明"></el-input>
            <AgelTable ref="agel" height="calc(100%)" :columns="columns" :data="renderTableData"> </AgelTable>
          </div>
        </el-form-item>
      </el-form>
      <div class="mt10px flex h60px operate ic">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button color="#E7E9ED" @click="show = false">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="scss">
.operate {
  border-top: 1px solid #eee;
}
.member {
  .tip {
    padding: 0 20px;
    height: 32px;
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
