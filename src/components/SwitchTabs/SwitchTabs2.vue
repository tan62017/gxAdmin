<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true
  }
})

const tabIndex = defineModel('modelValue', {
  type: [Number, String],
  required: false
})

function getLabel(item) {
  return typeof item == 'string' ? item : item.label
}

function isActive(item) {
  return typeof item == 'string' ? item === tabIndex.value : item.value === tabIndex.value
}

function setActive(item) {
  tabIndex.value = typeof item == 'string' ? item : item.value
}
</script>

<template>
  <div class="tabs">
    <div
      v-for="(item, index) in tabs"
      :key="index"
      :class="{ on: isActive(item) }"
      class="item"
      @click="setActive(item)"
    >
      {{ getLabel(item) }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  display: flex;
  border-radius: 8px;
  flex-wrap: wrap;
  .item {
    background: #efefef;
    height: 32px;
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #616161;
    line-height: 32px;
    border-radius: 16px;
    padding: 0 16px;
    margin-right: 12px;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.3s, color 0.3s;
    margin-bottom: 12px;
    &.on {
      background: #0645ed;
      color: #fff;
    }
  }
}
</style>
