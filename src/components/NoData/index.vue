<script setup>
const props = defineProps({
  height: {
    type: [Number, String],
    default: 0,
  },
});

defineOptions({
  name: "NoData",
});

const height = computed(() => {
  return props.height;
});

const scale = computed(() => {
  return Math.min(height.value / 244, 1);
});
</script>

<template>
  <div class="no-data">
    <div class="no-data_img"></div>
    <!-- <div class="no-data_text">暂无数据</div> -->
  </div>
</template>

<style scoped lang="scss">
.no-data {
  margin: auto;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: scale(v-bind(scale));
  .no-data_img {
    width: 260px;
    height: 162px;
    background: url("./image/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .no-data_text {
    width: 64px;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #979797;
    line-height: 22px;
    white-space: nowrap;
  }
}
</style>
