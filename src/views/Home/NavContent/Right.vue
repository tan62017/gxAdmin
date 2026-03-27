<template>
  <template v-if="data.length > 0">
    <LinkList :data="data" />
  </template>
  <template v-else>
    <NoData height="200"></NoData>
  </template>
</template>

<script setup lang="ts">
import LinkList from '@/components/LinkList/LinkList.vue';
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(['change']);

const change = (data) => {
  emits('change', data);
};
</script>

<style lang="scss" scoped>

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
