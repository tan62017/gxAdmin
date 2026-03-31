<template>
  <template v-if="data.length > 0">
    <div class="p-box">
      <div class="nav-content-right">
        <Item
          v-bind="$attrs"
          v-for="(item, index) in data"
          :data="item"
          :key="item?.label || index"
        />
      </div>
    </div>
  </template>
  <template v-else>
    <NoData height="200"></NoData>
  </template>
</template>

<script setup lang="ts">
import Item from './Item.vue';
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

// const emits = defineEmits(['change']);

// const change = (data) => {
//   console.log(data);
//   emits('change', data);
// };
</script>

<style lang="scss" scoped>
.p-box {
  width: 100%;
  height: 100%;
  padding: 20px 0;
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
}
</style>
