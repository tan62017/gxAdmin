<script setup>
import SysTime from '../SysTime/SysTime.vue'
defineProps({
  title: String,
  bg: {
    type: String,
    default: '#ffffff'
  },
  padding: {
    type: String,
    default: '20px'
  },
  tabs: {
    type: Array,
    required: false
  },
  showTime: {
    type: Boolean,
    default: false
  }
})

const tabIndex = defineModel('modelValue', {
  type: [Number, String],
  required: false
})
</script>

<template>
  <div class="box">
    <div class="header">
      <slot name="title">
        <div class="title">{{ title }}</div>
      </slot>
      <slot name="header-right">
        <SwitchTabs v-if="tabs" v-model="tabIndex" :tabs="tabs"></SwitchTabs>
      </slot>
      <SysTime v-if="showTime"></SysTime>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  border-radius: 16px;
  background: v-bind(bg);
  padding: v-bind(padding);
  .header {
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      // height: 20px;
      font-size: 22px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #292c2e;
      // line-height: 18px;
      position: relative;
      padding-left: 8px;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 4px;
        height: 100%;
        background: url('./images/left-bar.png') no-repeat 0 0 / 100% 100%;
      }
    }
  }
}
</style>
