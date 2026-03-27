<script setup>
import { HomeFilled, SwitchButton } from "@element-plus/icons-vue";
import { useUserStore } from "@/stores/user";
import user from "@/assets/images/user.png";
const userStore = useUserStore();
async function logout() {
  userStore.logout();
}
</script>

<template>
  <div class="navigation flex jb py-20px px35px box">
    <div class="left">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }"
          ><el-icon :size="20"><HomeFilled /></el-icon
        ></el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="c-#0645ED">{{ $route.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right flex ic">
      <el-popconfirm title="请确认退出?" @confirm="logout">
        <template #reference>
          <el-icon :size="20" class="mr16px cursor-pointer"
            ><SwitchButton
          /></el-icon>
        </template>
      </el-popconfirm>

      <span class="mr10px">欢迎您，{{ userStore.userInfo.userName }}</span>
      <el-avatar :size="65" :src="user" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  box-shadow: 0px 1px 5px #d0d0d0;
}
.navigation {
  border-radius: var(--border-radius-num);
  background-color: rgb(220, 233, 250);
  height: var(--navigation-bar-height);
}
.left {
  .el-breadcrumb {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .el-breadcrumb__item {
    cursor: pointer;
    :deep(.el-breadcrumb__inner) {
      cursor: pointer;
    }
  }
}
</style>
