<script setup>
import { Lock, User } from "@element-plus/icons-vue";
import { md5 } from "js-md5";
import { useUserStore } from "@/stores/user";
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const form = ref({
  username: "",
  password: "",
});

function getMd5Form() {
  return {
    password: md5(form.value.password),
    userName: form.value.username,
  };
}

async function login() {
  if (!form.value.username) {
    return ElMessage.error("请输入用户名");
  }
  if (!form.value.password) {
    return ElMessage.error("请输入密码");
  }
  const { redirect = "/" } = route.query;
  const success = await userStore.customLogin(getMd5Form());
  if (success) {
    router.push(redirect);
    ElMessage.success("登录成功");
  }
}
</script>

<template>
  <div class="login flex ic jc h100%">
    <el-form class="form">
      <div class="logo"></div>
      <div class="admin-name">大屏货架系统</div>
      <el-form-item label="">
        <el-input
          v-model="form.username"
          :prefix-icon="User"
          placeholder="请输入账号"
          @keydown.enter="login"
        />
      </el-form-item>
      <el-form-item label="">
        <el-input
          v-model="form.password"
          show-password
          :prefix-icon="Lock"
          placeholder="请输入密码"
          @keydown.enter="login"
        />
      </el-form-item>
      <div class="flex ic jc mt20px footer">
        <el-button class="login-btn" type="primary" @click="login"
          >登录</el-button
        >
        <div class="edit">忘记密码？</div>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
:deep(#app) {
  padding: 0;
}
.login {
  background: url("./images/login.png") no-repeat 0 0 / 100% 100%;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 620px;
  height: 439px;
  transform: scale(1.5);
  background: url("./images/form1.png") no-repeat 0 0 / 100% 100%;
  box-sizing: border-box;
  padding: 20px;
  padding: 40px 70px 0;
  .logo {
    width: 355px;
    height: 93px;
    margin-bottom: 10px;
    background: url("@/assets/images/logo.png") no-repeat 0 0 / 100% 100%;
  }
  .admin-name {
    margin-bottom: 40px;
    text-align: center;
    font-size: 30px;
    letter-spacing: 5px;
    font-weight: 600;
  }
  .el-input {
    width: 300px;
    height: 40px;
    --el-input-border-radius: 10px;
    --el-fill-color-blank: rgb(200, 221, 240);
  }
  .footer {
    width: 300px;
    justify-content: flex-start;
  }
  .login-btn {
    width: 120px;
    margin-right: 40px;
    // --el-button-border-radius: 50px;
  }
  .edit {
    font-size: 14px;
    color: #999;
    cursor: pointer;
  }
}
</style>
