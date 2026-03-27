<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card">
    <div class="title">
      <span>{{ data.boomName }}</span>
      <i class="icon"></i>
    </div>
    <div class="content">
      <div class="item">
        <div class="value">
          <span>{{ data.socSecNum }}</span>
          <span class="unit">人</span>
        </div>
        <div class="label">社保人数</div>
      </div>
      <div class="item">
        <div class="value">
          <span>{{ data.boomDegree }}</span>
          <span class="unit"></span>
        </div>
        <div class="label">景气度</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 124px;
  background: linear-gradient(90deg, #f1f5ff 0%, #f8faff 100%);
  border-radius: 16px;
  padding: 16px 20px;
  box-sizing: border-box;
  .content {
    display: flex;
    height: calc(100% - 35px);
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .value {
        font-size: 28px;
        font-family: OPPOSans-Medium, OPPOSans;
        font-weight: 500;
        color: #000000;
        .unit {
          font-size: 12px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          margin-left: 4px;
        }
      }
      .label {
        font-size: 14px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #88898b;
      }
    }
  }
  .title {
    font-size: 18px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .icon {
      width: 28px;
      height: 28px;
      background: url('./images/icon.png') no-repeat 0 0 / 100% 100%;
    }
  }
}
</style>
