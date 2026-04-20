<template>
  <Content title="数据状态">
    <main class="flex flex-col justify-between h-100%">
      <MyForm
        itemWidth="100%"
        :disabled="true"
        v-model="form"
        :item-height="$pxToVh(55)"
        :label-width="$pxToRem(200)"
        :options="dataStatusOptions"
      >
        <template #status="{ data: item }">
          <div class="slot-status" :class="[form[item.key] === '成功' ? 'sucess' : 'fail']"></div>
        </template>
        <template #system="{ data: item }">
          <div class="slot-syms w-full flex">
            <div
              class="w-auto flex items-center mr-30px"
              v-for="sys in form[item.key]"
              :key="sys.label"
            >
              <div class="label w-auto whitespace-nowrap mr4px">{{ sys.label }}</div>
              <el-icon class="cursor-pointer" @click="symClick(item)"><Warning /></el-icon>
            </div>
          </div>
        </template>
        <template #updateType="{ data: item }">
          <div class="slot-update-type flex items-center w-full">
            <div class="slot-update-type flex-shrink-0 mr-30px">{{ form[item.key] }}</div>
            <MyCheckBox
              v-model="form.updateList"
              :options="updateOptions"
              label="label"
              value="value"
              :disabled="true"
              :inline="typeof item.inline === 'boolean' ? item.inline : true"
              :isCheckAll="item.isCheckAll"
            >
            </MyCheckBox>
          </div>
        </template>
      </MyForm>
      <div class="btns self-end">
        <el-button type="primary" size="large" @click="goTo">创建补录</el-button>
        <el-button size="large" @click="cancel">取消</el-button>
      </div>
    </main>
    <el-dialog v-model="dialogVisible">
      <div class="dialog-sym flex">
        <el-image class="w-800px h-600px" :src="dialogImageUrl" fit="contain" />
        <div class="msg">{{ symMsg }}</div>
      </div>
    </el-dialog>
  </Content>
</template>

<script setup>
import { Warning } from '@element-plus/icons-vue';
import img from '@/assets/images/pageImgs/ex.png';
const router = useRouter();

const form = ref({
  user: '张三',
  status: '成功',
  dateTime: '2024-06-01',
  system: [
    {
      label: '社保资金链路驾驶仓',
      icon: img,
      content: '社保资金链路驾驶仓介绍撒旦黑龙江是的愤怒恐惧你看----------',
      typesLine: ['对公条线-机构业务'],
      num: 0,
      checked: false,
    },
    {
      label: '社保资金链路驾驶仓',
      icon: img,
      content: '社保资金链路驾驶仓介绍撒旦黑龙江是的愤怒恐惧你看----------',
      typesLine: ['对公条线-机构业务'],
      num: 0,
      checked: false,
    },
  ],
  updateType: '自动',
  updateList: ['csv', 'handle'],
  fileName: 'Football.csv',
});
const dialogVisible = ref(false);
const dialogImageUrl = ref(img);
const symMsg = ref({});
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
    label: '数据更新时间：',
    key: 'dateTime',
    type: 'input',
    width: '400px',
  },
  {
    label: '业务系统：',
    key: 'system',
  },
  {
    label: '更新方式：',
    key: 'updateType',
  },
  {
    label: '相关文件：',
    key: 'fileName',
    type: 'input',
    width: '400px',
  },
  {
    label: '操作员：',
    key: 'user',
    type: 'input',
    width: '300px',
  },
];

const symClick = (item) => {
  dialogVisible.value = true;
  symMsg.value = item;
};
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
    color: #f31c1c;
  }
}
</style>
