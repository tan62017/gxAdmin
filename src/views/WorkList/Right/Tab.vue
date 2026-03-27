<template>
  <div class="tabs-items">
    <div class="title">{{ data.title }}</div>
    <div class="tabs">
      <div
        class="tab"
        :class="{ 'tab-active': data.active === i.id }"
        v-for="i in data?.list || []"
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
import { ref, reactive, watch } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["change"]);
// const active = ref(0);

const change = (data) => {
  emits("change", data, props.data);
  // active.value = data?.id || 0;
};
watch(
  () => props.data,
  (val) => {
    // active.value = val?.list[0]?.id || 0;
    // console.log(val, active.value, val?.list[0]?.id);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.tabs-items {
  display: flex;
  align-items: center;
  padding: 0 10px;
  .title {
    width: 120px;
    margin-right: 20px;
    color: #666;
    text-align-last: justify;
    white-space: nowrap;
  }
  .tabs {
    display: flex;
    // flex-direction: column;
    align-items: center;
    text-align: center;
    .tab {
      width: 140px;
      margin: 0 10px;
      padding: 8px 0px;
      text-align: center;
      border-radius: 4px;
      // font-weight: 600;
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
