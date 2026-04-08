import { createRouter, createWebHistory } from 'vue-router';
import { Lock, Menu, User, UserFilled } from '@element-plus/icons-vue';
import HomeView from '@/views/HomeView.vue';
import NoPwoer from '@/components/NoPwoer';
import NavRouter from '@/components/NavRouter/NavRouter.vue';
import { pinia } from '@/stores';

let userStore;

export const authRoutes = [
  // 数据管理
  // {
  //   path: '/data-management',
  //   name: 'data-management',
  //   component: () => import('@/views/DataManagement/index.vue'),
  //   meta: {
  //     showMenu: true,
  //     title: '数据管理',
  //     isMenu: true,
  //     elIcon: 'el-icon-data',
  //     elIconAc: 'el-icon-dataAc',
  //     navigation: true
  //   }
  // },
  // {
  //   path: '/auth',
  //   name: 'auth',
  //   meta: {
  //     title: '权限管理',
  //     icon: Lock,
  //     isMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/auth/user',
  //       name: 'auth-user',
  //       component: () => import('@/views/Auth/User/User.vue'),
  //       meta: {
  //         showMenu: true,
  //         navigation: true,
  //         title: '用户管理',
  //         isMenu: true,
  //         icon: User,
  //         level: 1
  //       }
  //     },
  //     {
  //       path: '/auth/role',
  //       name: 'auth-role',
  //       component: () => import('@/views/Auth/Role/Role.vue'),
  //       meta: {
  //         showMenu: true,
  //         navigation: true,
  //         title: '角色管理',
  //         isMenu: true,
  //         icon: UserFilled,
  //         level: 1
  //       }
  //     },
  //     {
  //       path: '/auth/menu',
  //       name: 'auth-menu',
  //       component: () => import('@/views/Auth/Menu/Menu.vue'),
  //       meta: {
  //         showMenu: true,
  //         navigation: true,
  //         title: '菜单管理',
  //         isMenu: true,
  //         icon: Menu,
  //         level: 1
  //       }
  //     }
  //   ]
  // }
];

export const defaultRoutes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/Home.vue'),
    meta: {
      active: '/home',
      showMenu: true,
      title: '首页',
      isMenu: true,
      elIcon: 'el-icon-industry',
      elIconAc: 'el-icon-industryAc',
      navigation: true,
      isOpen: true,
    },
  },
  {
    path: '/supplemental-admission',
    name: 'supplemental-admission',
    component: NavRouter,
    redirect: '/supplemental-admission/index',
    meta: {
      active: '/supplemental-admission',
      showMenu: true,
      title: '补录系统',
      isMenu: true,
      elIcon: 'el-icon-project',
      elIconAc: 'el-icon-projectAc',
      navigation: true,
      isOpen: true,
    },
    children: [
      {
        path: '/supplemental-admission/index',
        name: 'supplemental-admission-index',
        component: () => import('@/views/SupplementalAdmission/SupplementalAdmission.vue'),
        meta: {
          active: '/supplemental-admission',
          showMenu: true,
          title: '补录系统',
          isMenu: false,
          elIcon: 'el-icon-project',
          elIconAc: 'el-icon-projectAc',
          navigation: true,
          isOpen: true,
        },
      },
      {
        path: '/supplemental-admission-data-status',
        name: 'supplemental-admission-data-status',
        component: () => import('@/views/SupplementalAdmission/pages/DataStatus/index.vue'),
        meta: {
          active: '/supplemental-admission',
          showMenu: true,
          title: '数据状态',
          isMenu: false,
          elIcon: 'el-icon-industry',
          elIconAc: 'el-icon-industryAc',
          navigation: true,
          isOpen: true,
        },
      },
      {
        path: '/supplemental-admission-item',
        name: 'supplemental-admission-item',
        component: () => import('@/views/PageItemData/PageItemData.vue'),
        meta: {
          active: '/supplemental-admission',
          showMenu: true,
          title: '补录系统',
          isMenu: false,
          elIcon: 'el-icon-industry',
          elIconAc: 'el-icon-industryAc',
          navigation: true,
          isOpen: true,
        },
      },
      {
        path: '/supplemental-admission-item-add-data',
        name: 'supplemental-admission-item-add-data',
        component: () => import('@/views/PageItemAddData/PageItemAddData.vue'),
        meta: {
          active: '/supplemental-admission',
          showMenu: true,
          title: '补录系统',
          isMenu: false,
          elIcon: 'el-icon-industry',
          elIconAc: 'el-icon-industryAc',
          navigation: true,
          isOpen: true,
        },
      },
      {
        path: '/supplemental-admission-page-deteils',
        name: 'supplemental-admission-page-deteils',
        component: () => import('@/views/PageItemAddDataDeteils/PageItemAddDataDeteils.vue'),
        meta: {
          active: '/supplemental-admission',
          showMenu: false,
          title: '数据详情',
          isMenu: false,
          elIcon: 'el-icon-project',
          elIconAc: 'el-icon-projectAc',
          navigation: false,
          isOpen: true,
        },
        children: [],
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/User.vue'),
    meta: {
      active: '/user',
      showMenu: true,
      title: '用户管理',
      isMenu: true,
      elIcon: 'el-icon-important',
      elIconAc: 'el-icon-importantAc',
      navigation: true,
      isOpen: false,
    },
  },
  {
    path: '/system-setting',
    name: 'system-setting',
    component: () => import('@/views/SystemSetting/SystemSetting.vue'),
    meta: {
      active: '/system-setting',
      showMenu: true,
      title: '系统设置',
      isMenu: true,
      elIcon: 'el-icon-business',
      elIconAc: 'el-icon-businessAc',
      navigation: true,
      isOpen: true,
    },
    children: [
      {
        path: '/system-setting-titles-edit',
        name: 'system-setting-titles-edit',
        component: () => import('@/views/SystemSetting/TitlesEdit/TitlesEdit.vue'),
        meta: {
          showMenu: true,
          title: '系统设置',
          isMenu: false,
          elIcon: 'el-icon-business',
          elIconAc: 'el-icon-businessAc',
          navigation: true,
          isOpen: true,
        },
      },
    ],
  },
  {
    path: '/question-feedback',
    name: 'question-feedback',
    component: () => import('@/views/QuestionFeedback/QuestionFeedback.vue'),
    meta: {
      active: '/question-feedback',
      showMenu: true,
      title: '问题反馈',
      isMenu: true,
      elIcon: 'el-icon-state',
      elIconAc: 'el-icon-stateAc',
      navigation: true,
      isOpen: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue'),
  },
  {
    path: '/working',
    name: 'working',
    component: () => import('@/views/WorkList/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NoPwoer,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home',
      component: HomeView,
      meta: {
        root: true,
      },
      children: [...defaultRoutes],
    },
  ],
});

export default router;

// router.beforeEach(async (to, from, next) => {
//   if (!userStore) {
//     const { useUserStore } = await import('@/stores/user')
//     userStore = useUserStore(pinia)
//   }
//   if (userStore.isLogin) {
//     return next()
//   }
//   // 在动态路由刷新事需要 登录后并且跳转到原来的页面
//   const success = await userStore.login()
//   if (!success && to.path !== '/login') {
//     return next({
//       name: 'login',
//       query: {
//         redirect: to.fullPath
//       }
//     })
//   } else if (to.path === '/login') {
//     if (success) {
//       return next('/')
//     }
//     return next()
//   }
//   const routes = router.getRoutes()
//   const target = routes.find(route => route.path === to.path)
//   if (target) {
//     return next(to.fullPath)
//   } else {
//     return next('/')
//   }
//   // next()
// })
