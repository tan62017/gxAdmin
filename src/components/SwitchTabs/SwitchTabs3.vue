<script setup>
defineProps({
  tabs: {
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
  <div class="tabs">
    <div
      v-for="tab in tabs"
      :key="tab"
      class="tab"
      :class="{ on: modelValue === tab.value }"
      @click="modelValue = tab.value"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  height: 28px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 0px 4px 0px rgba(147, 147, 147, 0.29);
  border-radius: 17px 17px 17px 17px;
  display: flex;
  align-items: center;
  width: fit-content;
  .tab {
    height: 100%;
    font-size: 14px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #292c2e;
    line-height: 28px;
    padding: 0 11px;
    cursor: pointer;
    transition: background 0.3s;
    border-radius: 28px 28px 28px 28px;
    &.on {
      height: 28px;
      background: #1473f9;
      box-shadow: 0px 0px 4px 0px rgba(147, 147, 147, 0.29);
      color: #ffffff;
    }
  }
}
</style>
