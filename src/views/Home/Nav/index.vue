<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => {
      return [];
    },
  },
  active: {
    type: String,
    default: '全部',
  },
});

const isClear = ref(false);
const emits = defineEmits(['change', 'update:active']);
// const activeNav = ref("全部");

const navClick = (data) => {
  isClear.value = true;
  // activeNav.value = data.label;
  emits('update:active', data.label);
  emits('change', data);
};
</script>

<template>
  <div class="top-nav flex w100% flex-justify-between">
    <div class="nav-left flex flex-1 mr30px">
      <div
        v-for="(i, index) in data"
        :key="i.label || index"
        class="nav-item"
        :class="[active === i.label ? 'nav-active' : '']"
        @click="navClick(i)"
      >
        {{ i.label }}
      </div>
    </div>
    <div class="nav-right">
      <SearchInput v-bind="$attrs" v-model:isClear="isClear"></SearchInput>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-item {
  padding: 10px 40px;
  margin: 10px 0;
  cursor: pointer;
  height: auto;
}
.nav-active {
  border-radius: 4px;
  color: #fff;
  background-color: rgb(0, 85, 168);
}
</style>
