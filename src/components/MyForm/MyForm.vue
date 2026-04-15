<script setup>
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  btns: {
    type: Array,
  },
  isline: {
    typr: Boolean,
    default: false,
  },
  itemWidth: {
    type: [String, Function],
    default: '400px',
  },
  itemHeight: {
    type: [String, Function],
    default: '30px',
  },
  labelWidth: {
    type: [String, Function],
    default: '100px',
  },
  showBtn: {
    typr: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const ruleFormRef = ref(null);
// const slots = useSlots()
const form = defineModel('modelValue', {
  required: true,
  type: Object,
});

const _optionsMap = ref({});

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);

function getOptions(item) {
  if (typeof item.options === 'function') {
    return _optionsMap.value[item.key] || [];
  }
  return item.options;
}

function getWidth(item, index) {
  const itemWidth = item.width || props.itemWidth;
  if (typeof itemWidth === 'function') {
    return itemWidth(item, index);
  }
  return itemWidth;
}
function getHeight(item, index) {
  const itemHeight = item.height || props.itemHeight;
  if (typeof itemHeight === 'function') {
    return itemHeight(item, index);
  }
  return itemHeight;
}
async function fetchOptions(item) {
  if (typeof item.options === 'function') {
    const options = await item.options();
    _optionsMap.value[item.key] = options;
  }
}

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};
const handleRemove = (file, list) => {
  const index = list.findIndex((i) => i == file);
  list.splice(index, 1);
  //   index
};

const btnClick = (item) => {
  if (item?.fun) {
    item.fun(ruleFormRef.value);
  }
};

function _init() {
  props.options.forEach((item) => {
    if (item.type === 'select' || item.type === 'cascader') {
      watchEffect(() => fetchOptions(item));
    }
  });
}

_init();

defineExpose({
  formRef: ruleFormRef.value,
});
</script>

<template>
  <div class="search-form">
    <el-form
      ref="ruleFormRef"
      :model="form"
      class="w-full"
      :class="{ 'demo-form-inline': props.isline }"
    >
      <div class="form-content" :class="{ 'form-content-inline': props.isline }">
        <el-form-item
          v-for="(item, index) in options"
          :key="item.key"
          :style="{ width: getWidth(item, index), height: getHeight(item, index) }"
          :label="item.label"
          :prop="item.key"
          :label-width="item.labelWidth || labelWidth"
        >
          <slot :name="item.key" :data="item">
            <el-input
              v-if="item.type === 'input'"
              style="height: 100%; width: 100%"
              v-model="form[item.key]"
              :placeholder="item.placeholder || '请输入内容'"
              clearable
              :disabled="props.disabled || item.disabled"
            />
            <el-input
              v-if="item.type === 'textarea'"
              style="height: 100%; width: 100%"
              v-model="form[item.key]"
              type="textarea"
              :placeholder="item.placeholder || '请输入内容'"
              clearable
              :disabled="props.disabled || item.disabled"
            />
            <MyCheckBox
              v-if="item.type === 'checkbox'"
              v-model="form[item.key]"
              :options="getOptions(item)"
              :label="item.labelKey"
              :value="item.valueKey"
              :disabled="props.disabled || item.disabled"
              :inline="typeof item.inline === 'boolean' ? item.inline : true"
              :isCheckAll="item.isCheckAll"
            >
              <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
                <slot :name="slotName" v-bind="slotProps" />
              </template>
            </MyCheckBox>
            <el-radio-group
              v-model="form[item.key]"
              v-if="item.type === 'radio'"
              :disabled="props.disabled || item.disabled"
            >
              <el-radio
                :value="op.value"
                v-for="op in getOptions(item)"
                :disabled="op.disabled"
                :key="op.value"
              >
                {{ op.label }}
              </el-radio>
            </el-radio-group>
            <el-switch
              :disabled="props.disabled || item.disabled"
              v-if="item.type === 'switch'"
              v-model="form[item.key]"
            />
            <el-select
              v-model="form[item.key]"
              :multiple="item.multiple"
              v-if="item.type === 'select'"
              :placeholder="item.placeholder || '请选择'"
              style="height: 100%; width: 100%"
              clearable
              :disabled="props.disabled || item.disabled"
            >
              <el-option
                v-for="op in getOptions(item)"
                :key="op.value"
                :label="op.label"
                :value="op.value"
                :disabled="op.disabled"
              />
            </el-select>

            <el-upload
              action="#"
              v-if="item.type === 'upload'"
              v-model:file-list="form[item.key]"
              list-type="picture-card"
              :auto-upload="false"
              :limit="item.limit || 1"
              :disabled="props.disabled || item.disabled"
            >
              <el-icon><Plus /></el-icon>

              <template #file="{ file }">
                <div>
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <el-icon><zoom-in /></el-icon>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file, form[item.key])"
                    >
                      <el-icon><Delete /></el-icon>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
            <el-cascader
              v-if="item.type === 'cascader'"
              style="height: 100%"
              v-model="form[item.key]"
              :options="getOptions(item)"
              filterable
              :props="{ checkStrictly: true }"
              clearable
              :placeholder="item.placeholder || '请选择'"
              :disabled="props.disabled || item.disabled"
            />
            <el-date-picker
              v-if="item.type === 'date'"
              style="height: 100%; width: 100%"
              v-model="form[item.key]"
              :placeholder="item.placeholder || '请选择时间'"
              :type="item.dateType"
              :disabled="props.disabled || item.disabled"
            />
          </slot>
        </el-form-item>
      </div>
      <el-form-item v-if="showBtn && btns?.length">
        <slot name="action">
          <div class="btns">
            <el-button
              :type="btn.type"
              :plain="btn.plain"
              :size="btn.size || ''"
              v-for="btn in btns"
              :key="btn.label"
              @click="btnClick(btn)"
              >{{ btn.label }}</el-button
            >
          </div>
        </slot>
      </el-form-item>
    </el-form>
  </div>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<style lang="scss" scoped>
.search-form {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;
  .form-content {
    flex: 1;
    width: 100%;
    display: flex;
    // flex-wrap: wrap;
    flex-direction: column;
    overflow: auto;
  }
  .form-content-inline {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row !important;
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
  }
  .demo-form-inline {
    // display: flex !important;
    flex-direction: row !important;
  }
  :deep(.el-form) {
    flex: 1;
    display: flex;
    flex-direction: column;
    // height: 100%;
    overflow: hidden;
    .el-form-item {
      display: flex;
      align-items: center;
      .el-form-item__label {
        display: block;
        font-size: 16px;
        font-family: Source Han Sans CN, Source Han Sans CN-400;
        font-weight: 400;
        text-align: RIGHT;
        letter-spacing: 3px;
        // text-align-last: justify;
        color: #3f465f;
      }
      .el-form-item__content {
        height: 100%;
      }
      .el-select__wrapper {
        height: 100%;
      }
    }
  }
  :deep(.el-form--inline) {
    display: flex;
    align-items: center;
  }
}
</style>
