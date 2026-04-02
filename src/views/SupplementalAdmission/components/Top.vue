<template>
  <div class="w-full flex items-center justify-between">
    <div class="left flex items-center">
      <Title title="补录系统"></Title>
      <div class="status mx-20px flex items-center">
        数据状态
        <div class="cirl w8px h8px ml-4px border-rd-50 bg-[#adf664]"></div>
      </div>
      <div class="create">创建补录</div>
    </div>
    <div class="right flex items-center justify-end">
      <div class="form-title mr16px">数据检索</div>
      <MyForm
        :btns="formBtns"
        itemWidth="160px"
        v-model="formData"
        label-width="0"
        inline
        :options="formOptions"
      ></MyForm>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const formData = ref({
  name: '',
  dateTime: '',
  time: '',
});

const formOptions = [
  {
    label: '',
    key: 'name',
    type: 'input',
    placeholder: '补录系统',
  },
  {
    label: '',
    key: 'dateTime',
    type: 'date',
    placeholder: '补录时间',
  },
  {
    label: '',
    key: 'time',
    type: 'date',
    placeholder: '数据时间',
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
