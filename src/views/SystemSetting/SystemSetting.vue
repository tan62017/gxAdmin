<script setup>
import { systemLouy } from './config';

const router = useRouter();

const change = (data) => {
  if (data.path) {
    router.push(data.path);
  }
};
</script>

<template>
  <div class="system-setting-contrain p20px">
    <div class="layout">
      <div
        class="layout-item w200px h200px flex flex-col flex-justify-center flex-items-center"
        v-for="sy in systemLouy"
        :key="sy.id + sy.name"
        @click="change(sy)"
      >
        <div class="icon w100px h100px bg-light-50 mb-20px" :style="{ '--image': sy.icon }"></div>
        <div class="name">{{ sy.name }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.system-setting-contrain {
  //   width: 100%;
  //   height: 100%;
  .layout {
    .layout-item {
      cursor: pointer;
      &:hover {
        box-shadow: inset 0 0 5px rgba(14, 30, 179, 0.2);
      }
    }
  }
}
</style>
