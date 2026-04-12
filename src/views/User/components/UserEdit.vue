<template>
  <MyForm
    :rules="rules"
    :btns="formBtns"
    v-model="infoData"
    label-width="130px"
    :inline="false"
    :options="bigVisOptions"
  ></MyForm>
</template>

<script setup>
const props = defineProps({
  closeFun: {
    type: Function,
    default: null,
  },
});

const infoData = defineModel('data');

const rules = {
  name: [
    { required: true, message: '请输入大屏名称', trigger: 'blur' },
    { min: 2, max: 99, message: '名字长度为2~99个文字', trigger: 'blur' },
  ],
  department: [
    {
      required: true,
      message: '请选择部门',
      trigger: 'change',
    },
  ],
  role: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'change',
    },
  ],
};

const formBtns = [
  {
    label: '提交',
    type: 'primary',
    plain: true,
    fun: async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('submit!');
          props.closeFun?.();
        } else {
          console.log('error submit!', fields);
        }
      });
    },
  },
  {
    label: '取消',
    type: 'warning',
    plain: false,
    fun: (formEl) => {
      formEl?.resetFields();
      props.closeFun?.();
    },
  },
];
const bigVisOptions = [
  {
    label: '用户名：',
    key: 'name',
    type: 'input',
    placeholder: '请输入用户名',
  },
  {
    label: '部门：',
    key: 'department',
    type: 'select',
    placeholder: '请选择部门',
    options: [
      {
        label: '部门一',
        value: 1,
      },
      {
        label: '部门二',
        value: 2,
      },
    ],
  },
  {
    label: '角色：',
    key: 'role',
    type: 'select',
    placeholder: '请选择部门',
    options: [
      {
        label: '超级管理员',
        value: 1,
      },
      {
        label: '管理员',
        value: 2,
      },
      {
        label: '系统补录员',
        value: 3,
      },
      {
        label: '数据管理',
        value: 4,
      },
    ],
  },
  {
    label: '状态：',
    key: 'status',
    type: 'switch',
    placeholder: '',
  },
];
</script>
<style lang="scss" scoped></style>
