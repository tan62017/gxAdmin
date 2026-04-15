<template>
  <MyForm
    class="my-form-box"
    :rules="rules"
    :btns="formBtns"
    v-model="infoData"
    label-width="130px"
    :options="bigVisOptions"
  >
    <template #bigScreens="{ data: item }">
      <el-radio-group v-model="bigScreensValue">
        <el-radio :value="op.value" v-for="op in item.options" :key="op.value">
          {{ op.label }}
        </el-radio>
      </el-radio-group>
    </template>
    <template #bigTypes="{ data: item }">
      <MyCheckBox
        v-model="bigTypesChecks"
        :options="item.options"
        label="label"
        value="label"
        :inline="true"
        :isCheckAll="true"
      >
      </MyCheckBox>
    </template>
    <template #bigvisDefaultList>
      <MyCheckBox
        class="bigvis-default-list-box"
        v-model="bigVisCheckedList"
        :options="bigVisDefaultList"
        label="label"
        value="label"
        :inline="true"
        :isCheckAll="true"
      >
        <template v-for="item in bigVisDefaultList" :key="item.label" #[item.label]>
          <div class="option-slot">
            <div
              v-show="bigScreensValue !== 1"
              class="img w-100% h-140px"
              :style="{ backgroundImage: `url(${item.icon})` }"
            ></div>
            <div class="label">{{ item.label }}</div>
          </div>
        </template>
      </MyCheckBox>
    </template>
  </MyForm>
</template>

<script setup>
import { useUserStore } from '@/stores';
import { navList } from '@/config';
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

const bigTypesChecks = ref([]);

const bigVisDefaultList = ref([]);

const bigVisCheckedList = ref([]);

const bigVisList = computed(() => {
  return navList.value.slice(1);
});

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
        label: '文字列表',
        value: 1,
      },
      {
        label: '图文列表',
        value: 2,
      },
    ],
  },
  {
    label: '大屏分类：',
    key: 'bigTypes',
    type: 'checkbox',
    width: '100%',
    height: 'auto',
    options: bigVisList.value,
    isCheckAll: true,
  },
  {
    label: '',
    key: 'bigvisDefaultList',
    type: 'checkbox',
    width: '100%',
    height: 'auto',
    isCheckAll: true,
  },
];

watch(
  () => bigTypesChecks.value,
  (newVal) => {
    bigVisDefaultList.value = [];
    // console.log('bigTypesChecks changed:', newVal);
    bigVisList.value.filter((item) => {
      if (newVal.includes(item.label)) {
        // console.log('Selected item:', item);
        bigVisDefaultList.value.push(...item.listAll);
      }
    });
    console.log(bigVisDefaultList.value);
  },
);
</script>
<style lang="scss" scoped>
.my-form-box {
  height: calc(100% - 100px);
  overflow: hidden;
  :deep(.form-content) {
    height: calc(100% - 100px);
    overflow: auto;
  }
}
.bigvis-default-list-box {
  :deep(.checked-all-box) {
    align-self: flex-start;
  }
  :deep(.checked-list-options) {
    display: flex;
    flex-wrap: wrap;
    label.el-checkbox {
      display: flex;
      width: 20%;
      height: auto;
      margin: 10px 20px;
      overflow: hidden;
      // display: flex;
      // align-items: flex-end;
      // justify-content: flex-start;
      // width: auto;
    }
    span.el-checkbox__input,
    span.el-checkbox__label {
      display: block;
      // width: 100%;
      align-self: flex-end;
      // margin-bottom: 10px;
    }
    span.el-checkbox__input {
      margin-bottom: 2px;
    }
    span.el-checkbox__label {
      // flex: 1;
      width: calc(100% - 18px);
    }
    .option-slot {
      width: 100%;
      overflow: hidden;
      .img {
        background-size: 100% 100%;
      }
      .label {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      // height: 120px;
    }
  }
}
</style>
