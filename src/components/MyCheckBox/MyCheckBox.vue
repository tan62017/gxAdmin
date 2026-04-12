<template>
  <div class="my-checkbox w-full" :class="{ 'is-line': inline }">
    <div class="mr-20px">
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
      >
        全选
      </el-checkbox>
    </div>
    <el-checkbox-group
      class="flex-1"
      :disabled="disabled"
      v-model="modelValue"
      @change="handleCheckedCitiesChange"
    >
      <el-checkbox
        v-for="op in options"
        :key="op[props.value || 'value']"
        :label="typeof props.label === 'function' ? props.label(op) : op[props.label || 'label']"
        :value="op[props.value || 'value']"
        :disabled="op.disabled"
      >
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    // type: String,
    // default: '',
  },
  value: {
    type: String,
    default: '',
  },
  inline: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const modelValue = defineModel('modelValue');

const checkAll = ref(false);
const isIndeterminate = ref(false);

const handleCheckAllChange = (val) => {
  modelValue.value = val ? props.options.map((item) => item[props.value || 'value']) : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === props.options.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < props.options.length;
};
</script>
<style lang="scss" scoped>
.my-checkbox {
  // display: block;

  //   flex-direction: row;
}
.is-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  //   flex-direction: column;
}
</style>
