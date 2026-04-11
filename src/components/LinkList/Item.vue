<template>
  <div
    class="right-item"
    :class="{ 'right-item-hidden': data?.showType === 'hidden' }"
    @click="change(data)"
  >
    <div class="img" :style="{ backgroundImage: ` url(${data?.icon})` }"></div>
    <div class="text-box">
      <div class="label">{{ data?.label }}</div>
      <div class="types">
        {{ data?.types?.join('、') }}
      </div>
      <div class="looks">访问量：{{ data?.num }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(['change']);

const change = (data) => {
  emits('change', data);
};
</script>

<style lang="scss" scoped>
.right-item {
  height: 400px;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 1px 5px rgba(161, 161, 161, 0.516);
  // background: #ccc;
  cursor: pointer;
  &:hover {
    // transform: scale(1.1);
    padding: 2px;
    border-radius: 4px;
    // border: 2px solid rgba(40, 40, 211, 0.685);
    box-shadow: 0px 1px 5px rgba(40, 40, 211, 0.685);
  }
  .img {
    width: 100%;
    height: 280px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    // background-size: 100%/100%;
  }
  .text-box {
    // margin-top: 20px;
    padding: 20px;
    font-size: 16px;
    letter-spacing: 2px;
    .label {
      font-size: 20px;
      font-weight: 600;
    }
    .types {
      margin: 10px 0;
      color: rgb(133, 136, 141);
    }
    .looks {
      color: rgb(135, 169, 208);
    }
  }
}
.right-item-hidden {
  display: none;
}
</style>
