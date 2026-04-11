<script setup>
import { HomeFilled, SwitchButton } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import user from '@/assets/images/user.png';

const route = useRoute();
const userStore = useUserStore();

async function logout() {
  userStore.logout();
}

// 计算面包屑列表
const breadcrumbs = computed(() => {
  const matched = route.matched;
  const crumbs = [];
  console.log(matched, 'matched');

  // 添加主页
  crumbs.push({
    path: '/',
    title: '首页',
    icon: HomeFilled,
    isLink: true,
  });

  // 添加匹配的路由
  matched.forEach((match, index) => {
    if (match.meta?.title) {
      crumbs.push({
        path: match.path,
        title: match.meta.title,
        isLink: index < matched.length - 1, // 最后一个不设为链接
      });
    }
  });

  return crumbs;
});
</script>

<template>
  <div class="navigation flex jb py-20px px35px box">
    <div class="left">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item
          v-for="(crumb, index) in breadcrumbs"
          :key="index"
          :to="crumb.isLink ? { path: crumb.path } : undefined"
        >
          <el-icon v-if="crumb.icon && index === 0" :size="20">
            <component :is="crumb.icon" />
          </el-icon>
          <span v-else :class="{ 'c-#0645ED': index !== breadcrumbs.length - 1 }">
            {{ crumb.title }}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right flex ic">
      <el-popconfirm title="请确认退出?" @confirm="logout">
        <template #reference>
          <el-icon :size="20" class="mr16px cursor-pointer"><SwitchButton /></el-icon>
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
