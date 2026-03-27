<script setup>
import { cloneDeep } from 'lodash-es'
import { formatType } from './config'
import { addAcl, getAclList } from '@/api'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  menu: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['created'])

const options = ref([])

async function getOptions() {
  const res = await getAclList({
    pageNum: 1,
    pageSize: 10000,
    cache: false
  })
  options.value = res.list.map(item => ({
    label: item.name,
    value: item.id
  }))
  options.value.unshift({
    label: '顶级目录',
    value: 0
  })
}

const formRaw = {
  name: '',
  remark: '',
  aclModuleId: 0,
  url: '',
  /**
   * 类型，1：菜单，2：按钮，3：其他
   */
  type: 1,
  key: ''
}

const typeOptions = Object.entries(formatType).map(([key, value]) => ({
  value: +key,
  label: value
}))

const userStore = useUserStore()
const form = ref(cloneDeep(formRaw))

const loading = ref(false)

const formRef = ref(null)

const rules = {
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入菜单code', trigger: 'blur' }]
}

const show = defineModel('modelValue', {
  type: Boolean,
  required: true
})

function confirm() {
  formRef.value.validate(async valid => {
    if (valid) {
      loading.value = true
      console.log(form.value)
      const [err] = await to(
        addAcl({
          ...form.value,
          userName: userStore.userInfo.userName
        })
      )
      if (err) {
        loading.value = false
        return ElMessage.error(err.message)
      }
      show.value = false
      loading.value = false
      ElMessage.success('创建菜单成功')
      form.value = cloneDeep(formRaw)
      emits('created')
    }
  })
}

watch(show, val => {
  if (val) {
    form.value = props.menu || cloneDeep(formRaw)
    getOptions()
  }
})
</script>

<template>
  <el-drawer v-model="show" title="创建角色" size="400px">
    <div class="flex flex-col h100%">
      <el-form ref="formRef" class="flex-1" :rules="rules" :model="form">
        <el-form-item label="父级菜单名称" prop="aclModuleId">
          <el-select-v2
            v-model="form.aclModuleId"
            filterable
            :options="options"
            placeholder="请选择父级菜单名称"
          ></el-select-v2>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name" placeholder="输入一个唯一的菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" prop="type">
          <el-select-v2 v-model="form.type" :options="typeOptions" placeholder=""></el-select-v2>
        </el-form-item>
        <el-form-item label="菜单url" prop="url">
          <el-input v-model="form.url" placeholder="请输入菜单url"></el-input>
        </el-form-item>
        <el-form-item label="菜单code" prop="code">
          <el-input v-model="form.code" placeholder="请输入菜单code"></el-input>
        </el-form-item>
        <el-form-item label="菜单key" prop="key">
          <el-input v-model="form.key" placeholder="输入key"></el-input>
        </el-form-item>
        <el-form-item label="菜单说明">
          <el-input v-model="form.remark" placeholder="输入角色说明，便于记忆哦" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div class="mt10px flex h60px operate ic">
        <el-button :loading="loading" type="primary" @click="confirm">创建</el-button>
        <el-button color="#E7E9ED" @click="show = false">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.operate {
  border-top: 1px solid #eee;
}
</style>
