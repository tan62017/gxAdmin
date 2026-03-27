<template>
  <template v-if="data.length > 0">
    <div class="p-box">
      <div class="nav-content-right">
        <div
          class="right-item"
          :class="{ 'right-item-hidden': i.showType === 'hidden' }"
          v-for="(i, index) in data"
          :key="i.label || index"
          @click="change(i)"
        >
          <div
            class="img"
            :style="{ backgroundImage: ` url(${i.icon})` }"
          ></div>
          <div class="text-box">
            <div class="label">{{ i.label }}</div>
            <div class="types">
              {{ i.types?.join("、") }}
            </div>
            <div class="looks">访问量：{{ i.num }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <NoData height="200"></NoData>
  </template>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["change"]);

const change = (data) => {
  console.log(data);
  emits("change", data);
};
</script>

<style lang="scss" scoped>
.p-box {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.nav-content-right {
  // flex: 1;
  width: 100%;
  // width: calc(100% - 220px);
  padding: 0 30px;
  padding-top: 10px;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: 32% 32% 32%;
  // grid-template-rows: 300px 300px 300px;
  grid-auto-flow: row;
  // display: flex;

  grid-gap: 20px;
  // grid-columns-gap: 50px;
  justify-content: space-between;
  flex-wrap: wrap;
  // padding: 0 10px;
  .right-item {
    height: 400px;
    margin-bottom: 10px;
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
  .nodata {
  }
}
</style>
