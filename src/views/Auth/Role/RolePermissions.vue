<script setup>
import { addRolePermissionByRoleId as _addRolePermissionByRoleId, getPermissionListByRoleId } from '@/api'

const { role } = defineProps({
  role: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['confirm'])
const roleName = ref('')
const agel = ref(null)

const elTable = computed(() => agel.value?.getRef())

const show = defineModel('modelValue', {
  type: Boolean,
  required: true
})

async function confirm() {
  await addRolePermissionByRoleId()
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

async function getPermissionList() {
  const [err, data] = await to(
    getPermissionListByRoleId({
      roleId: role.id,
      cache: false
    })
  )
  if (!err) {
    tableData.value = data
  }
}

async function addRolePermissionByRoleId() {
  const selection = elTable.value.getSelectionRows()
  const [err] = await to(
    _addRolePermissionByRoleId({
      roleId: role.id,
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

watch(
  () => show.value,
  async val => {
    if (val) {
      await getPermissionList()
      const selected = tableData.value.filter(item => item.isRelation === 1)
      await nextTick()
      for (const row of selected) {
        elTable.value.toggleRowSelection(row, true)
      }
    }
  },
  {
    immediate: true
  }
)

const renderTableData = computed(() => {
  if (!roleName.value) return tableData.value
  return tableData.value.filter(item => item.name.includes(roleName.value) || item.remark?.includes(roleName.value))
})
</script>

<template>
  <el-drawer v-model="show" title="角色权限管理" size="400px">
    <div class="flex flex-col h100%">
      <el-form ref="formRef" class="h-[calc(100%-60px)]" :model="role">
        <el-form-item required label="角色名称:" prop="name">
          <el-input :model-value="role.name" disabled></el-input>
        </el-form-item>
        <el-form-item class="h-[calc(100%-80px)]" label="选择权限:">
          <div class="w100% h100%">
            <el-input v-model="roleName" class="mb10px" placeholder="请输入权限策略名或说明"></el-input>
            <AgelTable ref="agel" height="calc(100% - 10px)" :columns="columns" :data="renderTableData"> </AgelTable>
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

<style lang="scss" scoped>
.operate {
  border-top: 1px solid #eee;
}
.table-commom-ui {
  height: 100%;
}
</style>
