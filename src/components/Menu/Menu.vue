<script setup>
defineProps({
  title: {
    type: String,
    default: '中国建设银行',
  },
});
const router = useRouter();
const route = useRoute();
const routes = router.getRoutes();

const isCollapse = ref(true);
function getMenuFromRoutes(routes, level = 0) {
  return routes
    .filter((menu) => menu.meta.isMenu && (menu.meta.level || 0) === level)
    .map((route) => {
      const menu = {
        title: route.meta.title,
        path: route.path,
        icon: route.meta.icon,
        elIcon: route.meta.elIcon,
        elIconAc: route.meta.elIconAc,
        isOpen: route.meta.isOpen,
        children: [],
      };
      if (route.children) {
        menu.children = getMenuFromRoutes(route.children, level + 1);
      }
      return menu;
    });
}
// debugger
const menuList = [
  ...getMenuFromRoutes(routes),
  // {
  //   title: '权限管理',
  //   path: '/auth',
  //   icon: Lock,
  //   children: [
  //     {
  //       title: '用户管理',
  //       path: '/auth/user',
  //       icon: User
  //     },
  //     {
  //       title: '角色管理',
  //       path: '/auth/role',
  //       icon: UserFilled
  //     },
  //     {
  //       title: '菜单管理',
  //       path: '/auth/menu',
  //       icon: Menu
  //     }
  //   ]
  // }
];

function handleSelect(path) {
  console.log(route, defaultActive);
  const item = menuList.find((i) => i.path === path);
  if (!item.isOpen) ElMessage.error('暂未开放');
  router.push(path);
}

const defaultOpeneds = computed(() => {
  const { path } = route;
  const menu = menuList.find((menu) => menu.children && menu.children.some((m) => m.path === path));
  return menu ? [menu.path] : [];
});

const defaultActive = computed(() => route.path);
// const defaultActive = computed(() => {
//   console.log(route);

//   return route.meta.title;
// });
</script>

<template>
  <el-scrollbar class="h100% p16px menu-main box" :class="{ 'menu-main-coll': isCollapse }">
    <div class="coll-icon-box">
      <div
        class="coll-icon"
        :style="{ '--roteDeg': !isCollapse ? '0deg' : '180deg' }"
        @click="isCollapse = !isCollapse"
      ></div>
    </div>
    <div class="munu-title-box">
      <div class="menu-title" :class="{ 'menu-title-coll': isCollapse }"></div>
    </div>
    <el-menu
      :default-openeds="defaultOpeneds"
      :default-active="defaultActive"
      active-text-color="#fff"
      :collapse="isCollapse"
      class="h100% menu"
      @select="handleSelect"
    >
      <template v-for="menu in menuList" :key="menu.title">
        <MenuItem :menu="menu" :default-active="defaultActive" :disabled="!menu.isOpen"></MenuItem>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss">
.box {
  box-shadow: 0px 1px 5px #d0d0d0;
}
.munu-title-box {
  width: 100%;
  height: 66px;
  // margin: 10px 0;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.menu-title {
  width: 100%;
  height: 66px;

  // height: 27px;
  font-size: 24px;
  font-family: PangMenZhengDao-Regular, PangMenZhengDao;
  font-weight: 400;
  color: #333333;
  line-height: 28px;
  letter-spacing: 1px;
  // padding: 30px 12px;
  background: url(@/assets/images/logo.png) no-repeat;
  background-size: 100% 100%;
}
.menu-title-coll {
  width: 40px;
  height: 40px;
  margin: auto;
  background: url(@/assets/images/logo1.png) no-repeat;
  background-size: 100% 100%;
}
.menu-main {
  border-radius: var(--border-radius-num);
  flex-shrink: 0;
  background: rgb(220, 233, 250);
  // overflow: overlay;
  width: var(--menu-width);
  transition: all 0.3s ease;
  .coll-icon-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    .coll-icon {
      width: 20px;
      height: 20px;
      background: url(@/assets/images/coll-icon.png) no-repeat;
      background-size: 100% 100%;

      cursor: pointer;
      transform: rotate(var(--roteDeg));
      transition: transform 0.3s ease;
    }
  }
}
.menu-main-coll {
  width: 95px;
  .el-menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.menu {
  border-right: none;
  background: transparent;

  .el-menu {
    background-color: transparent;
  }
}
</style>
