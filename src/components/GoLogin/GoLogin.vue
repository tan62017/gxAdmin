<template>
  <div class="dialog-main" :style="{ top: props.top }">
    <div class="font-size-20px flex items-center mb-16px color-#e6a23c">
      <el-icon><WarningFilled /></el-icon>
      <span class="ml-16px">{{ props.title }}</span>
    </div>
    <div class="dialog-content">
      <slot name="content">
        <!-- 这里是默认内容 -->
        <p class="color-#474747">
          倒计时<span class="color-#167bf0 mx-4px font-size-22px fw-600">{{ infoDelay }}</span
          >秒后自动跳转到<span class="login-page-text" @click="submit1">登录页</span>。
        </p>
      </slot>
    </div>
    <!-- <el-button @click="submit1">跳转</el-button> -->
    <!-- <button @click="close">取消</button> -->
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { WarningFilled } from '@element-plus/icons-vue';
import { cloneDeep, delay } from 'lodash-es';
import router from '@/router';
const instance = getCurrentInstance();

const props = defineProps({
  title: {
    type: String,
    default: '提示',
  },
  delay: {
    type: Number,
    default: 3,
  },
  close: {
    type: Function,
    default: () => {},
  },
  submit: {
    type: Function,
    default: () => {},
  },
  top: {
    type: String,
    default: '2%',
  },
});
const infoDelay = ref(3);

let closeTimer = null;
const submit1 = () => {
  closeTimer && clearInterval(closeTimer);
  const route = router.currentRoute.value;
  props.submit();
  router.push({
    path: '/login',
    query: {
      redirect: route.fullPath,
    },
  });
  instance?.proxy?.$el.remove();
};

const close = () => {
  props.close();
  closeTimer && clearInterval(closeTimer);
  instance?.proxy?.$el.remove();
};

onMounted(() => {
  closeTimer && clearInterval(closeTimer);
  const route = router.currentRoute.value;
  if (route.path === '/login') {
    close();
    return;
  }
  closeTimer = setInterval(() => {
    if (infoDelay.value > 0) {
      infoDelay.value -= 1;
    } else {
      submit1();
    }
  }, 1000);
  //   closeTimer = delay(() => {
  //     const route = router.currentRoute.value;
  //     props.submit();
  //     router.push({
  //       path: '/login',
  //       query: {
  //         redirect: route.fullPath,
  //       },
  //     });
  //     props.close();
  //     instance?.proxy?.$el.remove();
  //   }, props.delay * 1000);
});

watch(
  () => {
    return props.delay;
  },
  (newVal) => {
    infoDelay.value = newVal;
  },
);

defineExpose({
  submit: submit1,
  close,
});
</script>

<style lang="scss" scoped>
.dialog-main {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  background-color: #fff;
  padding: 16px 32px;
  padding-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 999999999;
  .login-page-text {
    font-size: 22px;
    margin-left: 4px;
    color: #167bf0;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
