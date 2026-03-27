<template>
  <div class="left-box">
    <div class="title">重要程度</div>
    <div class="tabs">
      <div
        class="tab"
        :class="{ 'tab-active': active === i.id }"
        v-for="i in data"
        :key="i.id || i.label"
        @click="change(i)"
      >
        <div class="label-box">
          {{ i.label
          }}<span class="num" v-if="i.label != '全部'">{{ i.num }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  active: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(["change"]);

const change = (data) => {
  emits("change", data, props.data);
};
</script>

<style lang="scss" scoped>
.left-box {
  width: 200px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: rgb(220, 233, 250);
  // box-shadow: -6px 6px 6px 6px rgba(179, 179, 180, 0.26);
  box-shadow: 0px 1px 5px #d0d0d0;
  .title {
    margin-top: 10px;
    color: #666;
  }
  .tabs {
    margin: 10px 0;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    text-align: center;
    .tab {
      padding: 8px 20px;
      margin: 30px 0;
      border-radius: 4px;
      cursor: pointer;
      .label-box {
        position: relative;
      }
      .num {
        position: absolute;
        top: -2px;
        width: 16px;
        height: 16px;
        margin-left: 4px;
        font-size: 12px;
        text-align: center;
        line-height: 16px;
        color: #fff;
        background-color: #f56c6c;
        border-radius: 50%;
      }
    }
    .tab-active {
      color: #fff;
      background-color: rgb(54, 151, 220);
    }
  }
}
</style>
