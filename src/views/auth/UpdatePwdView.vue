<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const updatePwdForm = ref({
  username: "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});
</script>
<template>
  <el-container class="login-container">
    <el-header class="login-header">修 改 密 码</el-header>

    <el-main class="login-main">
      <el-form :model="updatePwdForm">
        <el-form-item>
          <el-input v-model="updatePwdForm.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="updatePwdForm.oldPassword" placeholder="旧密码" />
        </el-form-item>
      </el-form>

      <el-divider direction="vertical" class="divider" />

      <el-form :model="updatePwdForm">
        <el-form-item>
          <el-input v-model="updatePwdForm.newPassword" placeholder="新密码" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="updatePwdForm.confirmNewPassword"
            placeholder="确认新密码"
          />
        </el-form-item>
      </el-form>
    </el-main>

    <el-footer class="login-footer">
      <div class="button-group">
        <el-button link>修改密码</el-button>
        <el-button link @click="router.push('/auth/login')">返回登录</el-button>
      </div>
    </el-footer>
  </el-container>
</template>
<style scoped>
.login-header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: 600;
  color: #606266;
  user-select: none;
}

.login-main {
  display: flex;
  padding: 12px 25px;
}

.el-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.el-form-item {
  margin-bottom: 0;
}

:deep(.el-input__wrapper) {
  width: 200px;
  height: 40px;
  margin: 4px 0;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.el-button {
  width: 222px;
  height: 42px;
  margin: 4px 0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  outline: none;
}

.divider {
  height: 100px;
  border-left: 1px #181818 solid;
  margin: 0 45px;
}

.login-footer {
  height: 50px;
  padding: 0 25px;
  /* background-color: #000; */
}

.login-footer .button-group {
  display: flex;
  justify-content: space-between;
}

.login-footer .el-button:first-child {
  flex: 1;
  padding-right: 46px;
}

.login-footer .el-button:last-child {
  flex: 1;
  padding-left: 46px;
}
</style>
