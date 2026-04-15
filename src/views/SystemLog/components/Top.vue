<template>
  <div class="w-full flex items-center justify-between">
    <div class="left flex items-center">
      <Title title="系统日志"></Title>
    </div>
    <div class="right flex items-center justify-end">
      <div class="form-title mr16px">日志检索</div>
      <MyForm
        :btns="formBtns"
        itemWidth="160px"
        v-model="formData"
        label-width="0"
        :isline="true"
        :options="formOptions"
      ></MyForm>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const router = useRouter();

const formData = ref({
  time: '',
  user: '',
  unit: '',
});

const formOptions = [
  {
    label: '',
    key: 'time',
    type: 'input',
    placeholder: '时间',
  },
  {
    label: '',
    key: 'user',
    type: 'input',
    placeholder: '用户',
  },
  {
    label: '',
    key: 'unit',
    type: 'select',
    placeholder: '部门',
    options: [
      { label: '部门1', value: '部门1' },
      { label: '部门2', value: '部门2' },
    ],
  },
];

const formBtns = [
  {
    label: '搜索',
    type: 'primary',
    plain: true,
    fun: async () => {},
  },
];

const goDataStatus = () => {
  router.push({
    path: '/supplemental-admission-data-status',
  });
};
</script>

<style lang="scss" scoped>
.create {
  text-decoration: underline;
}
.right {
  :deep(.el-form-item) {
    margin-bottom: 0;
    margin-right: 8px;
    .btns {
      margin-top: 0;
    }
  }
}
</style>
