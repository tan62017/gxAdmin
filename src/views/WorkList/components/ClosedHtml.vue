<template>
  <div class="closed-html-btn" @click="goback" v-if="fromUrl">
    <el-button type="info" plain size="large">返回</el-button>
  </div>
</template>

<script setup>
import { getUrlParams } from "@/utils/index";

const fromUrl = getUrlParams("from_url");

const goback = () => {
  if (!fromUrl) return;
  // 尝试关闭当前窗口
  window.close();

  // 如果无法关闭，则提示用户手动关闭
  if (!window.closed) {
    alert("无法自动关闭窗口，请手动关闭。");
  }
};
</script>

<style lang="scss" scoped>
.closed-html-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffffb1;
  // background-image: url(../assets/images/dialog-hover.png);
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  cursor: pointer;
  .el-button {
    font-size: 20px;
  }
}
</style>
