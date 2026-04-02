<script setup>
import { systemLouy } from './config';
import BigVisAdmin from './components/BigVisAdmin.vue';

const router = useRouter();

const change = (data) => {
  if (data.path) {
    router.push(data.path);
  }
};
</script>

<template>
  <!-- <div class="system-setting-contrain p20px flex flex-col">
   
  </div> -->
  <Content>
    <div class="layout w-full flex flex-col">
      <Title title="系统设置" class="mb20px"></Title>
      <BigVisAdmin class="flex-1" />
      <!-- <div
        class="layout-item w200px h200px flex flex-col flex-justify-center flex-items-center"
        v-for="sy in systemLouy"
        :key="sy.id + sy.name"
        @click="change(sy)"
      >
        <div class="icon w100px h100px bg-light-50 mb-20px" :style="{ '--image': sy.icon }"></div>
        <div class="name">{{ sy.name }}</div>
      </div> -->
    </div>
  </Content>
</template>

<style lang="scss" scoped>
.system-setting-contrain {
  //   width: 100%;
  height: 100%;
  overflow: hidden;

  margin-top: 20px;
  border-radius: 12px;
  background-color: #ffffff;
}
.layout {
  width: 100%;
  // padding: 0 20px;
  overflow: hidden;
  // overflow-y: auto;
  .layout-item {
    cursor: pointer;
    &:hover {
      box-shadow: inset 0 0 5px rgba(14, 30, 179, 0.2);
    }
  }
}
</style>
