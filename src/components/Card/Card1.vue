<script setup>
defineProps({
  icon: {
    type: String,
    default: 'icon1'
  },
  data: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="card1">
    <div class="name">
      <span>{{ data.indusName }}</span>
      <i :class="[icon]"></i>
    </div>
    <div class="value">
      <span>{{ data.absValue }}</span>
      <span class="unit">亿元</span>
    </div>
    <div class="growth">
      <div class="g flex-[0.8]">
        <div class="val">
          <span>{{ data.tgtSpd }}</span>
          <span class="unit">%</span>
        </div>
        <div class="label">目标增速</div>
      </div>
      <div class="g flex-1">
        <div class="val">
          <span>{{ data.spdValue }}</span>
          <span class="unit">%</span>
          <span v-arrow="data.diffSpd" class="extra">较目标{{ !data.diffSpd ? '+0' : data.diffSpd }}%</span>
        </div>
        <div class="label">同比增速</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card1 {
  background: #ffffff;
  border-radius: 16px 16px 16px 16px;
  padding: 16px;
  white-space: nowrap;
  cursor: pointer;
  .name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      width: 80%;
      height: 18px;
      font-size: 18px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #000000;
      line-height: 18px;
      overflow: hidden;
    }
    i {
      display: inline-block;
      width: 28px;
      height: 28px;
      &.icon1 {
        background: url('./images/icon1.png') no-repeat 0 0 / 100% 100%;
      }
      &.icon2 {
        background: url('./images/icon2.png') no-repeat 0 0 / 100% 100%;
      }
      &.icon3 {
        background: url('./images/icon3.png') no-repeat 0 0 / 100% 100%;
      }
      &.icon4 {
        background: url('./images/icon4.png') no-repeat 0 0 / 100% 100%;
      }
      &.icon5 {
        background: url('./images/icon5.png') no-repeat 0 0 / 100% 100%;
      }
      &.icon6 {
        background: url('./images/icon6.png') no-repeat 0 0 / 100% 100%;
      }
      &.icon7 {
        background: url('./images/icon7.png') no-repeat 0 0 / 100% 100%;
      }
      &.icon8 {
        background: url('./images/icon8.png') no-repeat 0 0 / 100% 100%;
      }
      &.icon9 {
        background: url('./images/icon9.png') no-repeat 0 0 / 100% 100%;
      }
      &.icon10 {
        background: url('./images/icon10.png') no-repeat 0 0 / 100% 100%;
      }
    }
  }
  .value {
    height: 18px;
    font-size: 28px;
    font-family: OPPOSans-Bold, OPPOSans;
    font-weight: bold;
    color: #000000;
    margin-bottom: 26px;
    .unit {
      font-weight: normal;
      font-size: 14px;
      margin-left: 8px;
      // line-height: 40px;
      display: inline-block;
      transform: translateY(-2px);
    }
  }
  .growth {
    display: flex;
    .g {
      .val {
        height: 18px;
        font-size: 20px;
        font-family: OPPOSans-Medium, OPPOSans;
        font-weight: 500;
        color: #000000;
        line-height: 18px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        .extra {
          border: 1px solid #f37b84;
          border-radius: 4px 4px 4px 4px;
          height: 20px;
          font-size: 11px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          color: #de3240;
          white-space: nowrap;
          padding: 0 5px;
          margin-left: 5px;
          line-height: 20px;
        }
        .unit {
          font-weight: normal;
          font-size: 12px;
          margin-left: 5px;
        }
      }
      .label {
        height: 18px;
        font-size: 14px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #88898b;
        line-height: 18px;
      }
    }
  }
}
</style>
