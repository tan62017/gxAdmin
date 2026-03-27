<script setup>
import { addRole } from '@/api'

const emits = defineEmits(['created'])

const form = ref({
  name: '',
  remark: ''
})

const loading = ref(false)

const formRef = ref(null)

const rules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
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
        addRole({
          ...form.value
        })
      )
      if (err) {
        loading.value = false
        return ElMessage.error(err.message)
      }
      show.value = false
      loading.value = false
      ElMessage.success('创建角色成功')
      form.value = {
        name: '',
        remark: ''
      }
      emits('created')
    }
  })
}
</script>

<template>
  <el-drawer v-model="show" title="创建角色" size="400px">
    <div class="flex flex-col h100%">
      <el-form ref="formRef" class="flex-1" :rules="rules" :model="form">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="输入一个唯一的角色名称"></el-input>
          <div class="c-#aaa">最大长度64个字符，允许中文，英文字母，数字，或特殊符号</div>
        </el-form-item>
        <el-form-item label="角色说明">
          <el-input v-model="form.description" placeholder="输入角色说明，便于记忆哦" type="textarea"></el-input>
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
