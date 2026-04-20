<template>
  <Content title="创建补录">
    <main class="flex flex-col justify-between h-100% overflow-hidden pl-20px">
      <div class="top flex flex-col flex-1 overflow-hidden">
        <div class="h-full overflow-y-auto">
          <MyForm
            itemWidth="100%"
            v-model="form"
            :label-width="$pxToVh(200)"
            :options="dataStatusOptions"
            class="update-status-form"
            :style="{ height: 'auto' }"
          >
            <template #status="{ data: item }">
              <div
                class="slot-status"
                :class="[form[item.key] === '正常' ? 'sucess' : 'fail']"
              ></div>
            </template>
            <template #system="{ data: item }">
              <div class="slot-syms w-full flex">
                <div
                  class="w-auto flex items-center mr-30px"
                  v-for="sys in form[item.key]"
                  :key="sys.label"
                >
                  <div class="label w-auto whitespace-nowrap mr4px">{{ sys.label }}</div>
                  <el-icon><Warning /></el-icon>
                </div>
              </div>
            </template>
          </MyForm>
          <div class="update-btn">
            <div
              v-show="updateStatusMsg?.status"
              class="update-status mb-20px"
              :class="updateStatusMsg?.status === '成功' ? 'color-#67c23a' : 'color-#f31c1c'"
            >
              {{ updateStatusMsg?.label + updateStatusMsg?.status }}
            </div>
            <el-button
              v-show="form.updateType !== 'CSV'"
              plain
              type="success"
              size="large"
              @click="goTo"
              >点击{{ updateStatusMsg?.label }}</el-button
            >
            <!-- <el-button v-show="form.updateType === 'CSV'" type="primary" size="large" @click="goTo"
            >上传CSV文件</el-button
          > -->
            <UpdateCsv v-show="form.updateType === 'CSV'"></UpdateCsv>
          </div>
          <el-divider border-style="dashed" />
          <div class="layout-check">
            <el-checkbox v-model="layoutFlag" label="局部补录" size="large" />
          </div>
          <LayoutUpdate v-show="layoutFlag"></LayoutUpdate>
        </div>
      </div>
      <div class="btns self-end">
        <el-button type="primary" size="large" @click="goTo">创建补录</el-button>
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
