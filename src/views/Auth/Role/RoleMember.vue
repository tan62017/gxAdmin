<script setup>
import { WarningFilled } from '@element-plus/icons-vue'
import { addRoleUser as _addRoleUser, getUserListByRoleId } from '@/api'
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
  await addRoleUser()
  emits('confirm')
}

const columns = [
  {
    type: 'selection',
    width: 60
  },
  {
    label: '用户账号',
    prop: 'displayName'
  },
  {
    label: '用户说明',
    prop: 'remark'
  }
]
const tableData = ref([])

async function getUserList() {
  const [err, data] = await to(
    getUserListByRoleId({
      roleId: role.id,
      cache: false
    })
  )
  if (!err) {
    tableData.value = data
  }
}

async function addRoleUser() {
  const selection = elTable.value.getSelectionRows()
  const [err] = await to(
    _addRoleUser({
      roleId: role.id,
      permissionId: selection.map(item => item.id)
    })
  )
  if (!err) {
    ElMessage.success('操作成功')
    show.value = false
  } else {
    ElMessage.error('操作失败')
  }
}

watch(
  () => show.value,
  async val => {
    if (val) {
      await getUserList()
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
  return tableData.value.filter(
    item => item.remark?.includes(roleName.value) || item.displayName.includes(roleName.value)
  )
})
</script>

<template>
  <el-drawer v-model="show" class="member" title="角色成员管理" size="400px">
    <div class="flex flex-col h100%">
      <div class="tip mb10px">
        <el-icon color="#F5A937"><WarningFilled /></el-icon>
        <span class="ml10px">用户加入到角色后，将拥有该角色的所有权限</span>
      </div>
      <el-form ref="formRef" class="h-[calc(100%-130px)]" :model="role">
        <el-form-item required label="角色名称" prop="name">
          <el-input :model-value="role.name" disabled></el-input>
        </el-form-item>
        <el-form-item class="h-[calc(100%-80px)]" label="选择用户">
          <div class="w100% h100%">
            <el-input v-model="roleName" class="mb10px" placeholder="请输入用户账号或名称"></el-input>
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
.table-commom-ui {
  height: 100%;
}
</style>
