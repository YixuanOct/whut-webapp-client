<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  QqOutlined,
  WechatOutlined,
  AlipayOutlined,
} from "@ant-design/icons-vue";

const router = useRouter();
const loginForm = ref({
  username: "",
  password: "",
});
const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

function handleLogin() {
  // TODO: 向后端发送登录请求
}
</script>

<template>
  <el-container class="login-container">
    <el-header class="login-header">登 录</el-header>

    <el-main class="login-main">
      <div class="button-group">
        <el-button type="primary">
          <QqOutlined class="button-icon" />
          QQ登录
        </el-button>
        <el-button type="success">
          <WechatOutlined class="button-icon" />
          微信登录
        </el-button>
        <el-button>
          <AlipayOutlined class="button-icon" />
          支付宝登录
        </el-button>
      </div>

      <el-divider direction="vertical" class="divider" />

      <el-form :model="loginForm" :rules="rules" status-icon>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            type="password"
            :show-password="true"
          />
        </el-form-item>
        <el-button type="primary" auto-insert-space @click="handleLogin"
          >登录</el-button
        >
      </el-form>
    </el-main>

    <el-footer class="login-footer">
      <div class="button-group">
        <el-button link @click="router.push('/auth/register')"
          >注册用户</el-button
        >
        <el-button link @click="router.push('/auth/updatePwd')"
          >修改密码</el-button
        >
      </div>
    </el-footer>
  </el-container>
</template>

<style scoped>
.button-icon {
  font-size: 16px;
  margin-right: 4px;
}

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

.login-main .button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.el-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.el-form-item {
  margin: 8px 0;
}

:deep(.el-input__wrapper) {
  width: 200px;
  height: 40px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

:deep(.el-form-item__error) {
  padding-left: 11px;
}

.el-button {
  width: 222px;
  height: 42px;
  margin: 8px 0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  outline: none;
}

.login-main .el-button {
  box-shadow: 4px 4px 8px #d1d9e6, -4px -4px 8px #f9f9f9;
}

.divider {
  height: 174px;
  border-left: 1px #181818 solid;
  margin: 0 45px;
}

.login-footer {
  height: 50px;
  padding: 0 25px;
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

:deep(.el-form-item .el-input__validateIcon) {
  color: #67c23a;
}

:deep(.el-form-item.is-error .el-input__validateIcon) {
  color: #f56c6c;
}
@media (max-width: 800px) {
  .login-main {
    flex-direction: column;
    align-items: center;
  }
  .divider {
    display: none;
  }
  .login-footer .button-group {
    flex-direction: column;
  }
  .login-footer .el-button {
    padding: 2px !important;
  }
  .login-footer {
    height: 70px;
  }
}
</style>
