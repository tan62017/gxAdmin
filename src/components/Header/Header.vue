<script setup>
import DataTime from './DataTime.vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  showClose: {
    type: Boolean,
    default: true
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  showTime: {
    type: Boolean,
    default: true
  },
  height: {
    type: String,
    default: '26px'
  }
})
const emits = defineEmits(['close'])
</script>

<template>
  <div class="header">
    <slot v-if="showIcon" name="icon">
      <div class="icon"></div>
    </slot>
    <slot>
      <div>{{ title }}</div>
    </slot>
    <DataTime v-if="showTime" class="data"></DataTime>
    <!-- <div v-if="showClose" class="close" @click="emits('close')"></div> -->
  </div>
</template>

<style scoped lang="scss">
.header {
  height: v-bind(height);
  font-size: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  position: relative;
  .close {
    background: url(./images/close.png) no-repeat;
    background-size: 100% 100%;
    width: 30px;
    height: 27px;
    position: absolute;
    top: 50%;
    right: 22px;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .data {
    width: auto;
    height: 27px;
    position: absolute;
    top: 50%;
    right: 88px;
    transform: translateY(-50%);
  }
  .icon {
    // background: url(./images/icon.png) no-repeat;
    background-size: contain;
    width: 24px;
    height: 16px;
    position: absolute;
    top: 50%;
    left: -32px;
    transform: translateY(-50%);
  }
  div {
    color: #fff;
  }
}
</style>
