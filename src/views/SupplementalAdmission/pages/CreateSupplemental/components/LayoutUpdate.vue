<template>
  <div class="form-list-contrain w-full">
    <el-collapse v-model="collapseActiveNames">
      <template v-for="(item, index) in formList" :key="item.id">
        <el-collapse-item title="" :name="item.id">
          <template #title>
            <div class="coll-title font-size-19px fw-600 flex items-center">
              <span class="mr-10px">局部补录{{ index + 1 }}</span>
              <el-button plain type="warning" size="small" @click="delectUpdate(index)"
                ><el-icon><Close /></el-icon
              ></el-button>
            </div>
          </template>

          <MyForm
            class="mb-5px"
            ref="myFormRefs"
            :options="updateOptions"
            v-model="item.form"
            :rules="rules"
            :isline="true"
            :label-width="$pxToVh(200)"
            :style="{ height: 'auto' }"
          >
            <template #sym="{ data }">
              <el-select
                v-model="item.form.sym"
                :placeholder="data.placeholder || '请选择'"
                style="height: 100%; width: 100%"
                clearable
              >
                <el-option
                  v-for="op in data.options"
                  :key="op.value"
                  :label="op.label"
                  :value="op.value"
                  :disabled="op.disabled"
                />
              </el-select>
            </template>
            <template #file>
              <el-upload
                action="#"
                v-model:file-list="item.form.file"
                :auto-upload="false"
                :limit="1"
                :on-change="(file, fileList) => fileVadit(file, fileList, item.form, index)"
                :on-remove="(file, fileList) => removeFile(file, fileList, item.form, index)"
              >
                <el-button type="primary" size="large">上传CSV文件</el-button>
              </el-upload>
            </template>
          </MyForm>
          <template v-for="(targetItem, targetIndex) in item.targets" :key="targetItem.id">
            <div class="target-box flex items-center relative">
              <div class="target-form flex-1">
                <MyForm
                  class="mb-5px"
                  ref="myFormRefs"
                  :options="targetOptions"
                  v-model="targetItem.form"
                  :rules="rules"
                  :isline="true"
                  :label-width="$pxToVh(200)"
                  :style="{ height: 'auto' }"
                >
                </MyForm>
              </div>
              <div
                class="target-tools flex justify-around absolute top-50% left-92% translate-y-[-50%]"
              >
                <el-icon
                  :size="26"
                  class="mr10px"
                  v-show="targetIndex !== 0"
                  @click="targetIconClick('-', item.targets, targetIndex)"
                >
                  <Minus class="font-size-26px" />
                </el-icon>
                <el-icon
                  :size="26"
                  v-show="targetIndex === item.targets.length - 1"
                  @click="targetIconClick('+', item.targets, targetIndex)"
                >
                  <Plus class="font-size-26px" />
                </el-icon>
              </div>
            </div>
          </template>
        </el-collapse-item>
      </template>
    </el-collapse>
    <div class="add-update mt-10px">
      <el-button @click="addUpdate">
        <el-icon><Plus /></el-icon>添加局部补录
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { Plus, Close, Minus } from '@element-plus/icons-vue';
const myFormRefs = ref(null);
const firstId = setId();
const collapseActiveNames = ref([firstId]);
const formList = ref([
  {
    id: firstId,
    form: {
      sym: null,
      dateTime: null,
      file: [],
    },
    targets: [
      {
        id: setId(),
        form: {
          target: null,
          value: null,
        },
      },
    ],
  },
]);
const rules = {
  sym: [
    {
      required: true,
      message: '请选择业务系统',
      trigger: 'blur',
    },
  ],
  dateTime: [
    {
      required: true,
      message: '请选择录入时间',
      trigger: 'blur',
    },
  ],
  target: [
    {
      required: true,
      message: '请选择指标',
      trigger: 'blur',
    },
  ],
  //   value: [
  //     {
  //       required: true,
  //       message: '请输入数据',
  //       trigger: 'blur',
  //     },
  //   ],
  //   file: [
  //     { required: true, message: '请上传CSV文件', trigger: 'change' },
  //     { validator: validateFile, trigger: 'change' },
  //   ],
};
const updateOptions = [
  {
    label: '业务系统：',
    key: 'sym',
    type: 'select',
    placeholder: '请选择业务系统',
    width: '45%',
    options: [
      {
        label: '社保大屏',
        value: 1,
      },
      {
        label: '行长日报',
        value: 2,
      },
    ],
  },
  {
    label: '数据时间：',
    key: 'dateTime',
    type: 'date',
    width: '45%',
  },
  {
    label: 'CSV文件：',
    key: 'file',
    type: 'upload',
    placeholder: '请选择CSV文件',
    height: 'auto',
    align: 'flex-start',
  },
];

const targetOptions = [
  {
    label: '指标：',
    key: 'target',
    type: 'select',
    placeholder: '请选择指标',
    width: '45%',
    options: [
      {
        label: '社保大屏',
        value: 1,
      },
      {
        label: '行长日报',
        value: 2,
      },
    ],
  },
  {
    label: '数据内容：',
    key: 'value',
    type: 'input',
    width: '45%',
  },
];

// 自定义校验函数：同时支持 IPv4 和 IPv6
function validateFile(rule, value, callback) {
  console.log(rule, value, callback);

  // value 是文件列表数组
  if (!value || value.length === 0) {
    callback(new Error('请上传CSV文件'));
    return;
  }

  const file = value[0].raw; // 获取原始File对象

  // 验证文件类型
  const isValidType = file.name.endsWith('.csv') || file.type === 'text/csv';
  if (!isValidType) {
    callback(new Error('请上传CSV格式的文件'));
    return;
  }
  callback();
}

const fileVadit = (file, fileList, item, index) => {
  console.log(myFormRefs.value[index]);
  myFormRefs.value[index].formRef?.validateField('file');

  return;
};
const removeFile = (file, fileList, itmForm, index) => {
  itmForm.file = [];
  myFormRefs.value[index].formRef?.validateField('file');
};
const handleExceed = (file, item) => {
  console.log(file, item);
};

const targetIconClick = (type, itemTarget, index) => {
  if (type === '-') {
    itemTarget.splice(index, 1);
  } else {
    itemTarget.push({
      id: setId(),
      form: {
        target: null,
        value: null,
      },
    });
  }
};

const delectUpdate = (index) => {
  const deItem = formList.value.splice(index, 1)[0];
  //   const dIndex = collapseActiveNames.value.findIndex((f) => f === deItem.id);
  collapseActiveNames.value = collapseActiveNames.value.filter((i) => i !== deItem.id);
};
const addUpdate = () => {
  const createId = setId();
  collapseActiveNames.value.push(createId);
  formList.value.push({
    id: createId,
    form: {
      sym: null,
      dateTime: null,
      file: [],
    },
    targets: [
      {
        id: setId(),
        form: {
          target: null,
          value: null,
        },
      },
    ],
  });
};

onMounted(() => {});
function setId() {
  return Math.random().toString(36).substring(2, 18);
}
onMounted(() => {});
</script>
<style lang="scss" scoped>
.target-tools {
  .el-icon {
    cursor: pointer;
  }
}
</style>
