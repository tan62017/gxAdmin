<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  itemWidth: {
    type: [String, Function],
    default: '200px'
  },
  showSearch:{
    typr:Boolean,
    default:true
  }
})

// const slots = useSlots()
const form = defineModel('modelValue', {
  required: true,
  type: Object
})

const _optionsMap = ref({})

function getOptions(item) {
  if (typeof item.options === 'function') {
    return _optionsMap.value[item.key] || []
  }
  return item.options
}

function getWidth(item, index) {
  const itemWidth = item.width || props.itemWidth
  if (typeof itemWidth === 'function') {
    return itemWidth(item, index)
  }
  return itemWidth
}

async function fetchOptions(item) {
  if (typeof item.options === 'function') {
    const options = await item.options()
    _optionsMap.value[item.key] = options
  }
}

function _init() {
  props.options.forEach(item => {
    if (item.type === 'select' || item.type === 'cascader') {
      watchEffect(() => fetchOptions(item))
    }
  })
}

_init()
</script>

<template>
  <div class="search-form">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item
        v-for="(item, index) in options"
        :key="item.key"
        :style="{ width: getWidth(item, index) }"
        :label="item.label"
      >
        <slot :name="item.key">
          <el-input
            v-if="item.type === 'input'"
            v-model="form[item.key]"
            :placeholder="item.placeholder || '请输入内容'"
          />
          <el-select-v2
            v-if="item.type === 'select'"
            v-model="form[item.key]"
            :options="getOptions(item)"
            clearable
            :placeholder="item.placeholder || '请选择'"
          />
          <el-cascader
            v-if="item.type === 'cascader'"
            v-model="form[item.key]"
            :options="getOptions(item)"
            filterable
            :props="{ checkStrictly: true }"
            clearable
            :placeholder="item.placeholder || '请选择'"
          />
          <el-date-picker
            v-if="item.type ==='month'"
            v-model="form[item.key]"
            :placeholder="item.placeholder || '请选择年月'"
            :type="item.type"
        />
        </slot>
      </el-form-item>
      <el-form-item v-if="showSearch">
        <slot name="action">
          <el-button type="primary">查询</el-button>
        </slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.search-form {
  display: flex;
  flex-wrap: wrap;
  :deep(.el-form) {
    .el-form-item {
      .el-form-item__label {
        font-size: 16px;
        font-family: Source Han Sans CN, Source Han Sans CN-400;
        font-weight: 400;
        text-align: RIGHT;
        color: #3f465f;
      }
    }
  }
}
</style>
