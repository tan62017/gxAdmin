<template>
  <div class="w-full flex items-center justify-between">
    <div class="left flex items-end">
      <Title title="补录系统"></Title>
      <div class="create ml-20px cursor-pointer" @click="create">创建角色</div>
    </div>
    <div class="right flex items-center justify-end">
      <div class="form-title mr16px">角色检索</div>
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

const router = useRouter();

const emits = defineEmits(['create']);

const formData = ref({
  name: '',
});

const formOptions = [
  {
    label: '',
    key: 'name',
    type: 'input',
    placeholder: '角色名称',
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

const create = () => {
  emits('create');
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
