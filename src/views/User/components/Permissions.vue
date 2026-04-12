<template>
  <MyForm
    :rules="rules"
    :btns="formBtns"
    v-model="infoData"
    label-width="130px"
    :inline="false"
    :options="bigVisOptions"
  >
    <template #bigScreens="{ data: item }">
      <el-radio-group v-model="bigScreensValue">
        <el-radio :value="op.value" v-for="op in item.options" :key="op.value">
          {{ op.label }}
        </el-radio>
      </el-radio-group>
    </template>
  </MyForm>
</template>

<script setup>
import { useUserStore } from '@/stores';

const userStore = useUserStore();

const props = defineProps({
  closeFun: {
    type: Function,
    default: null,
  },
});

const infoData = defineModel('data');
const bigScreensValue = ref(1);

const rules = {};

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
    disabled: true,
  },
  {
    label: '角色：',
    key: 'role',
    type: 'select',
    disabled: true,
    placeholder: '请选择部门',
  },
  {
    label: '权限：',
    key: 'permissions',
    type: 'checkbox',
    width: '100%',
    isCheckAll: true,
    // inline: false,
    labelKey: (item) => {
      return item.meta.title;
    },
    valueKey: 'path',
    options: userStore.authRoutes,
  },
  {
    label: '大屏：',
    key: 'bigScreens',
    type: 'radio',
    width: '100%',
    options: [
      {
        label: '大屏一',
        value: 1,
      },
      {
        label: '大屏二',
        value: 2,
      },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
