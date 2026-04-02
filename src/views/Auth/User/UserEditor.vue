<script setup>
import { md5 } from 'js-md5';
import { addAuthUser } from '@/api';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(['confirm']);

const form = ref({
  userName: '', // 账号  唯一
  displayName: '', // 昵称
  password: '',
  surePassword: '',
});
const loading = ref(false);
const formRef = ref(null);

const show = defineModel('modelValue', {
  type: Boolean,
  required: true,
});

const isEdit = computed(() => !!props.user.id);

const rules = {
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  displayName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  surePassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
};

// 获取加密后form
function getEncodeForm() {
  if (isEdit.value) {
    return {
      displayName: form.value.displayName,
      id: props.user.id,
    };
  }
  return {
    displayName: form.value.displayName,
    userName: form.value.userName,
    password: md5(form.value.password),
  };
}

async function confirm() {
  loading.value = true;
  await addUserUserPermission();
  loading.value = false;
  show.value = false;
  emits('confirm');
}

async function addUserUserPermission() {
  const [err] = await to(addAuthUser(getEncodeForm()));
  if (!err) {
    ElMessage.success('添加成功');
    show.value = false;
  } else {
    ElMessage.error('添加失败');
  }
}

watch(show, (nv) => {
  if (nv) {
    form.value = {
      userName: props.user.userName || '', // 账号  唯一
      displayName: props.user.displayName || '', // 昵称
      password: props.user.password || '',
      surePassword: props.user.password || '',
    };
  }
});

function submit() {
  formRef.value.validate((valid) => {
    if (valid) {
      confirm();
    }
  });
}
</script>

<template>
  <el-drawer v-model="show" class="member" :title="`${isEdit ? '修改' : '新增'}角色`" size="500px">
    <div class="flex flex-col h100%">
      <el-form ref="formRef" class="h-[calc(100%-130px)]" :model="form" :rules="rules">
        <el-form-item label="账号：" prop="userName">
          <el-input
            v-model="form.userName"
            :disabled="isEdit"
            placeholder="请输入用户账号"
            @keydown.enter="submit"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="displayName">
          <el-input
            v-model="form.displayName"
            placeholder="请输入用户姓名"
            @keydown.enter="submit"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!isEdit" prop="password" label="密码：">
          <el-input
            v-model="form.password"
            clearable
            class="mb10px"
            placeholder="请输入用户密码"
            :disabled="isEdit"
            type="password"
            show-password
            @keydown.enter="submit"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!isEdit" prop="surePassword" label="确认密码：">
          <el-input
            v-model="form.surePassword"
            clearable
            class="mb10px"
            placeholder="确认密码"
            type="password"
            show-password
            @keydown.enter="submit"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="mt10px flex h60px operate ic">
        <el-button :loading="loading" type="primary" @click="submit">确定</el-button>
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
