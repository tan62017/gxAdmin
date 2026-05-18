<template>
  <Content title="数据上传">
    <main class="flex flex-col justify-between h-100% overflow-hidden pl-20px">
      <div class="top flex flex-col flex-1 overflow-hidden">
        <UpdateCsv></UpdateCsv>
      </div>
      <div class="btns self-end">
        <el-button type="primary" size="large" @click="goTo">上传数据</el-button>
        <el-button size="large" @click="cancel">取消</el-button>
      </div>
    </main>
  </Content>
</template>

<script setup>
import UpdateCsv from './components/UpdateCsv.vue';
import LayoutUpdate from './components/LayoutUpdate.vue';
import { Warning } from '@element-plus/icons-vue';
import img from '@/assets/images/pageImgs/ex.png';
import { pxToVh } from '@/utils';
const router = useRouter();
const layoutFlag = ref(false);

const form = ref({
  status: '失败',
  updateType: 'auto',
});
const updateList = ref([
  {
    label: '自动更新',
    value: 'auto',
    status: '失败',
  },
  {
    label: '手动更新',
    value: 'handle',
    status: null,
  },
  {
    label: '上传CSV文件',
    value: 'CSV',
    status: null,
  },
]);
const updateOptions = [
  {
    label: '上传CSV文件',
    value: 'csv',
  },
  {
    label: '局部补录',
    value: 'handle',
  },
];

const dataStatusOptions = [
  {
    label: '当前数据状态：',
    key: 'status',
  },

  {
    label: '',
    key: 'updateType',
    labelWidth: '0',
    height: 'auto',
    type: 'radio',
    width: '100%',
    options: updateList.value,
  },
];

const collapseActiveNames = ref(['CSV']);

const updateStatusMsg = computed(() => {
  const currentUpdate = updateList.value.find((item) => item.value === form.value.updateType);
  return currentUpdate ? currentUpdate : { label: '', status: null };
});

const goTo = () => {
  // 路由跳转
  router.push('/supplemental-admission-create');
};
const cancel = () => {
  // 取消操作
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.slot-status {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  &.sucess {
    background-color: #67c23a;
  }
  &.fail {
    background-color: #f56c6c;
  }
}
.update-btn {
  :deep(.el-button--primary) {
    margin-left: 0;
  }
}
</style>
