<template>
  <div class="index-containe">
    <!-- <div class="run-icon"></div> -->
    <!-- <div class="index-title"></div> -->
    <div class="index-title">建行物色业务挂图作战分布</div>

    <div class="router-contaienr">
      <router-view v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.index-containe {
  /* position: relative; */
}

/* 样式根据需要添加 */
.index-title {
  font-family: "Home Title";
  font-size: 48px;
  font-style: italic;
  background: -webkit-linear-gradient(top, #c8e8ff, #ecf7ff);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  font-weight: 600;
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  /* width: 616px; */
  height: 88px;
  letter-spacing: 16px;
}
</style>
