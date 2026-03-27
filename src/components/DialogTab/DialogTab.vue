<script setup>
const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['update:modelValue', 'select'])
defineOptions({
  name: 'Tab'
})
const isActive = item => item.id === props.modelValue
const tabSelect = item => {
  emits('update:modelValue', item.id)
  emits('select', item)
}
</script>

<template>
  <div class="tab-main">
    <div
      v-for="(item, index) in data"
      :key="`${item.id}_${index}`"
      class="tab-main_item"
      :class="{ 'is-active': isActive(item) }"
      @click="tabSelect(item)"
    >
      <!-- <Arrow v-if="isActive(item)" color="#f6c35d" style="transform: translateX(1px)" size="6px" type="right"></Arrow> -->
      <span v-html="item.label"></span>
      <!-- <Arrow v-if="isActive(item)" color="#f6c35d" style="transform: translateX(-2px)" size="6px" type="left"></Arrow> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-main {
  width: 110px;
  height: 100%;
  // background: rgba(30, 45, 49, 0.3);
  // box-shadow: inset 0px 0px 10px 0px rgba(0, 214, 255, 0.2706);
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  // border: 1px solid rgba(31, 198, 255, 0.31);
  display: flex;
  flex-direction: column;
  .tab-main_item {
    // padding-right: 18px;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    min-height: 40px;
    padding: 5px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 400;
    color: var(--font-color);
    // background: url('./image/tab-b.png') no-repeat;
    background-size: 100% 100%;
    transition: color 0.3s;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      color: var(--font-color-active);
    }
    &.is-active {
      // background: url('./image/tab-a.png') no-repeat;
      background-size: 100% 100%;
      color: var(--font-color-active);
      border-right: 3px solid var(--font-color-active);
    }
  }
}
</style>
