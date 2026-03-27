<script setup>
defineProps({
  options: {
    type: Array,
    required: true
  }
})

const modelValue = defineModel('modelValue', {
  type: [String, Number],
  required: true
})
</script>

<template>
  <div class="switch">
    <div
      v-for="item in options"
      :key="item.label"
      class="option"
      :class="{ active: modelValue === item.value }"
      @click="modelValue = item.value"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.switch {
  height: 24px;
  background: rgba(10, 76, 106, 0.65);
  font-size: 14px;
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: 500;
  border-radius: 12px;
  color: #6ac8e4;
  border: 1px solid rgba(0, 197, 255, 0.3);
  display: flex;
  align-items: center;
  .option {
    border-radius: 12px;
    padding: 0 18px;
    height: 100%;
    line-height: 24px;
    cursor: pointer;
    &.active {
      color: #ffffff;
      background: #03b4e8;
    }
  }
}
</style>
