<template>
  <div class="form-list-contrain w-full">
    <div class="update-list-title font-size-20px fw-600 mb-12px">上传CSV文件列表</div>
    <el-collapse v-model="collapseActiveNames">
      <template v-for="(item, index) in formList" :key="item.id">
        <el-collapse-item title="" :name="item.id">
          <template #title>
            <div class="coll-title flex items-center">
              <span class="mr-10px font-size-18px fw-600">上传CSV-{{ index + 1 }}</span>
              <el-button plain type="warning" size="small" @click="delectCsv(index)"
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
        </el-collapse-item>
      </template>
    </el-collapse>
    <div class="add-update mt10px">
      <el-button @click="addCsv">
        <el-icon><Plus /></el-icon>添加上传CSV
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { Plus, Close } from '@element-plus/icons-vue';
const firstId = setId();
const collapseActiveNames = ref([firstId]);
const myFormRefs = ref(null);
const formList = ref([
  {
    id: firstId,
    form: {
      sym: null,
      file: [],
    },
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
  file: [
    { required: true, message: '请上传CSV文件', trigger: 'change' },
    { validator: validateFile, trigger: 'change' },
  ],
};

const updateOptions = [
  {
    label: '业务系统：',
    key: 'sym',
    type: 'select',
    placeholder: '请选择业务系统',
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
    label: 'CSV文件：',
    key: 'file',
    type: 'upload',
    placeholder: '请选择CSV文件',
    height: 'auto',
    align: 'flex-start',
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

const delectCsv = (index) => {
  const deItem = formList.value.splice(index, 1)[0];
  collapseActiveNames.value = collapseActiveNames.value.filter((i) => i !== deItem.id);
};
const addCsv = () => {
  const cId = setId();
  collapseActiveNames.value.push(cId);
  formList.value.push({
    id: cId,
    form: {
      sym: null,
      file: [],
    },
  });
};
function setId() {
  return Math.random().toString(36).substring(2, 18);
}
onMounted(() => {});
</script>
<style lang="scss" scoped></style>
